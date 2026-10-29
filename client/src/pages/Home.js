import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, MotionConfig } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Truck, Shield, RotateCcw, Play, Wheat, Heart, Users, Award } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem, heroVariants, heroContentVariants, heroButtonVariants, scrollReveal, scrollRevealLeft, scrollRevealRight, cardHover, buttonHover, buttonHoverGold, imageReveal, sectionHeaderVariants, floatAnimation, gridStagger, dividerVariants } from '../utils/animations';
import './Home.css';

/**
 * react-router's <Link> wrapped as a Framer Motion component.
 * NOTE: `motion.Link` is WRONG — it renders an invalid <Link> DOM tag and
 * React logs the "incorrect casing" warning. `motion.create(Link)` is correct.
 */
const MotionLink = motion.create(Link);

// Sample products data - replace with actual data
const featuredProducts = [
  {
    id: 'organic-wheat',
    name: 'Organic Wheat Flour',
    nameHindi: 'जैविक गेहूं का आटा',
    description: 'Stone-ground whole wheat flour from our farms',
    descriptionHindi: 'हमारे खेतों से पत्थर-पिसा साबुत गेहूं का आटा',
    image: '/images/Kundu-Naturals-All-Products/21-kundu-naturals-sarbati-atta.webp',
    category: 'Grains',
    categoryHindi: 'अनाज',
    packSizes: ['1 kg', '5 kg', '10 kg'],
    price: 120,
    originalPrice: 150,
    inStock: true,
    isFeatured: true,
    isOrganic: true,
  },
  {
    id: 'organic-turmeric',
    name: 'Organic Turmeric Powder',
    nameHindi: 'जैविक हल्दी पाउडर',
    description: 'Pure turmeric with high curcumin content',
    descriptionHindi: 'उच्च करक्यूमिन सामग्री वाली शुद्ध हल्दी',
    image: '/images/Kundu-Naturals-All-Products/19-kundu-naturals-haldi-powder.webp',
    category: 'Spices',
    categoryHindi: 'मसाले',
    packSizes: ['100g', '250g', '500g'],
    price: 180,
    originalPrice: 220,
    inStock: true,
    isFeatured: true,
    isOrganic: true,
  },
  {
    id: 'organic-honey',
    name: 'Raw Forest Honey',
    nameHindi: 'कच्चा वन शहद',
    description: 'Unprocessed honey from wild bees',
    descriptionHindi: 'जंगली मधुमक्खियों से असंसाधित शहद',
    image: '/images/Kundu-Naturals-All-Products/37-kundu-naturals-multifloral-honey.webp',
    category: 'Honey',
    categoryHindi: 'शहद',
    packSizes: ['250g', '500g', '1 kg'],
    price: 350,
    inStock: true,
    isFeatured: true,
    isOrganic: true,
  },
  {
    id: 'organic-mustard-oil',
    name: 'Cold Pressed Mustard Oil',
    nameHindi: 'कोल्ड प्रेस्ड सरसों तेल',
    description: 'Traditional kachi ghani mustard oil',
    descriptionHindi: 'पारंपरिक कच्ची घानी सरसों तेल',
    image: '/images/Kundu-Naturals-All-Products/33-kundu-naturals-yellow-mustard-oil.webp',
    category: 'Oils',
    categoryHindi: 'तेल',
    packSizes: ['500ml', '1L', '2L'],
    price: 280,
    originalPrice: 320,
    inStock: true,
    isFeatured: true,
    isOrganic: true,
  },
];

const values = [
  {
    icon: Wheat,
    title: 'Pure Ingredients',
    titleHindi: 'शुद्ध सामग्री',
    description: 'Only natural, chemical-free produce',
    descriptionHindi: 'केवल प्राकृतिक, रसायन-मुक्त उत्पाद',
  },
  {
    icon: Heart,
    title: 'Direct from Farmers',
    titleHindi: 'किसानों से सीधा',
    description: 'No middlemen, fair prices',
    descriptionHindi: 'बिचौलियों के बिना, उचित मूल्य',
  },
  {
    icon: Users,
    title: 'Traditional Wisdom',
    titleHindi: 'पारंपरिक ज्ञान',
    description: 'Methods passed through generations',
    descriptionHindi: 'पीढ़ियों से चली आ रही विधियाँ',
  },
  {
    icon: Award,
    title: 'Quality Promise',
    titleHindi: 'गुणवत्ता का वादा',
    description: 'Trust and purity in every pack',
    descriptionHindi: 'हर पैक में विश्वास और शुद्धता',
  },
];

