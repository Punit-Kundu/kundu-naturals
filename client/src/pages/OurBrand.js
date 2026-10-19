import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sun, Droplet, Sprout, Heart, Shield, Award, Truck, Wheat, Leaf as LeafIcon, Sparkles, Mountain, TreePine } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import './OurBrand.css';

const brandColors = [
  {
    name: 'Deep Espresso',
    nameEn: 'Deep Espresso',
    hex: '#302018',
    role: 'Primary brand color',
    roleEn: 'Primary brand color',
    meaning: 'Strength, tradition, depth, trust. Represents our deep roots and commitment to authentic traditional practices.',
    meaningEn: 'Strength, tradition, depth, trust. Represents our deep roots and commitment to authentic traditional practices.',
  },
  {
    name: 'Dark Coffee',
    nameEn: 'Dark Coffee',
    hex: '#452A1D',
    role: 'Deep accent color',
    roleEn: 'Deep accent color',
    meaning: 'Maturity, stability, depth, and trust. Represents our roots, tradition, and long-term quality promise.',
    meaningEn: 'Maturity, stability, depth, and trust. Represents our roots, tradition, and long-term quality promise.',
  },
  {
    name: 'Antique Gold',
    nameEn: 'Antique Gold',
    hex: '#D6AD62',
    role: 'Energy & Warmth color',
    roleEn: 'Energy & Warmth color',
    meaning: 'Harvest joy, prosperity, and warmth. Represents the vitality of Indian agriculture and heritage.',
    meaningEn: 'Harvest joy, prosperity, and warmth. Represents the vitality of Indian agriculture and heritage.',
  },
  {
    name: 'Terracotta',
    nameEn: 'Terracotta',
    hex: '#A94F2B',
    role: 'Terracotta accent',
    roleEn: 'Terracotta accent',
    meaning: 'Clay, earth, warmth, and craft. Represents our connection to traditional craftsmanship and soil.',
    meaningEn: 'Clay, earth, warmth, and craft. Represents our connection to traditional craftsmanship and soil.',
  },
  {
    name: 'Cream / Off-White',
    nameEn: 'Cream / Off-White',
    hex: '#F8F3E9',
    role: 'Background & Breathing space',
    roleEn: 'Background & Breathing space',
    meaning: 'Purity, simplicity, cleanliness, and peace. Represents the purity of our products and brand simplicity.',
    meaningEn: 'Purity, simplicity, cleanliness, and peace. Represents the purity of our products and brand simplicity.',
  },
];

const brandValues = [
  { icon: Sprout, title: 'Seed to Plate', titleEn: 'Seed to Plate', desc: 'We monitor every stage from seed selection to final packaging.', descEn: 'We monitor every stage from seed selection to final packaging.' },
  { icon: Sun, title: 'Natural Sun & Rain', titleEn: 'Natural Sun & Rain', desc: 'No artificial controlled environments — only nature\'s blessing.', descEn: 'No artificial controlled environments — only nature\'s blessing.' },
  { icon: Droplet, title: 'Pure Water Sources', titleEn: 'Pure Water Sources', desc: 'Well, canal, and rainwater — no chemically treated water.', descEn: 'Well, canal, and rainwater — no chemically treated water.' },
  { icon: LeafIcon, title: 'Chemical-Free Promise', titleEn: 'Chemical-Free Promise', desc: 'No synthetic fertilizers, pesticides, herbicides, or preservatives.', descEn: 'No synthetic fertilizers, pesticides, herbicides, or preservatives.' },
  { icon: Heart, title: 'Traditional Wisdom', titleEn: 'Traditional Wisdom', desc: 'Grandmother\'s recipes, ancestral seeds, and generations of experience.', descEn: 'Grandmother\'s recipes, ancestral seeds, and generations of experience.' },
  { icon: Shield, title: 'Quality First', titleEn: 'Quality First', desc: 'Every batch tested, transparent labeling, and action on customer feedback.', descEn: 'Every batch tested, transparent labeling, and action on customer feedback.' },
];

