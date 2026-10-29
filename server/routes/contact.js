import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
})[character]);

// Validation middleware
const validateContactForm = (req, res, next) => {
  const { name, phone, email, subject, message } = req.body;
  const errors = {};
  const phoneDigits = typeof phone === 'string' ? phone.replace(/\D/g, '') : '';

  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    errors.name = 'Name must be between 2 and 100 characters';
  }

  if (typeof phone !== 'string' || phone.length > 25 || !/^[\d\s\-+()]+$/.test(phone) || phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = 'Valid phone number is required';
  }

  if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Valid email is required';
  }

  if (typeof subject !== 'string' || subject.trim().length < 3 || subject.trim().length > 150) {
    errors.subject = 'Subject must be between 3 and 150 characters';
  }

  if (typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 5000) {
    errors.message = 'Message must be between 10 and 5000 characters';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

// Create email transporter
const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('SMTP credentials not configured. Contact form email cannot be delivered.');
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT) || 587,
    secure: SMTP_SECURE === 'true',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

// POST /api/contact - Submit contact form
router.post('/', validateContactForm, async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    // Sanitize input
    const sanitizedData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    };

    const transporter = createTransporter();
    if (!transporter) {
      return res.status(503).json({
        success: false,
        message: 'संपर्क फ़ॉर्म अभी ईमेल सेवा से जुड़ा नहीं है। कृपया दिए गए फोन या WhatsApp नंबर पर संपर्क करें।',
      });
    }

    const mailOptions = {
      from: `"Kundu Naturals Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: sanitizedData.email,
      subject: `[Kundu Naturals] ${sanitizedData.subject}`,
      html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #2d2d2d; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #2d5a27; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #faf8f3; padding: 20px; border: 1px solid #d4c9b8; border-top: none; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #2d5a27; }
                .value { margin-top: 5px; }
                .footer { background: #1b3a18; color: #f5e6a0; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>कुंडू नेचुरल्स</h1>
                  <p>नई संपर्क पूछताछ</p>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">नाम:</div>
                    <div class="value">${escapeHtml(sanitizedData.name)}</div>
                  </div>
                  <div class="field">
                    <div class="label">फोन:</div>
                    <div class="value">${escapeHtml(sanitizedData.phone)}</div>
                  </div>
                  <div class="field">
                    <div class="label">ईमेल:</div>
                    <div class="value">${escapeHtml(sanitizedData.email)}</div>
                  </div>
                  <div class="field">
                    <div class="label">विषय:</div>
                    <div class="value">${escapeHtml(sanitizedData.subject)}</div>
                  </div>
                  <div class="field">
                    <div class="label">संदेश:</div>
                    <div class="value">${escapeHtml(sanitizedData.message).replace(/\n/g, '<br>')}</div>
                  </div>
                </div>
                <div class="footer">
                  <p>कुंडू नेचुरल्स - शुद्ध आहार, स्वस्थ जीवन</p>
                  <p>यह ईमेल वेबसाइट संपर्क फॉर्म से भेजा गया था।</p>
                </div>
              </div>
            </body>
            </html>
          `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Contact email delivery failed:', emailError);
      return res.status(502).json({
        success: false,
        message: 'आपका संदेश ईमेल से नहीं भेजा जा सका। कृपया दिए गए फोन या WhatsApp नंबर पर संपर्क करें।',
      });
    }

    return res.json({
      success: true,
      message: 'आपका संदेश सफलतापूर्वक भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'सर्वर त्रुटि। कृपया पुनः प्रयास करें या सीधे संपर्क करें।',
    });
  }
});

// GET /api/contact - Get contact info (public)
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      phone: process.env.BUSINESS_PHONE || '9034677123',
      email: process.env.BUSINESS_EMAIL || 'kundupunit927@gmail.com',
      address: process.env.BUSINESS_ADDRESS || 'Kundu Naturals, Village Kailram, District Kaithal, Haryana, India',
      whatsapp: process.env.WHATSAPP_NUMBER || '919034677123',
      hours: {
        weekdays: '9:00 AM - 7:00 PM',
        saturday: '9:00 AM - 5:00 PM',
        sunday: 'Closed',
      },
    },
  });
});

export default router;