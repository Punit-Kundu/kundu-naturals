import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Heart, Award, Truck, Users, Wheat, Shield, Star } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem, scrollReveal, scrollRevealLeft, scrollRevealRight, sectionHeaderVariants, gridStagger, cardHover, imageReveal, dividerVariants } from '../utils/animations';
import './About.css';

const missionVision = [
  {
    icon: Heart,
    title: 'Our Mission',
    titleHindi: 'हमारा मिशन',
    description: 'Deliver pure, natural, and nutritious food to every Indian family while preserving traditional farming methods and ensuring fair prices for farmers.',
    descriptionHindi: 'हर भारतीय परिवार तक शुद्ध, प्राकृतिक और पौष्टिक भोजन पहुंचाना, पारंपरिक खेती के तरीकों को संरक्षित करते हुए किसानों को उचित मूल्य दिलाना।',
  },
  {
    icon: Leaf,
    title: 'Our Vision',
    titleHindi: 'हमारा विजन',
    description: 'Become India\'s most trusted natural food brand where quality, honesty, and traditional values guide every decision.',
    descriptionHindi: 'भारत का सबसे विश्वसनीय प्राकृतिक खाद्य ब्रांड बनना, जहां गुणवत्ता, ईमानदारी और पारंपरिक मूल्य हर निर्णय का आधार हों।',
  },
];

const coreValues = [
  { icon: Wheat, title: 'Purity', titleHindi: 'शुद्धता', desc: 'Chemical-free, natural products', descHindi: 'रसायन-मुक्त, प्राकृतिक उत्पाद' },
  { icon: Heart, title: 'Honesty', titleHindi: 'ईमानदारी', desc: 'Transparent processes, nothing hidden', descHindi: 'पारदर्शी प्रक्रियाएं, कोई छिपी बात नहीं' },
  { icon: Shield, title: 'Quality', titleHindi: 'गुणवत्ता', desc: 'Rigorous quality checks at every stage', descHindi: 'हर चरण में कठोर गुणवत्ता जांच' },
  { icon: Users, title: 'Farmers First', titleHindi: 'किसान पहले', desc: 'Fair prices and respect for farmers', descHindi: 'किसानों को उचित मूल्य और सम्मान' },
  { icon: Award, title: 'Tradition', titleHindi: 'परंपरा', desc: 'Honoring and preserving ancestral wisdom', descHindi: 'पैतृक ज्ञान का सम्मान और संरक्षण' },
  { icon: Star, title: 'Trust', titleHindi: 'विश्वास', desc: 'Foundation of customer relationships', descHindi: 'ग्राहक संबंधों की नींव' },
];

const journey = [
  { year: '2009', title: 'Beginning', titleHindi: 'शुरुआत', descHindi: 'श्री रमेश कुंडू ने पैतृक खेतों में जैविक खेती शुरू की', descEn: 'Mr. Ramesh Kundu started organic farming on ancestral lands' },
  { year: '2012', title: 'First Expansion', titleHindi: 'पहला विस्तार', descHindi: 'आस-पास के 10 किसान परिवार जुड़े', descEn: '10 nearby farmer families joined' },
  { year: '2016', title: 'Brand Formation', titleHindi: 'ब्रांड स्थापना', descHindi: '"Kundu Naturals" नाम से ब्रांड पंजीकृत', descEn: '"Kundu Naturals" brand registered' },
  { year: '2019', title: 'Digital Journey', titleHindi: 'डिजिटल यात्रा', descHindi: 'ऑनलाइन ऑर्डर और होम डिलीवरी शुरू', descEn: 'Online ordering and home delivery started' },
  { year: '2022', title: 'Growth', titleHindi: 'वृद्धि', descHindi: '100+ किसान परिवार, 50+ उत्पाद, देशव्यापी पहुंच', descEn: '100+ farmer families, 50+ products, nationwide reach' },
  { year: '2024', title: 'Today', titleHindi: 'आज', descHindi: 'पारंपरिक मूल्यों के साथ आधुनिक गुणवत्ता मानक', descEn: 'Modern quality standards with traditional values' },
];