const logoStory = [
  {
    title: 'Logo Symbolism',
    titleEn: 'Logo Symbolism',
    points: [
      'Leaf/Sprout: New beginnings, growth, and natural life',
      'Circle/Cycle: Wholeness, continuity, and nature\'s cycle',
      'Primary colors: Deep Espresso, Dark Coffee, Antique Gold, Terracotta, and Cream',
      'Brown/Golden touch: Connection to soil and harvest joy',
    ],
    pointsEn: [
      'Leaf/Sprout: New beginnings, growth, and natural life',
      'Circle/Cycle: Wholeness, continuity, and nature\'s cycle',
      'Primary colors: Deep Espresso, Dark Coffee, Antique Gold, Terracotta, and Cream',
      'Brown/Golden touch: Connection to soil and harvest joy',
    ],
  },
  {
    title: 'Design Inspiration',
    titleEn: 'Design Inspiration',
    points: [
      'Traditional Indian village handmade signboards',
      'Texture of earthen pots and jute bags',
      'Simple beauty of crops swaying in fields',
      'Hard work and honesty of Indian farmer\'s hands',
    ],
    pointsEn: [
      'Traditional Indian village handmade signboards',
      'Texture of earthen pots and jute bags',
      'Simple beauty of crops swaying in fields',
      'Hard work and honesty of Indian farmer\'s hands',
    ],
  },
  {
    title: 'Typography Choices',
    titleEn: 'Typography Choices',
    points: [
      'Devanagari: Noto Sans Devanagari — Legible, modern yet traditional',
      'Latin: Poppins — Clean, contemporary, multilingual support',
      'Combination of both: Honoring India\'s bilingual reality',
    ],
    pointsEn: [
      'Devanagari: Noto Sans Devanagari — Legible, modern yet traditional',
      'Latin: Poppins — Clean, contemporary, multilingual support',
      'Combination of both: Honoring India\'s bilingual reality',
    ],
  },
];

const philosophyPoints = [
  {
    icon: Wheat,
    title: 'Food is Medicine',
    titleEn: 'Food is Medicine',
    desc: 'Ayurvedic principle "Annam Brahma" — Food is Divine. Pure food is the foundation of healthy body and mind.',
    descEn: 'Ayurvedic principle "Annam Brahma" — Food is Divine. Pure food is the foundation of healthy body and mind.',
  },
  {
    icon: TreePine,
    title: 'Soil is Alive',
    titleEn: 'Soil is Alive',
    desc: 'Healthy soil = Healthy crop = Healthy human. We protect soil microbes, earthworms, and organic matter.',
    descEn: 'Healthy soil = Healthy crop = Healthy human. We protect soil microbes, earthworms, and organic matter.',
  },
  {
    icon: Mountain,
    title: 'Farmer Families Are Our Family',
    titleEn: 'Farmer Families Are Our Family',
    desc: 'Fair prices, timely payment, technical support, and respect — not just words, our commitment.',
    descEn: 'Fair prices, timely payment, technical support, and respect — not just words, our commitment.',
  },
  {
    icon: Sparkles,
    title: 'Beauty in Simplicity',
    titleEn: 'Beauty in Simplicity',
    desc: 'No over-processing, artificial colors, fancy packaging — just nature\'s pure form, as it should be.',
    descEn: 'No over-processing, artificial colors, fancy packaging — just nature\'s pure form, as it should be.',
  },
];

