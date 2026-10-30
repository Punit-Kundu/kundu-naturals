import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Map, Send, CheckCircle } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ContactForm from '../components/ContactForm';
import WhatsApp from '../components/icons/WhatsAppIcon';
import { useBusinessInfo } from '../context/BusinessInfoContext';
import { businessMapEmbedUrl, businessMapsUrl } from '../utils/businessLocation';
import './Contact.css';

const formatPhoneNumber = (rawPhone) => {
  if (!rawPhone) return '9034677123';
  const digits = String(rawPhone).replace(/\D/g, '');
  if (!digits) return '9034677123';
  return digits.startsWith('91') ? `+${digits.slice(0, 2)}-${digits.slice(2)}` : `+91-${digits}`;
};

const getInternationalPhone = (rawPhone) => {
  const digits = String(rawPhone || '').replace(/\D/g, '');
  return digits.startsWith('91') ? `+${digits}` : `+91${digits}`;
};

const getWhatsAppNumber = (rawPhone) => {
  const digits = String(rawPhone || '').replace(/\D/g, '');
  return digits.startsWith('91') ? digits : `91${digits}`;
};

const getContactInfo = (businessInfo) => [
  {
    icon: MapPin,
    title: 'Our Address',
    titleHindi: 'हमारा पता',
    titleEn: 'Our Address',
    details: businessInfo.address ? businessInfo.address.split(', ') : [
      'Kundu Naturals',
      'Village Kailram',
      'District Kaithal',
      'Haryana, India',
    ],
    detailsEn: businessInfo.address ? businessInfo.address.split(', ') : [
      'Kundu Naturals',
      'Village Kailram',
      'District Kaithal',
      'Haryana, India',
    ],
    action: businessMapsUrl,
    actionLabel: { hi: 'Google Maps में देखें', en: 'Open in Google Maps' },
    target: '_blank',
  },
  {
    icon: Phone,
    title: 'Phone Number',
    titleHindi: 'फोन नंबर',
    titleEn: 'Phone Number',
    details: [formatPhoneNumber(businessInfo.phone)],
    detailsEn: [formatPhoneNumber(businessInfo.phone)],
    action: `tel:${getInternationalPhone(businessInfo.phone)}`,
    actionLabel: { hi: 'कॉल करें', en: 'Call' },
  },
  {
    icon: Mail,
    title: 'Email',
    titleHindi: 'ईमेल',
    titleEn: 'Email',
    details: [businessInfo.email],
    detailsEn: [businessInfo.email],
    action: `mailto:${businessInfo.email}`,
    actionLabel: { hi: 'ईमेल करें', en: 'Email' },
  },
  {
    icon: WhatsApp,
    title: 'WhatsApp',
    titleHindi: 'व्हाट्सऐप',
    titleEn: 'WhatsApp',
    details: [formatPhoneNumber(businessInfo.whatsapp)],
    detailsEn: [formatPhoneNumber(businessInfo.whatsapp)],
    action: `https://wa.me/${getWhatsAppNumber(businessInfo.whatsapp)}`,
    actionLabel: { hi: 'चैट करें', en: 'Chat' },
    target: '_blank',
  },
];

const businessHours = [
  { day: 'Monday - Friday', dayHindi: 'सोमवार - शुक्रवार', dayEn: 'Monday - Friday', time: '9:00 AM - 7:00 PM' },
  { day: 'Saturday', dayHindi: 'शनिवार', dayEn: 'Saturday', time: '9:00 AM - 5:00 PM' },
  { day: 'Sunday', dayHindi: 'रविवार', dayEn: 'Sunday', time: 'Closed / बंद' },
];