const founders = [
  {
    name: 'Mr. Ramesh Kundu',
    nameHindi: 'श्री रमेश कुंडू',
    role: 'Founder & Director',
    roleHindi: 'संस्थापक और निदेशक',
    image: '/images/ramesh-kendu.jpg',
    alt: 'Mr. Ramesh Kundu - Founder, Kundu Naturals',
    bio: '15+ years of experience in agriculture and organic farming. Guardian and promoter of traditional farming methods. Life dedicated to farmer welfare, soil health, and pure food. Believes "Food connected to the earth gives the body real strength."',
    bioHindi: '15+ वर्षों का कृषि और जैविक खेती का गहन अनुभव। पारंपरिक खेती के तरीकों के संरक्षक और प्रचारक। किसानों के कल्याण, मिट्टी की सेहत और शुद्ध भोजन के लिए जीवन समर्पित। उनका मानना है कि "जमीन से जुड़ा भोजन ही शरीर को असली ताकत देता है।"',
    bioEn: '15+ years of deep experience in agriculture and organic farming. Guardian and promoter of traditional farming methods. Life dedicated to farmer welfare, soil health, and pure food. Believes "Food connected to the earth gives the body real strength."',
    highlights: ['Expert in traditional seed preservation', 'Guide for organic certification processes', 'Conductor of farmer training programs'],
    highlightsHindi: ['पारंपरिक बीज संरक्षण के विशेषज्ञ', 'जैविक प्रमाणीकरण प्रक्रिया के मार्गदर्शक', 'किसान प्रशिक्षण कार्यक्रमों के संचालक'],
    highlightsEn: ['Expert in traditional seed preservation', 'Guide for organic certification processes', 'Conductor of farmer training programs'],
  },
  {
    name: 'Punit Kundu',
    nameHindi: 'पुनीत कुंडू',
    role: 'Co-founder & Managing Director',
    roleHindi: 'सह-संस्थापक और प्रबंध निदेशक',
    image: '/images/punit-kendu.jpg',
    alt: 'Punit Kundu - Co-founder, Kundu Naturals',
    bio: 'Combining traditional values with young perspective and technical understanding. Responsible for digital reach, quality assurance, supply chain management, and customer experience. Striving to build a strong bridge between farmers and urban customers.',
    bioHindi: 'पारंपरिक मूल्यों के साथ युवा दृष्टिकोण और तकनीकी समझ। डिजिटल पहुंच, गुणवत्ता नियंत्रण प्रणाली, और आधुनिक वितरण नेटवर्क लाने वाला। किसानों और शहरी ग्राहकों के बीच एक मजबूत सेतु बनाने का प्रयास।',
    bioEn: 'Combining traditional values with young perspective and technical understanding. Responsible for digital reach, quality assurance, supply chain management, and customer experience. Striving to build a strong bridge between farmers and urban customers.',
    highlights: ['E-commerce and digital marketing leadership', 'Quality control system development', 'Customer relationship and feedback management'],
    highlightsHindi: ['ई-कॉमर्स और डिजिटल मार्केटिंग नेतृत्व', 'गुणवत्ता नियंत्रण प्रणाली विकास', 'ग्राहक संबंध और प्रतिक्रिया प्रबंधन'],
    highlightsEn: ['E-commerce and digital marketing leadership', 'Quality control system development', 'Customer relationship and feedback management'],
  },
];

