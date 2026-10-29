import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Leaf,
  Truck,
  ShieldCheck,
  Globe,
  Home,
  UserRound,
  ChevronDown,
  Images,
  ShoppingCart,
  Mail,
  Search,
  Phone,
} from 'lucide-react';
import { useBusinessInfo } from '../context/BusinessInfoContext';
import './Header.css';

const navLinks = [
  { path: '/', label: 'होम', labelEn: 'Home', icon: Home },
  { path: '/about', label: 'हमारे बारे में', labelEn: 'About', icon: UserRound },
  { path: '/gallery', label: 'गैलरी', labelEn: 'Gallery', icon: Images },
  { path: '/products', label: 'ऑर्डर करें', labelEn: 'Order Online', icon: ShoppingCart },
  { path: '/contact', label: 'संपर्क करें', labelEn: 'Contact', icon: Mail },
];

const trustBadges = [
  { icon: Truck, text: 'पूरे भारत में डिलीवरी', textEn: 'All India Delivery' },
  { icon: ShieldCheck, text: 'सुरक्षित भुगतान', textEn: 'Secure Payments' },
];

const formatPhoneNumber = (rawPhone) => {
  const digits = String(rawPhone).replace(/\D/g, '');
  const localNumber = digits.startsWith('91') ? digits.slice(2) : digits;
  return localNumber || '9034677123';
};

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const businessInfo = useBusinessInfo();
  const location = useLocation();
  const whatsappDigits = String(businessInfo.whatsapp || '').replace(/\D/g, '');
  const whatsappNumber = whatsappDigits.startsWith('91') ? whatsappDigits : `91${whatsappDigits}`;
  const phoneDigits = String(businessInfo.phone || '').replace(/\D/g, '');
  const phoneNumber = phoneDigits.startsWith('91') ? phoneDigits.slice(2) : phoneDigits;
  const phoneHref = phoneDigits.startsWith('91') ? `+${phoneDigits}` : `+91${phoneDigits}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedLang = localStorage.getItem('kundu-language');
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    const htmlElem = document.documentElement;
    htmlElem.lang = language;
    htmlElem.className = language === 'en' ? 'en' : 'hi';
    localStorage.setItem('kundu-language', language);
    window.dispatchEvent(new Event('languagechange'));
  }, [language]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsMenuOpen(false);
  }, [location]);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} role="banner">
      <div className="header-top-bar">
        <div className="container header-top-content">
          <div className="header-announcement">
            <Leaf size={17} aria-hidden="true" />
            <span className="text-latin">Pure • Natural • Chemical Free</span>
            <span className="header-announcement-divider" aria-hidden="true">|</span>
            <span className="header-announcement-secondary text-latin">100% Organic Food for a Healthier Tomorrow</span>
            <span className="text-hindi">शुद्ध • प्राकृतिक • रसायन-मुक्त भोजन</span>
          </div>
          <a className="header-email" href={`mailto:${businessInfo.email}`} aria-label={`Email ${businessInfo.email}`}>
            <Mail size={14} aria-hidden="true" />
            <span>{businessInfo.email}</span>
          </a>
          <div className="header-trust-badges" aria-label="Delivery and payment information">
            {trustBadges.map((badge, index) => (
              <span key={index} className="trust-badge">
                <badge.icon size={16} aria-hidden="true" />
                <span>{language === 'hi' ? badge.text : badge.textEn}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <nav className="header-nav" role="navigation" aria-label="Main navigation">
        <div className="container header-nav-content">
          <Link to="/" className="header-logo" aria-label="Kundu Naturals - Home">
            <img
              src="/images/website-logo.png"
              alt="Kundu Naturals Logo"
              className="logo-image"
            />
          </Link>

          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'is-open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'मेनू बंद करें' : 'मेनू खोलें'}
          >
            {isMobileMenuOpen ? <X width="24" height="24" /> : <Menu width="24" height="24" />}
          </button>

          <ul id="mobile-menu" className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <li>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                <Home size={18} aria-hidden="true" />
                <span className="nav-label"><span className="text-hindi">होम</span><span className="text-latin">Home</span></span>
              </Link>
            </li>
            <li>
              <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                <UserRound size={18} aria-hidden="true" />
                <span className="nav-label"><span className="text-hindi">हमारे बारे में</span><span className="text-latin">About</span></span>
              </Link>
            </li>
            <li className={`nav-products ${isProductsMenuOpen ? 'open' : ''}`}>
              <button
                type="button"
                className={`nav-link nav-products-toggle ${location.pathname.startsWith('/products') || location.pathname === '/our-brand' ? 'active' : ''}`}
                aria-expanded={isProductsMenuOpen}
                aria-haspopup="true"
                onClick={() => setIsProductsMenuOpen((open) => !open)}
              >
                <Leaf size={19} aria-hidden="true" />
                <span className="nav-label"><span className="text-hindi">प्रोडक्ट्स</span><span className="text-latin">Products</span></span>
                <ChevronDown size={16} className="nav-chevron" aria-hidden="true" />
              </button>
              <ul className="products-dropdown">
                <li><Link to="/products" onClick={() => { setIsMobileMenuOpen(false); setIsProductsMenuOpen(false); }}><span className="text-hindi">सभी प्रोडक्ट्स</span><span className="text-latin">All Products</span></Link></li>
                <li><Link to="/our-brand" onClick={() => { setIsMobileMenuOpen(false); setIsProductsMenuOpen(false); }}><span className="text-hindi">हमारा ब्रांड</span><span className="text-latin">Our Brand</span></Link></li>
              </ul>
            </li>
            {navLinks.slice(2).map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path || (link.path === '/products' && location.pathname.startsWith('/products')) ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon size={18} aria-hidden="true" />
                  <span className="nav-label"><span className="text-hindi">{link.label}</span><span className="text-latin">{link.labelEn}</span></span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="header-actions">
            <Link to="/products" className="header-search" aria-label={language === 'hi' ? 'प्रोडक्ट खोजें' : 'Search products'} title={language === 'hi' ? 'प्रोडक्ट खोजें' : 'Search products'}>
              <Search size={21} aria-hidden="true" />
            </Link>
            <div className="header-cta">
              <a className="header-cta-icon" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <Phone size={20} aria-hidden="true" />
              </a>
              <span className="header-cta-copy">
                <span>{language === 'hi' ? 'कॉल / व्हाट्सऐप' : 'Call / WhatsApp'}</span>
                <a href={`tel:${phoneHref}`}><strong>{formatPhoneNumber(phoneNumber)}</strong></a>
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="language-toggle-wrapper" role="navigation" aria-label="Language selection">
        <div className="container">
          <button
            type="button"
            className="lang-toggle"
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            aria-label={language === 'hi' ? 'Switch to English' : 'हिन्दी में बदलें'}
            title={language === 'hi' ? 'English' : 'हिन्दी'}
          >
            <Globe size={17} aria-hidden="true" />
            <span>{language === 'hi' ? 'EN' : 'हिंदी'}</span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <button
          type="button"
          className="mobile-menu-backdrop"
          aria-label={language === 'hi' ? 'मेनू बंद करें' : 'Close menu'}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}

export default Header;