function OurBrand() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const syncLanguage = () => {
      const saved = localStorage.getItem('kundu-language');
      if (saved) setLanguage(saved);
    };
    syncLanguage();
    window.addEventListener('languagechange', syncLanguage);
    return () => window.removeEventListener('languagechange', syncLanguage);
  }, []);

  return (
    <>
      {/* Page Header */}
      <section className="page-header" aria-labelledby="brand-title">
        <div className="page-header-bg" aria-hidden="true">
          <img
            src="/images/brand-header.jpg"
            alt=""
            className="page-header-image"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="page-header-overlay" />
        </div>
        <div className="container page-header-content">
          <motion.h1
            id="brand-title"
            className="page-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-hindi">{language === 'hi' ? 'हमारा ब्रांड' : 'Our Brand'}</span>
            <span className="text-latin">{language === 'en' ? 'Our Brand' : 'हमारा ब्रांड'}</span>
          </motion.h1>
          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-hindi">{language === 'hi' ? 'Visual identity and philosophy' : 'Visual identity and philosophy'}</span>
            <span className="text-latin">{language === 'en' ? 'Visual identity and philosophy' : 'हमारा ब्रांड'}</span>
          </motion.p>
        </div>
      </section>

      {/* Logo Story */}
      <section className="logo-story section" aria-labelledby="logo-title">
        <div className="container">
          <SectionHeader
            title="Logo Story"
            titleHindi="Logo Story"
            titleEn="Logo Story"
            subtitle="Meaning behind our symbol"
            subtitleHindi="हमारे प्रतीक के पीछे का अर्थ"
            subtitleEn="Meaning behind our symbol"
          />
          <div className="logo-story-grid">
            <motion.div
              className="logo-display"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="logo-showcase">
                <img
                  src="/images/logo.png"
                  alt="Kundu Naturals logo"
                  className="logo-main"
                  onError={(e) => { e.target.src = '/images/logo-placeholder.svg'; }}
                />
              </div>
              <div className="logo-variants">
                <h4 className="story-section-title">{language === 'hi' ? 'लोगो विविधताएं' : 'Logo Variants'}</h4>
                <div className="variant-row">
                  <div className="variant-item">
                    <div className="variant-preview primary" />
                    <span>{language === 'hi' ? 'प्राथमिक' : 'Primary'}</span>
                  </div>
                  <div className="variant-item">
                    <div className="variant-preview mono" />
                    <span>{language === 'hi' ? 'मोनोक्रोम' : 'Mono'}</span>
                  </div>
                  <div className="variant-item">
                    <div className="variant-preview icon" />
                    <span>{language === 'hi' ? 'केवल आइकन' : 'Icon only'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="logo-story-content"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {logoStory.map((section, index) => (
                <div key={index} className="logo-story-section">
                  <h3 className="story-section-title">
                    <span className="text-hindi">{section.titleHindi}</span>
                    <span className="text-latin">{section.titleEn}</span>
                  </h3>
                  <ul className="story-points">
                    {section.points.map((point, i) => (
                      <li key={i} className="story-point">
                        <span className="point-bullet" aria-hidden="true">▸</span>
                        <span>{language === 'hi' ? point : (section.pointsEn ? section.pointsEn[i] : point)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="color-palette section section-alt" aria-labelledby="colors-title">
        <div className="container">
          <motion.div
            className="colors-grid"
            aria-labelledby="colors-title"
          >
            {brandColors.map((color, index) => (
              <motion.article
                key={color.name}
                className="color-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div
                  className="color-swatch"
                  style={{ backgroundColor: color.hex }}
                  role="img"
                  aria-label={`${color.nameHindi || color.name} - ${color.hex}`}
                >
                  <span className="color-hex">{color.hex}</span>
                </div>
                <div className="color-info">
                  <h4 className="color-name">
                    <span className="text-hindi">{color.nameHindi || color.name}</span>
                    <span className="text-latin">{color.nameEn || color.name}</span>
                  </h4>
                  <span className="color-role">
                    <span className="text-hindi">{color.roleHindi || color.role}</span>
                    <span className="text-latin">{color.roleEn || color.role}</span>
                  </span>
                  <p className="color-meaning">
                    <span className="text-hindi">{color.meaningHindi || color.meaning}</span>
                    <span className="text-latin">{color.meaningEn || color.meaning}</span>
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Color Usage */}
          <motion.div
            className="color-usage"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="usage-title">
              <span className="text-hindi">{language === 'hi' ? 'Color usage guidelines' : 'Color usage guidelines'}</span>
              <span className="text-latin">{language === 'en' ? 'Color usage guidelines' : 'Color usage guidelines'}</span>
            </h3>
            <div className="usage-examples">
              <div className="usage-example">
                <span className="usage-label text-hindi">{language === 'hi' ? 'Primary usage' : 'Primary usage'}</span>
                <div className="usage-colors primary">
                  <div className="usage-swatch" style={{ background: '#302018' }} />
                  <div className="usage-swatch" style={{ background: '#452A1D' }} />
                </div>
              </div>
              <div className="usage-example">
                <span className="usage-label text-hindi">{language === 'hi' ? 'Accent and CTA' : 'Accent and CTA'}</span>
                <div className="usage-colors accent">
                  <div className="usage-swatch" style={{ background: '#D6AD62' }} />
                  <div className="usage-swatch" style={{ background: '#f5e6a0' }} />
                </div>
              </div>
              <div className="usage-example">
                <span className="usage-label text-hindi">{language === 'hi' ? 'Background' : 'Background'}</span>
                <div className="usage-colors bg">
                  <div className="usage-swatch" style={{ background: '#F8F3E9' }} />
                  <div className="usage-swatch" style={{ background: '#f5f0e8' }} />
                  <div className="usage-swatch" style={{ background: '#e8dcc8' }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="brand-values section" aria-labelledby="values-title">
        <div className="container">
          <SectionHeader
            title="Brand Values"
            titleHindi="Brand Values"
            titleEn="Brand Values"
            subtitle="The basis of every decision"
            subtitleEn="The basis of every decision"
          />
          <motion.div
            className="values-grid"
            aria-labelledby="values-title"
          >
            {brandValues.map((value, index) => (
              <motion.article
                key={value.title}
                className="value-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="value-icon">
                  <value.icon width="28" height="28" aria-hidden="true" />
                </div>
                <h4 className="value-title">
                  <span className="text-hindi">{value.titleHindi}</span>
                  <span className="text-latin">{value.titleEn}</span>
                </h4>
                <p className="value-desc">
                  <span className="text-hindi">{value.descHindi}</span>
                  <span className="text-latin">{value.descEn}</span>
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="philosophy section section-alt" aria-labelledby="philosophy-title">
        <div className="container">
          <SectionHeader
            title="Our Philosophy"
            titleHindi="Our Philosophy"
            titleEn="Our Philosophy"
            subtitle="Our belief in traditional Indian food culture"
            subtitleEn="Our belief in traditional Indian food culture"
          />
          <motion.div
            className="philosophy-grid"
            aria-labelledby="philosophy-title"
          >
            {philosophyPoints.map((point, index) => (
              <motion.article
                key={point.title}
                className="philosophy-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="philosophy-icon">
                  <point.icon width="32" height="32" aria-hidden="true" />
                </div>
                <h3 className="philosophy-title">
                  <span className="text-hindi">{point.titleHindi}</span>
                  <span className="text-latin">{point.titleEn}</span>
                </h3>
                <p className="philosophy-desc">
                  <span className="text-hindi">{point.descHindi}</span>
                  <span className="text-latin">{point.descEn}</span>
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Visual Identity in Practice */}
      <section className="visual-practice section" aria-labelledby="visual-title">
        <div className="container">
          <SectionHeader
            title="Brand Identity in Practice"
            titleHindi="दैनिक जीवन में ब्रांड पहचान"
            titleEn="Brand Identity in Practice"
            subtitle="Our colors, typography and style at every touchpoint"
            subtitleEn="Our colors, typography and style at every touchpoint"
          />
          <motion.div
            className="practice-grid"
            aria-labelledby="visual-title"
          >
            {[
              { label: 'Product Packaging', labelEn: 'Product Packaging', image: '/images/brand/packaging-brand.jpg' },
              { label: 'Farmer Handbook', labelEn: 'Farmer Handbook', image: '/images/brand/farmer-handbook.jpg' },
              { label: 'Delivery Box', labelEn: 'Delivery Boxes', image: '/images/brand/delivery-box.jpg' },
              { label: 'Shop Signage', labelEn: 'Shop Signage', image: '/images/brand/shop-signage.jpg' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="practice-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="practice-image-wrapper">
                  <img
                    src={item.image}
                    alt={`${item.label} brand identity`}
                    className="practice-image"
                    loading="lazy"
                    onError={(e) => { e.target.src = '/images/brand-placeholder.svg'; }}
                  />
                </div>
                <div className="practice-info">
                  <h4>{language === 'hi' ? item.label : item.labelEn}</h4>
                  <p>{language === 'hi' ? 'Consistent use of brand colors, logo and typography' : 'Consistent use of brand colors, logo and typography'}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="brand-cta section" aria-labelledby="brand-cta-title">
        <div className="container">
          <motion.div
            className="brand-cta-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="brand-cta-title" className="text-hindi">
              <span className="text-hindi">{language === 'hi' ? 'Experience our values' : 'Experience our values'}</span>
              <span className="text-latin">{language === 'en' ? 'Experience our values' : 'हमारे मूल्यों का अनुभव करें'}</span>
            </h2>
            <p className="text-hindi">
              <span className="text-hindi">{language === 'hi' ? 'Try our products and feel the difference that traditional Indian knowledge and modern quality standards can make.' : 'Try our products and feel the difference that traditional Indian knowledge and modern quality standards can make.'}</span>
              <span className="text-latin">{language === 'en' ? 'Try our products and feel the difference that traditional Indian knowledge and modern quality standards can make.' : 'पारंपरिक भारतीय ज्ञान और आधुनिक गुणवत्ता मानक क्या बना सकते हैं.'}</span>
            </p>
            <div className="cta-buttons">
              <a href="/products" className="btn btn-primary btn-lg">
                <span className="text-hindi">{language === 'hi' ? 'View Products' : 'उत्पाद देखें'}</span>
                <span className="text-latin">{language === 'en' ? 'View Products' : 'उत्पाद देखें'}</span>
              </a>
              <a href="/about" className="btn btn-outline btn-lg">
                <span className="text-hindi">{language === 'hi' ? 'Read our story' : 'हमारी कहानी पढ़ें'}</span>
                <span className="text-latin">{language === 'en' ? 'Read our story' : 'हमारी कहानी पढ़ें'}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default OurBrand;