function About() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header" aria-labelledby="page-title">
        <div className="page-header-bg" aria-hidden="true">
          <img
            src="/images/about-header.jpg"
            alt=""
            className="page-header-image"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="page-header-overlay" />
        </div>
        <div className="container page-header-content">
          <motion.h1
            id="page-title"
            className="page-title text-hindi"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-hindi">हमारे बारे में</span>
            <span className="text-latin">About Us</span>
          </motion.h1>
          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-hindi">Pure Food • Healthy Life</span>
            <span className="text-latin">Pure Food • Healthy Life</span>
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story section" aria-labelledby="story-title">
        <div className="container">
          <motion.div
            className="section-header"
            variants={sectionHeaderVariants}
          >
            <SectionHeader
              title="Our Story"
              titleHindi="हमारी कहानी"
              subtitle="A journey from a small farm to thousands of families"
              subtitleHindi="एक छोटे खेत से शुरू हुई यात्रा, आज हजारों परिवारों तक"
            />
          </motion.div>
          <div className="story-content">
            <motion.div
              className="story-text"
              variants={scrollRevealLeft}
            >
              <motion.p 
                className="lead text-hindi"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-hindi">Kundu Naturals की शुरुआत <strong>2009</strong> में हरियाणा के एक छोटे से गांव में हुई,
                जब श्री रमेश कुंडू ने अपने पैतृक खेतों में रासायनिक खाद और कीटनाशकों का उपयोग बंद करके
                पारंपरिक जैविक खेती अपनाने का फैसला किया।</span>
                <span className="text-latin">
                Kundu Naturals began in <strong>2009</strong> in a small village in Haryana,
                when Mr. Ramesh Kundu decided to stop using chemical fertilizers and pesticides
                and adopt traditional organic farming methods.
                </span>
              </motion.p>
              <motion.p 
                className="text-hindi"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
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
                className="text-hindi"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
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
              <motion.span 
                className="read-more"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-hindi">और पढ़ें...</span>
                <span className="text-latin">Read more...</span>
              </motion.span>
            </motion.div>
            <motion.div
              className="story-image"
              variants={scrollRevealRight}
            >
              <motion.img
                src="/images/about-story.jpg"
                alt="Kundu Naturals के खेत और टीम"
                className="story-main-image"
                onError={(e) => { e.target.src = '/images/placeholder-farm.jpg'; }}
                variants={imageReveal}
              />
              <motion.div 
                className="story-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3, 
                  type: 'spring', 
                  stiffness: 100,
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }}
              >
                <span className="badge-icon text-hindi">
                  <Leaf width="24" height="24" />
                </span>
                <span className="badge-text text-hindi">
                  <span>100%</span> प्राकृतिक प्रतिबद्धता
                </span>
                <span className="badge-en" style={{ display: 'none' }}>
                  <span>100%</span> Natural Commitment
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Vision Section */}
      <section className="mission-vision section section-alt" aria-labelledby="mv-title">
        <div className="container">
          <motion.div
            className="section-header"
            variants={sectionHeaderVariants}
          >
            <SectionHeader
              title="Mission & Vision"
              titleHindi="मिशन और विजन"
              subtitle="Our purpose and direction"
              subtitleHindi="हमारा उद्देश्य और दिशा"
            />
          </motion.div>
          <motion.div
            className="mv-grid"
            aria-labelledby="mv-title"
            variants={gridStagger(0.15)}
          >
            {missionVision.map((item, index) => (
              <motion.article
                key={item.title}
                className="mv-card"
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(48, 32, 24, 0.15)', transition: { duration: 0.3 } }}
              >
                <motion.div 
                  className="mv-icon"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15, type: 'spring', stiffness: 100 }}
                >
                  <item.icon width="32" height="32" aria-hidden="true" />
                </motion.div>
                <motion.h3 
                  className="mv-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
                >
                  <span className="text-hindi">{item.titleHindi}</span>
                  <span className="text-latin">{item.title}</span>
                </motion.h3>
                <motion.p 
                  className="mv-description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                >
                  <span className="text-hindi">{item.descriptionHindi}</span>
                  <span className="text-latin">{item.descriptionEn}</span>
                </motion.p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="core-values section" aria-labelledby="values-title">
        <div className="container">
          <motion.div
            className="section-header"
            variants={sectionHeaderVariants}
          >
            <SectionHeader
              title="Our Core Values"
              titleHindi="हमारे मूल मूल्य"
              subtitle="What guides everything we do"
              subtitleHindi="जो हमारे हर कार्य का मार्गदर्शन करता है"
            />
          </motion.div>
          <motion.div
            className="values-grid"
            aria-labelledby="values-title"
            variants={gridStagger(0.08)}
          >
            {coreValues.map((value, index) => (
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
                  transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 100 }}
                >
                  <value.icon width="28" height="28" aria-hidden="true" />
                </motion.div>
                <motion.h4 
                  className="value-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 + 0.1 }}
                >
                  <span className="text-hindi">{value.titleHindi}</span>
                  <span className="text-latin">{value.title}</span>
                </motion.h4>
                <motion.p 
                  className="value-desc"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 + 0.2 }}
                >
                  <span className="text-hindi">{value.descHindi}</span>
                  <span className="text-latin">{value.desc}</span>
                </motion.p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="journey section section-alt" aria-labelledby="journey-title">
        <div className="container">
          <motion.div
            className="section-header"
            variants={sectionHeaderVariants}
          >
            <SectionHeader
              title="Our Journey"
              titleHindi="हमारी यात्रा"
              subtitle="छोटे कदमों से बड़ी मंजिल तक"
              subtitleHindi="छोटे कदमों से बड़ी मंजिल तक"
            />
          </motion.div>
          <div className="timeline">
            {journey.map((item, index) => (
              <motion.article
                key={item.year}
                className="timeline-item"
                variants={scrollRevealLeft}
              >
                <div className="timeline-marker">
                  <motion.span 
                    className="timeline-year"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1, type: 'spring', stiffness: 100 }}
                  >
                    <span className="text-hindi">{item.year}</span>
                    <span className="text-latin">{item.year}</span>
                  </motion.span>
                </div>
                <motion.div 
                  className="timeline-content"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.h4 
                    className="timeline-title"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-hindi">{item.titleHindi}</span>
                    <span className="text-latin">{item.titleEn}</span>
                  </motion.h4>
                  <motion.p 
                    className="timeline-desc"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <span className="text-hindi">{item.descHindi}</span>
                    <span className="text-latin">{item.descEn}</span>
                  </motion.p>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="founders-section section" aria-labelledby="founders-title">
        <div className="container">
          <motion.div
            className="section-header"
            variants={sectionHeaderVariants}
          >
            <SectionHeader
              title="Our Founders"
              titleHindi="हमारे संस्थापक"
              subtitle="Traditional wisdom and modern perspective"
              subtitleHindi="पारंपरिक ज्ञान और आधुनिक दृष्टिकोण का संगम"
            />
          </motion.div>
          <motion.div
            className="founders-grid"
            variants={gridStagger(0.2)}
          >
            {founders.map((founder, index) => (
              <motion.article
                key={founder.name}
                className="founder-card"
                variants={staggerItem}
              >
                <div className="founder-image-wrapper">
                  <motion.img
                    src={founder.image}
                    alt={founder.alt}
                    className="founder-image"
                    onError={(e) => { e.target.src = '/images/placeholder-person.jpg'; }}
                    variants={imageReveal}
                  />
                </div>
                <motion.div 
                  className="founder-details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.h3 
                    className="founder-name"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-hindi">{founder.nameHindi}</span>
                    <span className="text-latin">{founder.name}</span>
                  </motion.h3>
                  <motion.span 
                    className="founder-role"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <span className="text-hindi">{founder.roleHindi}</span>
                    <span className="text-latin">{founder.role}</span>
                  </motion.span>
                  <motion.p 
                    className="founder-bio"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <span className="text-hindi">{founder.bioHindi}</span>
                    <span className="text-latin">{founder.bioEn}</span>
                  </motion.p>
                  <motion.ul 
                    className="founder-highlights"
                    aria-label="Key highlights"
                    variants={listStagger(0.06)}
                  >
                    {founder.highlightsHindi.map((highlight, i) => (
                      <motion.li 
                        key={i} 
                        className="highlight-item text-hindi"
                        variants={staggerItem}
                      >
                        <span className="highlight-bullet" aria-hidden="true">•</span>
                        {highlight}
                      </motion.li>
                    ))}
                    {founder.highlightsEn.map((highlight, i) => (
                      <motion.li 
                        key={i + founder.highlightsHindi.length} 
                        className="highlight-item text-latin"
                        variants={staggerItem}
                      >
                        <span className="highlight-bullet" aria-hidden="true">•</span>
                        {highlight}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Traditional Connection */}
      <section className="traditional-section section section-alt" aria-labelledby="traditional-title">
        <div className="container">
          <motion.div
            className="section-header"
            variants={sectionHeaderVariants}
          >
            <SectionHeader
              title="Connection to Traditional Indian Food Culture"
              titleHindi="पारंपरिक भारतीय खाद्य संस्कृति से जुड़ाव"
              subtitle="Our roots, our identity"
              subtitleHindi="हमारी जड़ें, हमारी पहचान"
            />
          </motion.div>
          <motion.div
            className="traditional-grid"
            variants={gridStagger(0.1)}
          >
            <motion.article
              className="traditional-card"
              variants={staggerItem}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(48, 32, 24, 0.15)', transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="traditional-icon"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
              >
                <Wheat width="32" height="32" />
              </motion.div>
              <motion.h4 
                className="text-hindi"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >Traditional Seeds</motion.h4>
              <motion.p 
                className="text-hindi"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="text-hindi">Desi seeds preservation and use. Indigenous seed varieties that are more nutritious than hybrid seeds.</span>
                <span className="text-latin">Indigenous seed varieties that are more nutritious than hybrid seeds.</span>
              </motion.p>
            </motion.article>
            <motion.article
              className="traditional-card"
              variants={staggerItem}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(48, 32, 24, 0.15)', transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="traditional-icon"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.05, type: 'spring', stiffness: 100 }}
              >
                <Users width="32" height="32" />
              </motion.div>
              <motion.h4 
                className="text-hindi"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >Farmer Family Partnerships</motion.h4>
              <motion.p 
                className="text-hindi"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <span className="text-hindi">Long-term relationships with farmer families. Fair prices, timely payment, and respect.</span>
                <span className="text-latin">Long-term relationships with farmer families. Fair prices, timely payment, and respect.</span>
              </motion.p>
            </motion.article>
            <motion.article
              className="traditional-card"
              variants={staggerItem}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(48, 32, 24, 0.15)', transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="traditional-icon"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 100 }}
              >
                <Shield width="32" height="32" />
              </motion.div>
              <motion.h4 
                className="text-hindi"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >Natural Processing</motion.h4>
              <motion.p 
                className="text-hindi"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-hindi">Stone grinding, kachi ghani, sun drying — No chemicals, no machine processing.</span>
                <span className="text-latin">Stone grinding, kachi ghani, sun drying — No chemicals, no machine processing.</span>
              </motion.p>
            </motion.article>
            <motion.article
              className="traditional-card"
              variants={staggerItem}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(48, 32, 24, 0.15)', transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="traditional-icon"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.15, type: 'spring', stiffness: 100 }}
              >
                <Heart width="32" height="32" />
              </motion.div>
              <motion.h4 
                className="text-hindi"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >Soil Health</motion.h4>
              <motion.p 
                className="text-hindi"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <span className="text-hindi">Gobar compost, green compost, crop rotation — Living soil is the basis of nutritious food.</span>
                <span className="text-latin">Gobar compost, green compost, crop rotation — Living soil is the basis of nutritious food.</span>
              </motion.p>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta section" aria-labelledby="about-cta-title">
        <div className="container">
          <motion.div
            className="about-cta-card"
            variants={scrollReveal}
          >
            <motion.h2 
              id="about-cta-title" 
              className="text-hindi"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-hindi">हमारी यात्रा का हिस्सा बनें</span>
              <span className="text-latin">Become Part of Our Journey</span>
            </motion.h2>
            <motion.p 
              className="text-hindi"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-hindi"> चाहे आप किसान हों, ग्राहक हों, या शुभचिंतक — कुंडू नेचुरल्स परिवार में आपका स्वागत है।</span>
              <span className="text-latin">Whether you are a farmer, a customer, or a well-wisher — you are welcome to the Kundu Naturals family.</span>
            </motion.p>
            <motion.div 
              className="cta-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.a 
                href="/contact" 
                className="btn btn-primary btn-lg"
                variants={buttonHoverGold}
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <span className="text-hindi">हमसे जुड़ें</span>
                <span className="text-latin">Get in Touch</span>
              </motion.a>
              <motion.a 
                href="/products" 
                className="btn btn-outline btn-lg"
                variants={buttonHover}
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <span className="text-hindi">उत्पाद देखें</span>
                <span className="text-latin">View Products</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default About;