import React from 'react';
import { Phone } from 'lucide-react';
import { useBusinessInfo } from '../context/BusinessInfoContext';
import { FacebookIcon, WhatsAppBrandIcon } from './icons/BrandIcons';
import './FloatingContactButtons.css';

function FloatingContactButtons() {
  const businessInfo = useBusinessInfo();
  const phoneDigits = String(businessInfo.phone || '').replace(/\D/g, '');
  const phoneHref = phoneDigits.startsWith('91') ? `+${phoneDigits}` : `+91${phoneDigits}`;
  const whatsappDigits = String(businessInfo.whatsapp || '').replace(/\D/g, '');
  const whatsappNumber = whatsappDigits.startsWith('91') ? whatsappDigits : `91${whatsappDigits}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;

  return (
    <nav className="floating-contact" aria-label="Quick contact links">
      <a
        className="floating-contact-button floating-contact-facebook"
        href={facebookShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share this page on Facebook"
        title="Facebook"
      >
        <FacebookIcon width={25} height={25} />
      </a>
      <a
        className="floating-contact-button floating-contact-whatsapp"
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        title="WhatsApp"
      >
        <WhatsAppBrandIcon width={25} height={25} />
      </a>
      <a
        className="floating-contact-button floating-contact-call"
        href={`tel:${phoneHref}`}
        aria-label="Call us"
        title="Call"
      >
        <Phone size={23} strokeWidth={2.5} aria-hidden="true" />
      </a>
    </nav>
  );
}

export default FloatingContactButtons;
