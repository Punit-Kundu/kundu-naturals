import React from 'react';
import { Link } from 'react-router-dom';
import { motion, MotionConfig } from 'framer-motion';
import {
  Leaf,
  HeartPulse,
  Truck,
  ShieldCheck,
  Phone,
  PhoneCall,
  Mail,
  MapPin,
} from 'lucide-react';
import { WhatsAppBrandIcon } from './icons/BrandIcons';
import { useBusinessInfo } from '../context/BusinessInfoContext';
import './Footer.css';

/* ============================================================
   KUNDU NATURALS — FOOTER
   Content matches the "Kundu Naturals Organic Farm Footer"
   reference design exactly (mobile / WhatsApp / email /
   address / USP strip / bottom bar).

   IMPORTANT: every visible string exists twice (Hindi + English)
   and index.css toggles them with html.hi / html.en, so the
   footer works in both languages.
   ============================================================ */

/* USP strip */
const features = [
  {
    icon: Leaf,
    line1En: '100% Natural',
    line1Hi: '100% प्राकृतिक',
    line2En: 'No Chemicals',
    line2Hi: 'बिना रसायन',
  },
  {
    icon: HeartPulse,
    line1En: 'Safe & Healthy',
    line1Hi: 'सुरक्षित और स्वस्थ',
    line2En: 'For Your Family',
    line2Hi: 'आपके परिवार के लिए',
  },
  {
    icon: Truck,
    line1En: 'PAN India Delivery',
    line1Hi: 'पैन इंडिया डिलीवरी',
    line2En: '(Delivery Charge Depends)',
    line2Hi: '(डिलीवरी चार्ज निर्भर करता है)',
  },
  {
    icon: ShieldCheck,
    line1En: 'Secure Payments',
    line1Hi: 'सुरक्षित भुगतान',
    line2En: 'UPI & Cash',
    line2Hi: 'UPI और नकद',
  },
];

/* --- entrance animation variants (transform + opacity only) --- */
const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i, ease: EASE },
  }),
};

const pop = {
  hidden: { opacity: 0, scale: 0.6, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, delay: i, ease: EASE },
  }),
};

const growX = {
  hidden: { opacity: 0, scaleX: 0 },
  show: (i = 0) => ({
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.9, delay: i, ease: EASE },
  }),
};