function Contact() {
  const [language, setLanguage] = useState('en');
  const businessInfo = useBusinessInfo();

  useEffect(() => {
    const syncLanguage = () => {
      const saved = localStorage.getItem('kundu-language');
      if (saved) setLanguage(saved);
    };
    syncLanguage();
    window.addEventListener('languagechange', syncLanguage);
    return () => window.removeEventListener('languagechange', syncLanguage);
  }, []);

  const contactInfo = getContactInfo(businessInfo);

  return (
    <>
      {/* Page Header */}
      <section className="page-header" aria-labelledby="contact-title">
        <div className="page-header-bg" aria-hidden="true">
          <img
            src="/images/contact-header.jpg"
            alt=""
            className="page-header-image"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="page-header-overlay" />
        </div>
        <div className="container page-header-content">
          <motion.h1
            id="contact-title"
            className="page-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-hindi">{language === 'hi' ? 'संपर्क करें' : 'Contact Us'}</span>
            <span className="text-latin">{language === 'en' ? 'Contact Us' : 'संपर्क करें'}</span>
          </motion.h1>
          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-hindi">{language === 'hi' ? 'We are here for your queries, suggestions and orders' : 'We are here for your queries, suggestions and orders'}</span>
            <span className="text-latin">{language === 'en' ? 'We are here for your queries, suggestions and orders' : 'हम आपके प्रश्न, सुझाव और ऑर्डर के लिए यहां हैं'}</span>
          </motion.p>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="quick-contact section" aria-labelledby="quick-title">
        <div className="container">
          <SectionHeader
            title="Quick Contact"
            titleHindi="त्वरित संपर्क"
            titleEn="Quick Contact"
            subtitleHindi="Ways to connect directly"
            subtitleEn="Ways to connect directly"
          />
          <div className="quick-contact-grid">
            {contactInfo.map((item, index) => (
              <motion.article
                key={item.title}
                className="contact-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="contact-icon">
                  <item.icon width="28" height="28" aria-hidden="true" />
                </div>
                <h3 className="contact-title">
                  <span className="text-hindi">{item.titleHindi}</span>
                  <span className="text-latin">{item.titleEn}</span>
                </h3>
                <div className="contact-details">
                  {item.details.map((detail, i) => (
                    <p key={i} className="contact-detail">
                      <span className="text-hindi">{detail}</span>
                      <span className="text-latin">{(item.detailsEn && item.detailsEn[i]) || detail}</span>
                    </p>
                  ))}
                </div>
                {item.action && (
                  <a
                    href={item.action}
                    className="btn btn-primary contact-action"
                    target={item.target}
                    rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                  >
                    <span>{language === 'hi' ? item.actionLabel.hi : item.actionLabel.en}</span>
                    {item.icon === WhatsApp && <Send width="18" height="18" />}
                    {item.icon === Phone && <Phone width="18" height="18" />}
                    {item.icon === Mail && <Mail width="18" height="18" />}
                    {item.icon === MapPin && <Map width="18" height="18" />}
                  </a>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Business Hours & Map */}
      <section className="hours-map section section-alt" aria-labelledby="hours-title">
        <div className="container">
          <div className="hours-map-grid">
            <motion.div
              className="hours-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 id="hours-title" className="section-title-inline">
                <span className="text-hindi">{language === 'hi' ? 'Business Hours' : 'कार्य घंटे'}</span>
                <span className="text-latin">{language === 'en' ? 'Business Hours' : 'कार्य घंटे'}</span>
              </h2>
              <div className="hours-list">
                {businessHours.map((hour, index) => (
                  <div key={index} className="hour-item">
                    <span className="hour-day">
                      <span className="text-hindi">{language === 'hi' ? hour.dayHindi : hour.dayEn}</span>
                      <span className="text-latin">{language === 'en' ? hour.dayEn : hour.dayHindi}</span>
                    </span>
                    <span className="hour-time">{hour.time}</span>
                  </div>
                ))}
              </div>
              <div className="hours-note">
                <span className="text-hindi">{language === 'hi' ? 'उत्पाद और ऑर्डर संबंधी पूछताछ के लिए कार्य समय में संपर्क करें।' : 'Contact us during business hours for product and order enquiries.'}</span>
                <span className="text-latin">{language === 'en' ? 'Contact us during business hours for product and order enquiries.' : 'उत्पाद और ऑर्डर संबंधी पूछताछ के लिए कार्य समय में संपर्क करें।'}</span>
              </div>
            </motion.div>

            <motion.div
              className="map-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="section-title-inline">
                <span className="text-hindi">{language === 'hi' ? 'हमारा स्थान' : 'Our Location'}</span>
                <span className="text-latin">{language === 'en' ? 'Our Location' : 'हमारा स्थान'}</span>
              </h2>
              <div className="map-placeholder">
                <iframe
                  src={businessMapEmbedUrl}
                  title={language === 'hi' ? 'कुंडू नेचुरल्स की लाइव Google Maps लोकेशन' : 'Kundu Naturals live Google Maps location'}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a
                href={businessMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline map-link"
              >
                <Map width="18" height="18" aria-hidden="true" />
                <span>{language === 'hi' ? 'Google Maps में देखें' : 'Open in Google Maps'}</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section section" aria-labelledby="form-title">
        <div className="container">
          <motion.div
            className="form-wrapper"
            aria-labelledby="form-title"
          >
            <motion.div
              className="form-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeader
                title="Send us a message"
                titleHindi="हमें संदेश भेजें"
                titleEn="Send us a message"
                subtitle="Fill out the form, we will respond within 24 hours"
                subtitleEn="Fill out the form, we will respond within 24 hours"
              />
            </motion.div>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq section section-alt" aria-labelledby="faq-title">
        <div className="container">
          <SectionHeader
            title="Frequently Asked Questions"
            titleHindi="अक्सर पूछे जाने वाले प्रश्न"
            titleEn="Frequently Asked Questions"
            subtitleHindi="Quick answers to common questions"
            subtitleEn="Quick answers to common questions"
          />
          <div className="faq-grid">
            {[
              {
                q: 'How to place an order?',
                qHindi: 'ऑर्डर कैसे दें?',
                qEn: 'How to place an order?',
                a: 'Browse the products and contact us on WhatsApp or by phone. Our team will confirm availability and price; checkout is not available on the website.',
                aHindi: 'उत्पाद देखें और WhatsApp या फोन पर संपर्क करें। हमारी टीम उपलब्धता और कीमत की पुष्टि करेगी; वेबसाइट पर चेकआउट की सुविधा नहीं है।',
                aEn: 'Browse the products and contact us on WhatsApp or by phone. Our team will confirm availability and price; checkout is not available on the website.',
              },
              {
                q: 'How long does delivery take?',
                qHindi: 'डिलीवरी में कितना समय लगता है?',
                qEn: 'How long does delivery take?',
                a: 'Delivery availability and estimated timing depend on your address. Our team will confirm the details before accepting the order.',
                aHindi: 'डिलीवरी की उपलब्धता और अनुमानित समय आपके पते पर निर्भर करता है। ऑर्डर स्वीकार करने से पहले हमारी टीम विवरण की पुष्टि करेगी।',
                aEn: 'Delivery availability and estimated timing depend on your address. Our team will confirm the details before accepting the order.',
              },
              {
                q: 'What payment methods?',
                qHindi: 'भुगतान के तरीके क्या हैं?',
                qEn: 'What payment methods?',
                a: 'Please ask our team about the payment options available for your order before confirming it.',
                aHindi: 'ऑर्डर की पुष्टि से पहले उपलब्ध भुगतान विकल्पों के लिए हमारी टीम से पूछें।',
                aEn: 'Please ask our team about the payment options available for your order before confirming it.',
              },
              {
                q: 'Are products organically certified?',
                qHindi: 'उत्पाद जैविक प्रमाणित हैं?',
                qEn: 'Are products organically certified?',
                a: 'Our products are grown using traditional organic methods. Certification is in progress. Currently we rely on farmer declarations and internal quality checks.',
                aHindi: 'हमारे उत्पाद पारंपरिक जैविक विधियों से उगाए जाते हैं। प्रमाणन प्रक्रिया जारी है। वर्तमान में हम किसानों की घोषणा और आंतरिक गुणवत्ता जांच पर भरोसा करते हैं।',
                aEn: 'Our products are grown using traditional organic methods. Certification is in progress. Currently we rely on farmer declarations and internal quality checks.',
              },
              {
                q: 'Discount for bulk orders?',
                qHindi: 'थोक ऑर्डर पर छूट?',
                qEn: 'Discount for bulk orders?',
                a: 'Contact us on WhatsApp or by email to check bulk-order availability and request a quote.',
                aHindi: 'थोक ऑर्डर की उपलब्धता और कीमत जानने के लिए WhatsApp या ईमेल पर संपर्क करें।',
                aEn: 'Contact us on WhatsApp or by email to check bulk-order availability and request a quote.',
              },
              {
                q: 'Return/Refund policy?',
                qHindi: 'रिटर्न/रिफंड नीति?',
                qEn: 'Return/Refund policy?',
                a: 'Contact us with your order details. Our team will explain the applicable return or refund policy.',
                aHindi: 'अपने ऑर्डर के विवरण के साथ संपर्क करें। हमारी टीम लागू रिटर्न या रिफंड नीति बताएगी।',
                aEn: 'Contact us with your order details. Our team will explain the applicable return or refund policy.',
              },
            ].map((faq, index) => (
              <motion.details
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <summary className="faq-question">
                  <span className="faq-q">
                    <span className="text-hindi">{faq.qHindi}</span>
                    <span className="text-latin">{faq.qEn}</span>
                  </span>
                  <CheckCircle width="20" height="20" aria-hidden="true" />
                </summary>
                <div className="faq-answer">
                  <p className="text-hindi">
                    <span className="text-hindi">{faq.aHindi}</span>
                    <span className="text-latin">{faq.aEn}</span>
                  </p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="contact-final-cta section" aria-labelledby="final-cta-title">
        <div className="container">
          <motion.div
            className="final-cta-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="final-cta-title" className="text-hindi">
              <span className="text-hindi">{language === 'hi' ? 'Join the Kundu Naturals family' : 'Join the Kundu Naturals family'}</span>
              <span className="text-latin">{language === 'en' ? 'Join the Kundu Naturals family' : 'कुंडू नेचुरल्स परिवार से जुड़ें'}</span>
            </h2>
            <p className="text-hindi">
              <span className="text-hindi">{language === 'hi' ? 'Whether you are a customer, farmer, or well-wisher — you are welcome. Be part of this pure food journey with us.' : 'Whether you are a customer, farmer, or well-wisher — you are welcome. Be part of this pure food journey with us.'}</span>
              <span className="text-latin">{language === 'en' ? 'Whether you are a customer, farmer, or well-wisher — you are welcome. Be part of this pure food journey with us.' : 'क्या आप ग्राहक, किसान, या शुभचिंतक हैं — आपका स्वागत है। इस शुद्ध भोजन यात्रा का हिस्सा बनें.'}</span>
            </p>
            <div className="final-cta-actions">
              <a href={`https://wa.me/${getWhatsAppNumber(businessInfo.whatsapp)}`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                <span className="text-hindi">{language === 'hi' ? 'WhatsApp Connect' : 'व्हाट्सऐप पर जुड़ें'}</span>
                <span className="text-latin">{language === 'en' ? 'WhatsApp Connect' : 'WhatsApp Connect'}</span>
                <WhatsApp width="20" height="20" aria-hidden="true" />
              </a>
              <a href={`tel:${getInternationalPhone(businessInfo.phone)}`} className="btn btn-outline btn-lg">
                <span className="text-hindi">{language === 'hi' ? 'Call Now' : 'अभी कॉल करें'}</span>
                <span className="text-latin">{language === 'en' ? 'Call Now' : 'अभी कॉल करें'}</span>
                <Phone width="20" height="20" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Contact;