const stats = [
  { number: '50+', label: 'Products', labelHindi: 'उत्पाद' },
  { number: '100+', label: 'Farmer Families', labelHindi: 'किसान परिवार' },
  { number: '10,000+', label: 'Happy Customers', labelHindi: 'खुश ग्राहक' },
  { number: '15+', label: 'Years Experience', labelHindi: 'साल का अनुभव' },
];

/* ============================================================
   HERO entrance animation variants
   Only transform + opacity are animated (GPU friendly, 60fps)
   `custom` is used as the per-item stagger delay.
   ============================================================ */
const EASE = [0.22, 1, 0.36, 1];

// word-by-word reveal (headline + subtext)
const wordItem = {
  hidden: { opacity: 0, y: '0.55em' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, delay: i, ease: EASE },
  }),
};

// the gold highlighted chunk of the headline
const goldItem = {
  hidden: { opacity: 0, y: '0.6em' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, delay: i, ease: EASE },
  }),
};

// soft fade + rise
const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i, ease: EASE },
  }),
};

// pop in (badges, buttons, avatars, numbers)
const popItem = {
  hidden: { opacity: 0, scale: 0.72, y: 12 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, delay: i, ease: EASE },
  }),
};

// grow from the centre (dividers)
const growItem = {
  hidden: { opacity: 0, scaleY: 0, scaleX: 0.6 },
  show: (i = 0) => ({
    opacity: 1,
    scaleY: 1,
    scaleX: 1,
    transition: { duration: 0.7, delay: i, ease: EASE },
  }),
};

/** Splits a sentence into words, each fading up with its own stagger delay. */
function HeroWords({ text, base = 0, step = 0.05 }) {
  const words = String(text).trim().split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <motion.span
            className="kn-hero-word"
            custom={base + i * step}
            variants={wordItem}
            initial="hidden"
            animate="show"
          >
            {word}
          </motion.span>
          {' '}
        </React.Fragment>
      ))}
    </>
  );
}