function Footer() {
  const businessInfo = useBusinessInfo();
  const phoneDigits = String(businessInfo.phone).replace(/\D/g, '');
  const whatsappDigits = String(businessInfo.whatsapp).replace(/\D/g, '');
  const whatsappNumber = whatsappDigits.startsWith('91') ? whatsappDigits : `91${whatsappDigits}`;
  const whatsappPhone = whatsappDigits.startsWith('91') ? whatsappDigits.slice(2) : whatsappDigits;
  const phoneNumber = phoneDigits.startsWith('91') ? phoneDigits.slice(2) : phoneDigits;
  const phoneHref = phoneDigits.startsWith('91') ? `+${phoneDigits}` : `+91${phoneDigits}`;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessInfo.address)}`;
  const contactMobile = [
    {
      icon: Phone,
      labelEn: 'Mobile',
      labelHi: 'मोबाइल',
      valueEn: phoneNumber,
      valueHi: phoneNumber,
      href: `tel:${phoneHref}`,
    },
    {
      icon: WhatsAppBrandIcon,
      labelEn: 'WhatsApp',
      labelHi: 'व्हाट्सऐप',
      valueEn: whatsappPhone,
      valueHi: whatsappPhone,
      href: `https://wa.me/${whatsappNumber}`,
      external: true,
    },
  ];
  const contactInfo = [
    {
      icon: Mail,
      labelEn: 'Email',
      labelHi: 'ईमेल',
      valueEn: businessInfo.email,
      valueHi: businessInfo.email,
      href: `mailto:${businessInfo.email}`,
    },
    {
      icon: MapPin,
      labelEn: 'Address',
      labelHi: 'पता',
      valueEn: businessInfo.address,
      valueHi: businessInfo.address,
      href: mapUrl,
      external: true,
    },
  ];
  const socials = [
    { Icon: WhatsAppBrandIcon, label: 'WhatsApp', href: `https://wa.me/${whatsappNumber}`, tint: '#25D366', external: true },
    { Icon: PhoneCall, label: 'Call us', href: `tel:${phoneHref}`, tint: '#E3A82B' },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <footer className="site-footer" role="contentinfo">
        {/* ---- farm photo band (crisp, no blur) ---- */}
        <div className="footer-strip" aria-hidden="true">
          <img src="/images/footer-farm-strip.png" alt="" className="footer-strip-img" />
          <span className="footer-strip-fade" />
        </div>

        {/* ---- light cream content panel ---- */}
        <div className="footer-panel">
          <div className="container footer-grid">
            {/* ---------------------------------------------- BRAND */}
            <motion.div
              className="footer-brand"
              custom={0.05}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <Link to="/" className="footer-logo" aria-label="Kundu Naturals - Home">
                <img
                  src="/logo-placeholder.svg"
                  alt=""
                  className="footer-logo-mark"
                />
                <span className="footer-logo-text">
                  <span className="footer-logo-name">Kundu</span>
                  <span className="footer-logo-sub">NATURALS</span>
                </span>
              </Link>

              <p className="footer-tagline">
                <span className="text-hindi">अच्छा भोजन • स्वस्थ जीवन</span>
                <span className="text-latin">Good Food • Healthy Life</span>
              </p>
            </motion.div>

            {/* ------------------------------------- MOBILE / WHATSAPP */}
            <motion.div
              className="footer-col"
              custom={0.14}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              {contactMobile.map((item, i) => (
                <motion.div
                  key={item.labelEn}
                  className="footer-contact-item"
                  custom={0.2 + i * 0.09}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                >
                  <span className="footer-contact-icon" aria-hidden="true">
                    <item.icon width={20} height={20} />
                  </span>
                  <span className="footer-contact-body">
                    <span className="footer-contact-label">
                      <span className="text-hindi">{item.labelHi}</span>
                      <span className="text-latin">{item.labelEn}</span>
                    </span>
                    <a
                      className="footer-contact-value"
                      href={item.href}
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <span className="text-hindi">{item.valueHi}</span>
                      <span className="text-latin">{item.valueEn}</span>
                    </a>
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* -------------------------------------- EMAIL / ADDRESS */}
            <motion.div
              className="footer-col"
              custom={0.24}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.labelEn}
                  className="footer-contact-item"
                  custom={0.32 + i * 0.09}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                >
                  <span className="footer-contact-icon" aria-hidden="true">
                    <item.icon width={20} height={20} />
                  </span>
                  <span className="footer-contact-body">
                    <span className="footer-contact-label">
                      <span className="text-hindi">{item.labelHi}</span>
                      <span className="text-latin">{item.labelEn}</span>
                    </span>
                    <a
                      className="footer-contact-value"
                      href={item.href}
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <span className="text-hindi">{item.valueHi}</span>
                      <span className="text-latin">{item.valueEn}</span>
                    </a>
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* ------------------------------- SOCIALS + PURE SEAL */}
            <motion.div
              className="footer-col footer-col-social"
              custom={0.32}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <motion.span
                className="footer-social-title"
                custom={0.38}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
              >
                <span className="text-hindi">हमसे जुड़ें</span>
                <span className="text-latin">Follow Us</span>
              </motion.span>

              <div className="footer-social" role="list" aria-label="Quick contact links">
                {socials.map((social, i) => (
                  <motion.a
                    key={social.label}
                    role="listitem"
                    href={social.href}
                    className="footer-social-link"
                    aria-label={social.label}
                    title={social.label}
                    style={{ '--brand-tint': social.tint }}
                    custom={0.44 + i * 0.08}
                    variants={pop}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                    {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <social.Icon width={20} height={20} />
                  </motion.a>
                ))}
              </div>

              <motion.span
                className="footer-seal"
                custom={0.86}
                variants={pop}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
              >
                <span className="text-hindi">शुद्ध</span>
                <span className="text-latin">Pure</span>
                <span className="footer-seal-sep" aria-hidden="true" />
                <span className="text-hindi">जैविक</span>
                <span className="text-latin">Organic</span>
                <span className="footer-seal-sep" aria-hidden="true" />
                <span className="text-hindi">प्राकृतिक</span>
                <span className="text-latin">Natural</span>
              </motion.span>
            </motion.div>
          </div>
        </div>

        {/* ---- dark green lower band : USP strip ---- */}
        <div className="footer-lower">
          <motion.ul
            className="container footer-features"
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {features.map((f, i) => (
              <motion.li
                key={f.line1En}
                className="footer-feature"
                custom={0.56 + i * 0.1}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
              >
                <span className="footer-feature-icon" aria-hidden="true">
                  <f.icon width={22} height={22} />
                </span>
                <span className="footer-feature-text">
                  <span className="footer-feature-line-1">
                    <span className="text-hindi">{f.line1Hi}</span>
                    <span className="text-latin">{f.line1En}</span>
                  </span>
                  <span className="footer-feature-line-2">
                    <span className="text-hindi">{f.line2Hi}</span>
                    <span className="text-latin">{f.line2En}</span>
                  </span>
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* ------------------------------------------------ BOTTOM BAR */}
        <div className="footer-bottom">
          <motion.span
            className="footer-bottom-line"
            custom={0.2}
            variants={growX}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            aria-hidden="true"
          />
          <div className="container footer-bottom-content">
            <motion.p
              className="copyright"
              custom={0.7}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
            >
              <span className="text-hindi">© 2025 कुंडू नेचुरल्स। सर्वाधिकार सुरक्षित।</span>
              <span className="text-latin">© 2025 Kundu Naturals. All Rights Reserved.</span>
            </motion.p>
            <motion.p
              className="made-with"
              custom={0.78}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
            >
              <span className="text-hindi">बेहतर कल के लिए जैविक भोजन</span>
              <span className="text-latin">Organic Food for a Better Tomorrow</span>
            </motion.p>
          </div>
        </div>
      </footer>
    </MotionConfig>
  );
}

export default Footer;