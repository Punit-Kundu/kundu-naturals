import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { WhatsAppBrandIcon } from './icons/BrandIcons';
import { useBusinessInfo } from '../context/BusinessInfoContext';
import './PageHero.css';

const PageHero = ({
  title,
  titleHindi,
  subtitle,
  subtitleHindi,
  bgImage,
  ctaText,
  ctaTextHindi,
  ctaHref = '/products',
  cta2Text,
  cta2TextHindi,
  cta2Href = '/about',
  showContact = false,
  language = 'en',
}) => {
  const businessInfo = useBusinessInfo();
  const whatsAppDigits = String(businessInfo.whatsapp || '').replace(/\D/g, '');
  const whatsappNumber = whatsAppDigits.startsWith('91') ? whatsAppDigits : `91${whatsAppDigits}`;
  const phoneDigits = String(businessInfo.phone || '').replace(/\D/g, '');
  const phoneNumber = phoneDigits.startsWith('91') ? phoneDigits : `91${phoneDigits}`;
  const email = businessInfo.email || '';

  const isHi = language === 'hi';

  return (
    <section className="page-hero" aria-labelledby="page-hero-title">
      <div className="page-hero-bg">
        <motion.img
          src={bgImage || '/images/website-header.webp'}
          alt="Natural food products from Kundu Naturals in Haryana"
          className="page-hero-bg-img"
          width="1983"
          height="793"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          onError={(e) => { e.currentTarget.src = '/images/homepage-hero-section.png'; }}
        />
        <div className="page-hero-overlay" />
        <div className="page-hero-glow" />
        <div className="page-hero-wave" />
      </div>

      <div className="page-hero-content container">
        <motion.div
          className="page-hero-badge"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="badge-dot" aria-hidden="true" />
          <span className="text-hindi">कुंडू नेचुरल्स</span>
          <span className="text-latin">Kundu Naturals</span>
        </motion.div>

        <motion.h1
          id="page-hero-title"
          className="page-hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-hindi">{isHi && titleHindi ? titleHindi : title}</span>
          <span className="text-latin">{!isHi || !titleHindi ? title : titleHindi}</span>
        </motion.h1>

        {subtitle && (
          <motion.p
            className="page-hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-hindi">{isHi && subtitleHindi ? subtitleHindi : subtitle}</span>
            <span className="text-latin">{!isHi || !subtitleHindi ? subtitle : subtitleHindi}</span>
          </motion.p>
        )}

        <motion.div
          className="page-hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {ctaHref && (
            <Link to={ctaHref} className="page-hero-btn page-hero-btn-primary">
              <span className="text-hindi">{isHi && ctaTextHindi ? ctaTextHindi : ctaText}</span>
              <span className="text-latin">{!isHi || !ctaText ? ctaText : ctaTextHindi}</span>
              <ArrowRight size="18" aria-hidden="true" />
            </Link>
          )}
          {cta2Href && (
            <Link to={cta2Href} className="page-hero-btn page-hero-btn-glass">
              <span className="text-hindi">{isHi && cta2TextHindi ? cta2TextHindi : cta2Text}</span>
              <span className="text-latin">{!isHi || !cta2Text ? cta2Text : cta2TextHindi}</span>
            </Link>
          )}
        </motion.div>

        {showContact && (
          <motion.div
            className="page-hero-contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="hero-contact-grid">
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-contact-item hero-contact-whatsapp"
                  aria-label="Contact Kundu Naturals on WhatsApp"
                >
                  <WhatsAppBrandIcon width="20" height="20" aria-hidden="true" />
                  <span className="contact-label">
                    <span className="text-hindi">व्हाट्सऐप</span>
                    <span className="text-latin">WhatsApp</span>
                  </span>
                </a>
              )}
              {phoneNumber && (
                <a href={`tel:+${phoneNumber}`} className="hero-contact-item hero-contact-phone" aria-label="Call Kundu Naturals">
                  <Phone width="20" height="20" aria-hidden="true" />
                  <span className="contact-label">
                    <span className="text-hindi">कॉल करें</span>
                    <span className="text-latin">Call</span>
                  </span>
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="hero-contact-item hero-contact-mail">
                  <Mail width="20" height="20" aria-hidden="true" />
                  <span className="contact-label">
                    <span className="text-hindi">ईमेल</span>
                    <span className="text-latin">Email</span>
                  </span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PageHero;
