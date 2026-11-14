import React from 'react';
import { motion } from 'framer-motion';
import { useBusinessInfo } from '../context/BusinessInfoContext';
import { FacebookIcon, WhatsAppBrandIcon } from './icons/BrandIcons';
import './FloatingContactButtons.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.35,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.6, rotate: 12 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    y: [0, -6, 0],
    transition: {
      opacity: { duration: 0.35, ease: 'easeOut' },
      x: { type: 'spring', stiffness: 260, damping: 18 },
      scale: { type: 'spring', stiffness: 260, damping: 16 },
      rotate: { type: 'spring', stiffness: 220, damping: 14 },
      y: {
        duration: 3.2 + i * 0.6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 0.6 + i * 0.25,
      },
    },
  }),
};

const iconVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: [1, 1.18, 1.05],
    rotate: [0, -8, 6, 0],
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
  tap: { scale: 0.88, rotate: 0 },
};

function FloatingContactButtons() {
  const businessInfo = useBusinessInfo();
  const whatsappDigits = String(businessInfo.whatsapp || '').replace(/\D/g, '');
  const whatsappNumber = whatsappDigits.startsWith('91') ? whatsappDigits : `91${whatsappDigits}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;

  const buttons = [
    {
      key: 'facebook',
      href: facebookShareUrl,
      label: 'Share this page on Facebook',
      title: 'Facebook',
      className: 'floating-contact-button floating-contact-facebook',
      icon: <FacebookIcon width={25} height={25} />,
    },
    {
      key: 'whatsapp',
      href: `https://wa.me/${whatsappNumber}`,
      label: 'Contact us on WhatsApp',
      title: 'WhatsApp',
      className: 'floating-contact-button floating-contact-whatsapp',
      icon: <WhatsAppBrandIcon width={25} height={25} />,
    },
  ];

  return (
    <motion.nav
      className="floating-contact"
      aria-label="Quick contact links"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {buttons.map((btn, i) => (
        <motion.a
          key={btn.key}
          className={btn.className}
          href={btn.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={btn.label}
          title={btn.title}
          custom={i}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.12, x: -4, rotate: -3 }}
          whileTap={{ scale: 0.92 }}
        >
          <motion.span className="floating-contact-icon-wrap" variants={iconVariants} initial="rest" whileHover="hover" whileTap="tap">
            {btn.icon}
          </motion.span>
        </motion.a>
      ))}
    </motion.nav>
  );
}

export default FloatingContactButtons;
