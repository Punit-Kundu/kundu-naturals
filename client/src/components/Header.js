import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Truck, Shield, RotateCcw, Globe } from 'lucide-react';
import './Header.css';

const navLinks = [
  { path: '/', label: 'होम', labelEn: 'Home' },
  { path: '/about', label: 'हमारे बारे में', labelEn: 'About Us' },
  { path: '/products', label: 'प्रोडक्ट्स', labelEn: 'Products' },
  { path: '/gallery', label: 'गैलरी', labelEn: 'Gallery' },
  { path: '/our-brand', label: 'हमारा ब्रांड', labelEn: 'Our Brand' },
  { path: '/contact', label: 'संपर्क करें', labelEn: 'Contact' },
];

const trustBadges = [
  { icon: Leaf, text: '100% प्राकृतिक', textEn: '100% Natural' },
  { icon: Truck, text: 'मुफ्त शिपिंग', textEn: 'Free Shipping' },
  { icon: Shield, text: 'गुणवत्ता की गारंटी', textEn: 'Quality Guaranteed' },
  { icon: RotateCcw, text: 'आसान रिटर्न', textEn: 'Easy Returns' },
];

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' for English default, 'hi' for Hindi
  const location = useLocation();

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
    htmlElem.className = language === 'en' ? 'en' : 'hi';
    localStorage.setItem('kundu-language', language);
    window.dispatchEvent(new Event('languagechange'));
  }, [language]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} role="banner">
      <div className="header-top-bar">
        <div className="container header-top-content">
          <div className="header-contact">
            <span className="header-phone">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>+91-XXXXXXXXXX</span>
            </span>
            <span className="header-email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>kundupunit927@gmail.com</span>
            </span>
          </div>
          <div className="header-trust-badges" aria-label="Trust indicators">
            {trustBadges.map((badge, index) => (
              <span key={index} className="trust-badge">
                <badge.icon width="14" height="14" aria-hidden="true" />
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
              src="/images/logo.png"
              alt="Kundu Naturals Logo"
              className="logo-image"
              onError={(e) => { e.target.src = '/images/logo-placeholder.svg'; }}
            />
            <div className="logo-text">
              <span className={`logo-name ${language === 'hi' ? 'text-hindi' : 'text-latin'}`}>
                {language === 'hi' ? 'कुंडू नेचुरल्स' : 'Kundu Naturals'}
              </span>
              <span className={`logo-tagline ${language === 'hi' ? 'text-hindi' : 'text-latin'}`}>
                {language === 'hi' ? 'शुद्ध आहार, स्वस्थ जीवन' : 'Pure Food • Healthy Life'}
              </span>
            </div>
          </Link>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'मेनू बंद करें' : 'मेनू खोलें'}
          >
            {isMobileMenuOpen ? <X width="24" height="24" /> : <Menu width="24" height="24" />}
          </button>

          <ul id="mobile-menu" className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`} role="menubar">
            {navLinks.map((link) => (
              <li key={link.path} role="none">
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  role="menuitem"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="nav-label">
                    <span className="text-hindi">{link.label}</span>
                    <span className="text-latin">{link.labelEn}</span>
                  </span>
                </Link>
              </li>
            ))}
            <li className="nav-cta-mobile" role="none">
              <Link to="/contact" className="btn btn-primary btn-lg" role="menuitem">
                <span className="text-hindi">हमसे संपर्क करें</span>
                <span className="text-latin">Contact Us</span>
              </Link>
            </li>
          </ul>

          <div className="header-actions">
            <Link to="/contact" className="btn btn-primary header-cta">
              <span className="text-hindi">संपर्क करें</span>
              <span className="text-latin">Contact Us</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Language Toggle - Below Nav, on Page */}
      <div className="language-toggle-wrapper" role="navigation" aria-label="Language selection">
        <div className="container">
          <button
            className="lang-toggle"
            onClick={() => {
              setLanguage(language === 'hi' ? 'en' : 'hi');
            }}
            aria-label={language === 'hi' ? 'English' : 'हिन्दी'}
            title={language === 'hi' ? 'English' : 'हिन्दी'}
          >
            {language === 'hi' ? <Leaf width="18" height="18" /> : <Globe width="18" height="18" />}
            <span>{language === 'hi' ? 'हिन्दी' : 'English'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;