function Home() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [counts, setCounts] = useState([0, 0, 0]);
  const targets = [100, 50, 15];

  useEffect(() => {
    if (!statsInView) return;
    const duration = 1600;
    let start = null;
    let raf = 0;
    const tick = (now) => {
      if (!start) start = now;
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCounts(targets.map((t) => Math.round(t * eased)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [statsInView]);

  const onHeroMouseMove = (e) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setMouse({ x: x * 22, y: y * 22 });
  };
  const onHeroMouseLeave = () => setMouse({ x: 0, y: 0 });

  return (
    <>
      {/* HERO SECTION - Premium kn- prefix */}
      <MotionConfig reducedMotion="user">
      <section
        className="kn-hero"
        aria-labelledby="kn-hero-title"
        ref={heroRef}
        onMouseMove={onHeroMouseMove}
        onMouseLeave={onHeroMouseLeave}
      >
        {/* Background */}
        <div className="kn-hero-bg" aria-hidden="true">
          <motion.img
            src="/homepage hero section image.png"
            alt=""
            className="kn-hero-bg-img"
            loading="eager"
            decoding="async"
          />
          <div className="kn-hero-overlay" />
          <div className="kn-hero-glow" />
        </div>

        {/* Particles */}
        <div className="kn-hero-particles" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className={`kn-particle kn-particle-${i % 6}`}
              style={{
                left: `${(i * 7.3 + 3) % 92}%`,
                top: `${(i * 11.7 + 5) % 78}%`,
                animationDelay: `${(i * 0.55).toFixed(2)}s`,
                animationDuration: `${7 + (i % 4)}s`,
              }}
            />
          ))}
        </div>

        <div className="kn-hero-container container">
          {/* LEFT */}
          <div className="kn-hero-content">
            {/* Badge */}
            <motion.span
              className="kn-hero-badge"
              custom={0.15}
              variants={popItem}
              initial="hidden"
              animate="show"
            >
              <motion.span
                className="kn-hero-badge-icon"
                initial={{ opacity: 0, scale: 0.3, rotate: -120 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              >
                <Leaf size={14} aria-hidden="true" />
              </motion.span>
              <span className="text-hindi">100% शुद्ध • खेत से ताज़ा • लैब टेस्टेड</span>
              <span className="text-latin">100% Pure • Farm Fresh • Lab Tested</span>
            </motion.span>

            {/* Headline — word by word */}
            <motion.h1 id="kn-hero-title" className="kn-hero-title">
              <span className="text-hindi">
                <HeroWords text="प्रकृति का शुद्ध आशीर्वाद," base={0.3} step={0.06} />
                <motion.span
                  className="kn-hero-title-gold"
                  custom={0.74}
                  variants={goldItem}
                  initial="hidden"
                  animate="show"
                >
                  सीधे आपके घर तक
                </motion.span>
              </span>
              <span className="text-latin">
                <HeroWords text="Pure Nature's Blessing," base={0.3} step={0.06} />
                <motion.span
                  className="kn-hero-title-gold"
                  custom={0.74}
                  variants={goldItem}
                  initial="hidden"
                  animate="show"
                >
                  Direct to Your Home
                </motion.span>
              </span>
            </motion.h1>

            {/* Subtext — word by word */}
            <motion.p className="kn-hero-sub">
              <span className="text-hindi">
                <HeroWords
                  text="प्रीमियम देसी घी, कोल्ड-प्रेस तेल, चक्की आटा, शहद और मसाले — पारंपरिक तरीके से बने, बिल्कुल बिना रसायन।"
                  base={0.95}
                  step={0.022}
                />
              </span>
              <span className="text-latin">
                <HeroWords
                  text="Premium desi ghee, cold-pressed oils, chakki atta, honey and spices — made the traditional way, with zero chemicals."
                  base={0.95}
                  step={0.022}
                />
              </span>
            </motion.p>

            {/* CTAs — one by one */}
            <div className="kn-hero-ctas">
              <motion.div
                className="kn-hero-cta-wrap"
                custom={1.5}
                variants={popItem}
                initial="hidden"
                animate="show"
              >
                <Link to="/products" className="kn-hero-btn kn-hero-btn-primary">
                  <span className="kn-hero-btn-shimmer" aria-hidden="true" />
                  <span className="text-hindi">अभी खरीदें</span>
                  <span className="text-latin">Shop Now</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </motion.div>
              <motion.div
                className="kn-hero-cta-wrap"
                custom={1.62}
                variants={popItem}
                initial="hidden"
                animate="show"
              >
                <Link to="/about" className="kn-hero-btn kn-hero-btn-glass">
                  <span className="kn-hero-play" aria-hidden="true">
                    <Play size={12} />
                  </span>
                  <span className="text-hindi">हमारी कहानी</span>
                  <span className="text-latin">Our Story</span>
                </Link>
              </motion.div>
            </div>

            {/* Trust row — avatars, rating, chips each animated */}
            <motion.div
              className="kn-hero-trust"
              custom={1.72}
              variants={fadeUpItem}
              initial="hidden"
              animate="show"
            >
              <motion.div className="kn-hero-trust-avatars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className={`kn-avatar kn-avatar-${i}`}
                    custom={1.8 + i * 0.07}
                    variants={popItem}
                    initial="hidden"
                    animate="show"
                  />
                ))}
              </motion.div>
              <motion.span
                className="kn-hero-trust-text"
                custom={1.95}
                variants={fadeUpItem}
                initial="hidden"
                animate="show"
              >
                <motion.span
                  className="kn-hero-trust-stars"
                  initial={{ opacity: 0, letterSpacing: '0.6em' }}
                  animate={{ opacity: 1, letterSpacing: '0.06em' }}
                  transition={{ duration: 0.8, delay: 2.0, ease: EASE }}
                >
                  ★★★★★
                </motion.span>{' '}
                <span className="text-hindi">4.9 — 2,000+ खुश ग्राहक</span>
                <span className="text-latin">4.9 — from 2,000+ happy customers</span>
              </motion.span>
              <motion.div
                className="kn-hero-trust-divider"
                custom={2.05}
                variants={growItem}
                initial="hidden"
                animate="show"
                aria-hidden="true"
              />
              <div className="kn-hero-trust-chips">
                <motion.span
                  className="kn-hero-trust-chip"
                  custom={2.1}
                  variants={fadeUpItem}
                  initial="hidden"
                  animate="show"
                >
                  <Truck size={14} aria-hidden="true" />{' '}
                  <span className="text-hindi">फ्री शिपिंग</span>
                  <span className="text-latin">Free Shipping</span>
                </motion.span>
                <motion.span
                  className="kn-hero-trust-chip"
                  custom={2.2}
                  variants={fadeUpItem}
                  initial="hidden"
                  animate="show"
                >
                  <Shield size={14} aria-hidden="true" />{' '}
                  <span className="text-hindi">गुणवत्ता गारंटी</span>
                  <span className="text-latin">Quality Guaranteed</span>
                </motion.span>
                <motion.span
                  className="kn-hero-trust-chip"
                  custom={2.3}
                  variants={fadeUpItem}
                  initial="hidden"
                  animate="show"
                >
                  <RotateCcw size={14} aria-hidden="true" />{' '}
                  <span className="text-hindi">आसान रिटर्न</span>
                  <span className="text-latin">Easy Returns</span>
                </motion.span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating glass product cards + rotating organic badge (over the hero image) */}
        <div className="kn-hero-floaters" aria-hidden="true">
          <motion.div
            className="kn-hero-card kn-hero-card-1"
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
          >
            <span className="kn-hero-card-icon">🫙</span>
            <span className="kn-hero-card-name">
              <span className="text-hindi">A2 देसी घी</span>
              <span className="text-latin">A2 Desi Ghee</span>
            </span>
            <span className="kn-hero-card-rating">★ 4.9</span>
          </motion.div>
          <motion.div
            className="kn-hero-card kn-hero-card-2"
            initial={{ opacity: 0, x: -40, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            <span className="kn-hero-card-icon">🛢️</span>
            <span className="kn-hero-card-name">
              <span className="text-hindi">कोल्ड-प्रेस तेल</span>
              <span className="text-latin">Cold-Pressed Oil</span>
            </span>
            <span className="kn-hero-card-rating">★ 4.8</span>
          </motion.div>
          <motion.div
            className="kn-hero-card kn-hero-card-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}
          >
            <span className="kn-hero-card-icon">🍯</span>
            <span className="kn-hero-card-name">
              <span className="text-hindi">कच्चा शहद</span>
              <span className="text-latin">Raw Honey</span>
            </span>
            <span className="kn-hero-card-rating">★ 4.9</span>
          </motion.div>

          <motion.div
            className="kn-hero-ring-badge"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            aria-label="100% Organic"
          >
            <svg viewBox="0 0 140 140" className="kn-hero-ring-svg" aria-hidden="true">
              <defs>
                <path id="kn-ring-text-path" d="M 70,70 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0" />
              </defs>
              <text fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="600" letterSpacing="2.6">
                <textPath href="#kn-ring-text-path">ORGANIC • NATURAL • DESI • PURE • </textPath>
              </text>
            </svg>
            <span className="kn-hero-ring-center" aria-hidden="true">🌿</span>
          </motion.div>
        </div>

        {/* GLASS STATS BAR */}
        <motion.div
          ref={statsRef}
          className="kn-hero-stats glass"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="kn-hero-stat">
            <motion.span
              className="kn-hero-stat-num"
              custom={0.1}
              variants={popItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
            >
              {counts[0]}<span className="kn-hero-stat-suffix">%</span>
            </motion.span>
            <motion.span
              className="kn-hero-stat-label"
              custom={0.28}
              variants={fadeUpItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
            >
              <span className="text-hindi">प्राकृतिक</span><span className="text-latin">Natural</span>
            </motion.span>
          </div>
          <motion.div
            className="kn-hero-stat-divider"
            custom={0.34}
            variants={growItem}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            aria-hidden="true"
          />
          <div className="kn-hero-stat">
            <motion.span
              className="kn-hero-stat-num"
              custom={0.22}
              variants={popItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
            >
              {counts[1]}<span className="kn-hero-stat-suffix">+</span>
            </motion.span>
            <motion.span
              className="kn-hero-stat-label"
              custom={0.4}
              variants={fadeUpItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
            >
              <span className="text-hindi">उत्पाद</span><span className="text-latin">Products</span>
            </motion.span>
          </div>
          <motion.div
            className="kn-hero-stat-divider"
            custom={0.46}
            variants={growItem}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            aria-hidden="true"
          />
          <div className="kn-hero-stat">
            <motion.span
              className="kn-hero-stat-num"
              custom={0.34}
              variants={popItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
            >
              {counts[2]}<span className="kn-hero-stat-suffix">+</span>
            </motion.span>
            <motion.span
              className="kn-hero-stat-label"
              custom={0.52}
              variants={fadeUpItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
            >
              <span className="text-hindi">साल का अनुभव</span><span className="text-latin">Years Experience</span>
            </motion.span>
          </div>
        </motion.div>

        {/* Bottom organic wave divider */}
        <svg className="kn-hero-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,60 C240,90 480,20 720,50 C960,80 1200,10 1440,40 L1440,90 L0,90 Z" fill="#FBF8F1" />
        </svg>
      </section>
      </MotionConfig>
      {/* Values Section */}
      <section className="values-section section" aria-labelledby="values-title">
        <div className="container">
          <motion.div
            className="section-header"
            variants={sectionHeaderVariants}
          >
            <h2 id="values-title" className="heading-2">
              <span className="text-hindi">हमारे मूल्य</span>
              <span className="text-latin">Our Values</span>
            </h2>
          </motion.div>
          <motion.div
            className="values-grid"
            variants={staggerContainer(0.1)}
          >
            {values.map((value, index) => (
              <motion.article
                key={value.title}
                className="value-card"
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(48, 32, 24, 0.15)', transition: { duration: 0.3 } }}
              >
                <motion.div 
                  className="value-icon"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 100 }}
                >
                  <value.icon width="28" height="28" aria-hidden="true" />
                </motion.div>
                <motion.h3 
                  className="value-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  <span className="text-hindi">{value.titleHindi}</span>
                  <span className="text-latin">{value.title}</span>
                </motion.h3>
                <motion.p 
                  className="value-description text-hindi"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >{value.descriptionHindi}</motion.p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-preview section" aria-labelledby="about-preview-title">
        <div className="container">
          <div className="about-preview-grid">
            <motion.div
              className="about-preview-image"
              variants={scrollRevealLeft}
            >
              <div className="image-stack">
                <motion.img
                  src="/images/ramesh-kundu.jpg"
                  alt="रमेश कुंडू - संस्थापक, कुंडू नेचुरल्स"
                  className="main-image"
                  onError={(e) => { e.target.src = '/images/placeholder-person.jpg'; }}
                  variants={imageReveal}
                />
                <motion.img
                  src="/images/punit-kundu.jpg"
                  alt="पुनीत कुंडू - सह-संस्थापक, कुंडू नेचुरल्स"
                  className="overlay-image"
                  onError={(e) => { e.target.src = '/images/placeholder-person.jpg'; }}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 100 }}
                />
                <motion.div 
                  className="experience-badge"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.6, 
                    type: 'spring', 
                    stiffness: 100,
                    y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                  }}
                >
                  <span className="badge-years text-hindi">15+</span>
                  <span className="badge-years text-latin">15+</span>
                  <span className="badge-text text-hindi">साल का अनुभव</span>
                  <span className="badge-text text-latin">15+ years experience</span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              className="about-preview-content"
              variants={scrollRevealRight}
            >
              <motion.div 
                className="section-header"
                variants={sectionHeaderVariants}
              >
                <SectionHeader
                  alignment="left"
                  title="Our Story"
                  titleHindi="हमारी कहानी"
                  subtitle="Traditional farming and pure food heritage"
                  subtitleHindi="पारंपरिक खेती और शुद्ध भोजन की विरासत"
                />
              </motion.div>
              <motion.div 
                className="about-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <span className="text-hindi">
                    Kundu Naturals की शुरुआत <strong>2009</strong> में हरियाणा के एक छोटे से गांव में हुई,
                    जब श्री रमेश कुंडू ने अपने पैतृक खेतों में रासायनिक खाद और कीटनाशकों का उपयोग बंद करके
                    पारंपरिक जैविक खेती अपनाने का फैसला किया।
                  </span>
                  <span className="text-latin">
                    Kundu Naturals began in <strong>2009</strong> in a small village in Haryana,
                    when Mr. Ramesh Kundu decided to stop using chemical fertilizers and pesticides
                    and adopt traditional organic farming methods.
                  </span>
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <span className="text-hindi">
                    जो एक व्यक्तिगत प्रयोग के रूप में शुरू हुआ, वह धीरे-धीरे एक आंदोलन बन गया।
                    आस-पास के किसानों ने मिट्टी की सेहत में सुधार और फसल की गुणवत्ता देखी,
                    और वे भी इस पद्धति से जुड़ने लगे। 2016 में "Kundu Naturals" नाम से
                    ब्रांड को औपचारिक रूप दिया गया।
                  </span>
                  <span className="text-latin">
                    What started as a personal experiment gradually became a movement.
                    Neighboring farmers saw improvements in soil health and crop quality,
                    and they also joined this method. In 2016, "Kundu Naturals" brand
                    was formally registered.
                  </span>
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <span className="text-hindi">
                    आज हम <strong>100 से अधिक किसान परिवारों</strong> के साथ मिलकर काम करते हैं,
                    <strong>50+ प्राकृतिक उत्पाद</strong> तैयार करते हैं, और पूरे भारत में
                    <strong>10,000+ परिवारों</strong> तक शुद्ध भोजन पहुंचाते हैं।
                  </span>
                  <span className="text-latin">
                    Today we work with <strong>100+ farmer families</strong>,
                    prepare <strong>50+ natural products</strong>, and reach
                    <strong>10,000+ families</strong> across India with pure food.
                  </span>
                </motion.p>
              </motion.div>
              <motion.div
                className="about-highlights"
                aria-label="Statistics"
                variants={gridStagger(0.1)}
              >
                {stats.map((stat, index) => (
                  <motion.div key={stat.label} className="stat-item" variants={staggerItem}>
                    <motion.span 
                      className="stat-number"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-hindi">{stat.labelHindi}</span>
                      <span className="text-latin">{stat.label}</span>
                    </motion.span>
                    <motion.span 
                      className="stat-value"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                    >
                      <span className="text-hindi">{stat.number}</span>
                      <span className="text-latin">{stat.number}</span>
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
              <MotionLink 
                to="/about" 
                className="btn btn-primary"
                variants={buttonHoverGold}
                whileHover="whileHover"
                whileTap="whileTap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <span className="text-hindi">पूरी कहानी पढ़ें</span>
                <span className="text-latin">Read Full Story</span>
                <ArrowRight width="18" height="18" aria-hidden="true" />
              </MotionLink>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products section" aria-labelledby="featured-title">
        <div className="container">
          <motion.div
            className="section-header-row"
            aria-label="Featured products section"
            variants={sectionHeaderVariants}
          >
            <SectionHeader
              title="Our Special Products"
              titleHindi="हमारे विशेष उत्पाद"
              subtitle="Direct from farms, with love and care"
              subtitleHindi="किसानों के खेतों से सीधे, प्यार और देखभाल के साथ तैयार"
            />
            <MotionLink 
              to="/products" 
              className="btn btn-outline view-all-btn"
              variants={buttonHover}
              whileHover="whileHover"
              whileTap="whileTap"
            >
              <span className="text-hindi">सभी उत्पाद देखें</span>
              <span className="text-latin">View All Products</span>
              <ArrowRight width="18" height="18" aria-hidden="true" />
            </MotionLink>
          </motion.div>
          <motion.div
            className="products-grid"
            variants={gridStagger(0.08)}
            role="list"
            aria-label="Featured products"
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                role="listitem"
                variants={staggerItem}
              >
                <ProductCard
                  product={product}
                  // variant="compact" // or "default"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="gallery-preview section section-alt" aria-labelledby="gallery-preview-title">
        <div className="container">
          <motion.div
            className="section-header"
            variants={sectionHeaderVariants}
          >
            <SectionHeader
              title="A Glimpse from Our Gallery"
              titleHindi="हमारी गैलरी से झलक"
              subtitle="Photos of farms, products and our team"
              subtitleHindi="खेतों, उत्पादों और हमारी टीम की तस्वीरें"
            />
          </motion.div>
          <motion.div
            className="gallery-preview-grid"
            variants={gridStagger(0.08)}
            role="list"
            aria-label="Gallery preview"
          >
            {[
              { src: '/images/Kundu-Naturals-All-Products/21-kundu-naturals-sarbati-atta.webp', alt: 'Organic wheat flour', captionHindi: 'जैविक गेहूं का आटा', captionEn: 'Organic Wheat Flour' },
              { src: '/images/Kundu-Naturals-All-Products/02-kundu-naturals-basmati-rice.webp', alt: 'Organic basmati rice', captionHindi: 'जैविक बासमती चावल', captionEn: 'Organic Basmati Rice' },
              { src: '/images/Kundu-Naturals-All-Products/19-kundu-naturals-haldi-powder.webp', alt: 'Organic turmeric powder', captionHindi: 'जैविक हल्दी पाउडर', captionEn: 'Organic Turmeric Powder' },
              { src: '/images/Kundu-Naturals-All-Products/33-kundu-naturals-yellow-mustard-oil.webp', alt: 'Cold pressed mustard oil', captionHindi: 'कोल्ड प्रेस्ड सरसों तेल', captionEn: 'Cold Pressed Mustard Oil' },
              { src: '/images/Kundu-Naturals-All-Products/37-kundu-naturals-multifloral-honey.webp', alt: 'Raw forest honey', captionHindi: 'कच्चा वन शहद', captionEn: 'Raw Forest Honey' },
              { src: '/images/Kundu-Naturals-All-Products/11-kundu-naturals-moong-dhuli-dal.webp', alt: 'Organic moong dal', captionHindi: 'जैविक मूंग दाल', captionEn: 'Organic Moong Dal' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="gallery-preview-item"
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(48, 32, 24, 0.15)', transition: { duration: 0.3 } }}
              >
                <div className="gallery-preview-image-wrapper">
                  <div className="gallery-image-skeleton">
                    <motion.img
                      src={item.src}
                      alt={item.alt}
                      className="gallery-preview-image"
                      loading="lazy"
                      variants={imageReveal}
                    />
                  </div>
                  <motion.div 
                    className="gallery-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    variants={{ whileHover: { opacity: 1 } }}
                  >
                    <div className="overlay-content">
                      <span>
                        <span className="text-hindi">{item.captionHindi}</span>
                        <span className="text-latin">{item.captionEn}</span>
                      </span>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="gallery-caption"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <span className="text-hindi">{item.captionHindi}</span>
                    <span className="text-latin">{item.captionEn}</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className="gallery-preview-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <MotionLink 
              to="/gallery" 
              className="btn btn-outline btn-lg"
              variants={buttonHover}
              whileHover="whileHover"
              whileTap="whileTap"
            >
              <span className="text-hindi">पूरी गैलरी देखें</span>
              <span className="text-latin">View Full Gallery</span>
              <ArrowRight width="18" height="18" aria-hidden="true" />
            </MotionLink>
          </motion.div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="founders section" aria-labelledby="founders-title">
        <div className="container">
          <motion.div
            className="section-header"
            variants={sectionHeaderVariants}
          >
            <h2 id="founders-title" className="heading-2">
              <span className="text-hindi">हमारे संस्थापक</span>
              <span className="text-latin">Our Founders</span>
            </h2>
          </motion.div>
          <motion.article
            className="founder-card"
            variants={scrollRevealLeft}
          >
            <div className="founder-image-wrapper">
              <motion.img
                src="/images/ramesh-kundu.jpg"
                alt="रमेश कुंडू - संस्थापक"
                className="founder-image"
                onError={(e) => { e.target.src = '/images/placeholder-person.jpg'; }}
                variants={imageReveal}
              />
            </div>
            <motion.div 
              className="founder-info"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h3 
                className="founder-name"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-hindi">श्री रमेश कुंडू</span>
                <span className="text-latin">Mr. Ramesh Kundu</span>
              </motion.h3>
              <motion.span 
                className="founder-role"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="text-hindi">संस्थापक और निदेशक</span>
                <span className="text-latin">Founder & Director</span>
              </motion.span>
              <motion.p 
                className="founder-bio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-hindi">
                  15+ साल का कृषि और जैविक खेती का अनुभव। पारंपरिक खेती के तरीकों के संरक्षक।
                  किसानों के कल्याण और शुद्ध भोजन के लिए जीवन समर्पित।
                </span>
                <span className="text-latin">
                  15+ years of experience in agriculture and organic farming.
                  Guardian and promoter of traditional farming methods.
                  Life dedicated to farmer welfare and pure food.
                </span>
              </motion.p>
            </motion.div>
          </motion.article>
          <motion.article
            className="founder-card"
            variants={scrollRevealRight}
          >
            <div className="founder-image-wrapper">
              <motion.img
                src="/images/punit-kundu.jpg"
                alt="पुनीत कुंडू - सह-संस्थापक"
                className="founder-image"
                onError={(e) => { e.target.src = '/images/placeholder-person.jpg'; }}
                variants={imageReveal}
              />
            </div>
            <motion.div 
              className="founder-info"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h3 
                className="founder-name"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-hindi">पुनीत कुंडू</span>
                <span className="text-latin">Punit Kundu</span>
              </motion.h3>
              <motion.span 
                className="founder-role"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="text-hindi">सह-संस्थापक और प्रबंध निदेशक</span>
                <span className="text-latin">Co-founder & Managing Director</span>
              </motion.span>
              <motion.p 
                className="founder-bio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-hindi">
                  युवा दृष्टिकोण के साथ पारंपरिक मूल्यों को जोड़ते हुए। डिजिटल पहुंच और गुणवत्ता आश्वासन के लिए जिम्मेदार।
                  किसानों और ग्राहकों के बीच एक मजबूत सेतु।
                </span>
                <span className="text-latin">
                  Combining traditional values with young perspective.
                  Responsible for digital reach, quality assurance,
                  supply chain management and customer experience.
                  A strong bridge between farmers and customers.
                </span>
              </motion.p>
            </motion.div>
          </motion.article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section section-alt" aria-labelledby="cta-title">
        <div className="container">
          <motion.div
            className="cta-card"
            variants={scrollReveal}
          >
            <div className="cta-content">
              <motion.h2 
                id="cta-title" 
                className="cta-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-hindi">शुद्ध भोजन की यात्रा शुरू करें</span>
                <span className="text-latin">Start Your Pure Food Journey</span>
              </motion.h2>
              <motion.p 
                className="cta-description text-hindi"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="text-hindi">
                  कुंडू नेचुरल्स परिवार का हिस्सा बनें और अपने परिवार को दें प्रकृति का शुद्ध आशीर्वाद।
                  अभी संपर्क करें या हमारे उत्पादों को देखें।
                </span>
                <span className="text-latin">
                  Become part of the Kundu Naturals family and give your family the pure blessing of nature.
                  Contact us now or view our products.
                </span>
              </motion.p>
            </div>
            <motion.div 
              className="cta-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MotionLink 
                to="/contact" 
                className="btn btn-primary btn-lg"
                variants={buttonHoverGold}
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <span className="text-hindi">हमसे संपर्क करें</span>
                <span className="text-latin">Contact Us</span>
                <ArrowRight width="20" height="20" aria-hidden="true" />
              </MotionLink>
              <MotionLink 
                to="/products" 
                className="btn btn-secondary btn-lg"
                variants={buttonHover}
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <span className="text-hindi">उत्पाद देखें</span>
                <span className="text-latin">View Products</span>
              </MotionLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </>
  );
}

export default Home;
