import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Leaf,
  Heart,
  Award,
  Users,
  Wheat,
  Shield,
  Star,
  Milk,
  Soup,
  Flame,
  GlassWater,
  Package,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import {
  staggerItem,
  scrollRevealLeft,
  scrollRevealRight,
  sectionHeaderVariants,
  gridStagger,
  imageReveal,
  listStagger,
  buttonHover,
  buttonHoverGold,
} from '../utils/animations';
import './About.css';

const MotionLink = motion.create(Link);

const missionVision = [
  {
    icon: Heart,
    title: 'Our Mission',
    titleHindi: 'हमारा मिशन',
    description:
      'Deliver pure, natural and nutritious food to every Indian family while preserving traditional farming methods and ensuring fair prices for our farmers.',
    descriptionHindi:
      'हर भारतीय परिवार तक शुद्ध, प्राकृतिक और पौष्टिक भोजन पहुंचाना, पारंपरिक खेती के तरीकों को संरक्षित करते हुए किसानों को उचित मूल्य दिलाना।',
  },
  {
    icon: Leaf,
    title: 'Our Vision',
    titleHindi: 'हमारा विजन',
    description:
      'Become India\'s most trusted natural food brand, where quality, honesty and traditional values guide every decision we make.',
    descriptionHindi:
      'भारत का सबसे विश्वसनीय प्राकृतिक खाद्य ब्रांड बनना, जहां गुणवत्ता, ईमानदारी और पारंपरिक मूल्य हमारे हर निर्णय का आधार हों।',
  },
];

const coreValues = [
  {
    icon: Wheat,
    title: 'Purity',
    titleHindi: 'शुद्धता',
    desc: 'Chemical-free, natural products with no adulteration.',
    descHindi: 'रसायन-मुक्त, प्राकृतिक उत्पाद, बिना किसी मिलावट के।',
  },
  {
    icon: Heart,
    title: 'Honesty',
    titleHindi: 'ईमानदारी',
    desc: 'Transparent processes and clear information on every pack.',
    descHindi: 'पारदर्शी प्रक्रियाएं और हर पैक पर स्पष्ट जानकारी।',
  },
  {
    icon: Shield,
    title: 'Quality',
    titleHindi: 'गुणवत्ता',
    desc: 'Rigorous quality checks at every stage, from farm to packing.',
    descHindi: 'खेत से पैकिंग तक, हर चरण में कठोर गुणवत्ता जांच।',
  },
  {
    icon: Users,
    title: 'Farmers First',
    titleHindi: 'किसान पहले',
    desc: 'Fair prices, timely payments and respect for every farmer family.',
    descHindi: 'हर किसान परिवार को उचित मूल्य, समय पर भुगतान और सम्मान।',
  },
  {
    icon: Award,
    title: 'Tradition',
    titleHindi: 'परंपरा',
    desc: 'Honouring ancestral seeds, recipes and farming wisdom.',
    descHindi: 'पैतृक बीजों, पारंपरिक व्यंजनों और खेती के ज्ञान का सम्मान।',
  },
  {
    icon: Star,
    title: 'Trust',
    titleHindi: 'विश्वास',
    desc: 'The foundation of every relationship with our customers.',
    descHindi: 'हमारे ग्राहकों के साथ हर संबंध की नींव।',
  },
];

const journey = [
  {
    year: '2009',
    title: 'A New Beginning',
    titleHindi: 'नई शुरुआत',
    desc: 'Mr. Ramesh Kundu started natural farming on his ancestral land in Haryana.',
    descHindi: 'श्री रमेश कुंडू ने हरियाणा में अपनी पैतृक भूमि पर प्राकृतिक खेती शुरू की।',
  },
  {
    year: '2012',
    title: 'Farmer Families Join',
    titleHindi: 'किसान परिवार जुड़े',
    desc: 'Ten nearby farmer families adopted the same chemical-free methods.',
    descHindi: 'आसपास के दस किसान परिवारों ने भी रसायन-मुक्त खेती अपनाई।',
  },
  {
    year: '2016',
    title: 'Brand Formation',
    titleHindi: 'ब्रांड की स्थापना',
    desc: 'The brand was formally registered as "Kundu Naturals".',
    descHindi: '"Kundu Naturals" नाम से ब्रांड को औपचारिक रूप से पंजीकृत किया गया।',
  },
  {
    year: '2019',
    title: 'Digital Journey',
    titleHindi: 'डिजिटल यात्रा',
    desc: 'Online ordering and home delivery made pure food easier to reach.',
    descHindi: 'ऑनलाइन ऑर्डर और होम डिलीवरी से शुद्ध भोजन आसानी से उपलब्ध हुआ।',
  },
  {
    year: '2022',
    title: 'Growing Together',
    titleHindi: 'साथ में विकास',
    desc: '100+ farmer families, 50+ products and nationwide delivery.',
    descHindi: '100+ किसान परिवार, 50+ उत्पाद और देशव्यापी डिलीवरी।',
  },
  {
    year: 'Today',
    title: 'A Trusted Family Brand',
    titleHindi: 'एक विश्वसनीय पारिवारिक ब्रांड',
    desc: 'Traditional values with modern quality standards and honest service.',
    descHindi: 'आधुनिक गुणवत्ता मानकों और ईमानदार सेवा के साथ पारंपरिक मूल्य।',
  },
];

const founders = [
  {
    name: 'Ramesh Kundu',
    nameHindi: 'श्री रमेश कुंडू',
    role: 'Brand Owner',
    roleHindi: 'ब्रांड स्वामी',
    image: '/images/Kundu-Naturals-Team-Photos/ramesh-kundu-brand-owner.png',
    alt: 'Ramesh Kundu, Brand Owner at Kundu Naturals',
    bio: 'With more than 15 years of experience in agriculture, he is the guardian of our traditional farming methods. His life is dedicated to farmer welfare, soil health and pure food.',
    bioHindi: 'कृषि में 15 से अधिक वर्षों के अनुभव के साथ, वे हमारी पारंपरिक खेती पद्धतियों के संरक्षक हैं। उनका जीवन किसानों के कल्याण, मिट्टी की सेहत और शुद्ध भोजन के लिए समर्पित है।',
    highlights: [
      'Expert in traditional seed preservation',
      'Guide for organic certification processes',
      'Leads farmer training programmes',
    ],
    highlightsHindi: [
      'पारंपरिक बीज संरक्षण के विशेषज्ञ',
      'जैविक प्रमाणीकरण प्रक्रिया के मार्गदर्शक',
      'किसान प्रशिक्षण कार्यक्रमों का संचालन',
    ],
  },
  {
    name: 'Punit Kundu',
    nameHindi: 'पुनीत कुंडू',
    role: 'Business Manager',
    roleHindi: 'व्यवसाय प्रबंधक',
    image: '/images/Kundu-Naturals-Team-Photos/punit-kundu-business-manager.png',
    alt: 'Punit Kundu, Business Manager at Kundu Naturals',
    bio: 'He connects traditional values with a young perspective and modern technology. He leads digital reach, quality assurance, supply chain management and customer experience.',
    bioHindi: 'वे पारंपरिक मूल्यों को युवा दृष्टिकोण और आधुनिक तकनीक से जोड़ते हैं। वे डिजिटल पहुंच, गुणवत्ता आश्वासन, सप्लाई चेन और ग्राहक अनुभव का नेतृत्व करते हैं।',
    highlights: [
      'E-commerce and digital marketing leadership',
      'Quality control system development',
      'Customer relationship and feedback management',
    ],
    highlightsHindi: [
      'ई-कॉमर्स और डिजिटल मार्केटिंग का नेतृत्व',
      'गुणवत्ता नियंत्रण प्रणाली का विकास',
      'ग्राहक संबंध और प्रतिक्रिया प्रबंधन',
    ],
  },
];

const productCategories = [
  {
    icon: Milk,
    image: '/images/Kundu-Naturals-All-Products/28-kundu-naturals-a2-desi-cow-ghee.webp',
    title: 'Ghee & Oils',
    titleHindi: 'घी और तेल',
    desc: 'A2 desi cow ghee, buffalo ghee and cold-pressed mustard, til and black mustard oils.',
    descHindi: 'A2 देसी गाय का घी, भैंस का घी और कोल्ड-प्रेस्ड सरसों, तिल व काली सरसों का तेल।',
  },
  {
    icon: Package,
    image: '/images/Kundu-Naturals-All-Products/21-kundu-naturals-sarbati-atta.webp',
    title: 'Grains & Flours',
    titleHindi: 'अनाज और आटा',
    desc: 'Sarbati atta, basmati rice, kala dhan chawal, gehu daliya and bajra atta.',
    descHindi: 'सरबती आटा, बासमती चावल, काला धान चावल, गेहूं दलिया और बाजरा आटा।',
  },
  {
    icon: Soup,
    image: '/images/Kundu-Naturals-All-Products/17-kundu-naturals-tur-dal.webp',
    title: 'Dals & Pulses',
    titleHindi: 'दालें और अनाज',
    desc: 'Moong, tur, chana, urad and kala chana — cleaned and packed with care.',
    descHindi: 'मूंग, तूर, चना, उड़द और काला चना — साफ करके सावधानी से पैक किए गए।',
  },
  {
    icon: Flame,
    image: '/images/Kundu-Naturals-All-Products/19-kundu-naturals-haldi-powder.webp',
    title: 'Spices & Masalas',
    titleHindi: 'मसाले',
    desc: 'Haldi, lal mirch, dhaniya, kuti haldi and black haldi powders.',
    descHindi: 'हल्दी, लाल मिर्च, धनिया, कुटी हल्दी और काली हल्दी पाउडर।',
  },
  {
    icon: GlassWater,
    image: '/images/Kundu-Naturals-All-Products/26-kundu-naturals-mix-achar.webp',
    title: 'Pickles & Preserves',
    titleHindi: 'अचार और मुरब्बा',
    desc: 'Amla murabba, gajar achar, methi achar, mix achar and meetha nimbu achar.',
    descHindi: 'आंवला मुरब्बा, गाजर अचार, मेथी अचार, मिक्स अचार और मीठा नींबू अचार।',
  },
  {
    icon: Leaf,
    image: '/images/Kundu-Naturals-All-Products/37-kundu-naturals-multifloral-honey.webp',
    title: 'Honey & Sweeteners',
    titleHindi: 'शहद और मिठास',
    desc: 'Multifloral honey, shakkar, desi khand and dhaga mishri.',
    descHindi: 'मल्टीफ्लोरल शहद, शक्कर, देसी खांड और धागा मिश्री।',
  },
];

const traditionalCards = [
  {
    icon: Wheat,
    title: 'Traditional Seeds',
    titleHindi: 'पारंपरिक बीज',
    desc: 'We preserve and use desi seed varieties that are more nutritious than hybrid seeds.',
    descHindi: 'हम देसी बीजों को संरक्षित और उपयोग करते हैं, जो हाइब्रिड बीजों से अधिक पौष्टिक होते हैं।',
  },
  {
    icon: Users,
    title: 'Farmer Family Partnerships',
    titleHindi: 'किसान परिवार भागीदारी',
    desc: 'Long-term relationships built on fair prices, timely payment and respect.',
    descHindi: 'उचित मूल्य, समय पर भुगतान और सम्मान पर आधारित दीर्घकालिक संबंध।',
  },
  {
    icon: Shield,
    title: 'Natural Processing',
    titleHindi: 'प्राकृतिक प्रसंस्करण',
    desc: 'Stone grinding, kachi ghani and sun drying — no chemicals and no over-processing.',
    descHindi: 'चक्की पिसाई, कच्ची घानी और धूप में सुखाना — न रसायन और न अधिक प्रसंस्करण।',
  },
  {
    icon: Heart,
    title: 'Soil Health',
    titleHindi: 'मिट्टी की सेहत',
    desc: 'Gobar compost, green compost and crop rotation keep our soil alive and fertile.',
    descHindi: 'गोबर खाद, हरी खाद और फसल चक्र हमारी मिट्टी को जीवित और उपजाऊ रखते हैं।',
  },
];

function About() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header" aria-labelledby="page-title">
        <div className="page-header-bg" aria-hidden="true">
          <img
            src="/homepage hero section image.png"
            alt=""
            className="page-header-image"
          />
          <div className="page-header-overlay" />
        </div>
        <div className="container page-header-content">
          <motion.h1
            id="page-title"
            className="page-title"
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
            <span className="text-hindi">शुद्ध भोजन • स्वस्थ जीवन</span>
            <span className="text-latin">Pure Food • Healthy Life</span>
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story section" aria-labelledby="story-title">
        <div className="container">
          <motion.div className="section-header" variants={sectionHeaderVariants}>
            <SectionHeader
              title="Our Story"
              titleHindi="हमारी कहानी"
              subtitle="A journey from a small farm to thousands of families"
              subtitleHindi="एक छोटे खेत से शुरू हुई यात्रा, आज हजारों परिवारों तक"
            />
          </motion.div>
          <div className="story-content">
            <motion.div className="story-text" variants={scrollRevealLeft}>
              <motion.p
                className="lead"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-hindi">
                  Kundu Naturals की शुरुआत <strong>2009</strong> में हरियाणा के कैलराम गांव में हुई,
                  जब श्री रमेश कुंडू ने अपने पैतृक खेतों में रासायनिक खाद और कीटनाशकों का उपयोग
                  बंद करके पारंपरिक प्राकृतिक खेती अपनाने का फैसला किया।
                </span>
                <span className="text-latin">
                  Kundu Naturals began in <strong>2009</strong> in the village of Kailram, Haryana,
                  when Mr. Ramesh Kundu decided to stop using chemical fertilizers and pesticides
                  and adopt traditional natural farming on his ancestral land.
                </span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="text-hindi">
                  जो एक व्यक्तिगत प्रयोग के रूप में शुरू हुआ, वह धीरे-धीरे एक आंदोलन बन गया।
                  आसपास के किसानों ने मिट्टी की सेहत में सुधार और फसल की गुणवत्ता देखी,
                  और वे भी इस पद्धति से जुड़ने लगे। <strong>2016</strong> में "Kundu Naturals"
                  नाम से ब्रांड को औपचारिक रूप दिया गया।
                </span>
                <span className="text-latin">
                  What started as a personal experiment gradually became a movement.
                  Neighbouring farmers saw improvements in soil health and crop quality,
                  and joined the same methods. In <strong>2016</strong>, the brand was
                  formally registered as "Kundu Naturals".
                </span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-hindi">
                  आज हम <strong>100+ किसान परिवारों</strong> के साथ मिलकर
                  <strong>50+ प्राकृतिक उत्पाद</strong> तैयार करते हैं और पूरे भारत में
                  <strong>10,000+ परिवारों</strong> तक शुद्ध भोजन पहुंचाते हैं।
                </span>
                <span className="text-latin">
                  Today we work with <strong>100+ farmer families</strong>, prepare
                  <strong>50+ natural products</strong> and deliver pure food to
                  <strong>10,000+ families</strong> across India.
                </span>
              </motion.p>
            </motion.div>
            <motion.div className="story-image" variants={scrollRevealRight}>
              <motion.img
                src="/images/footer-farm-strip.png"
                alt="Kundu Naturals के खेत"
                className="story-main-image"
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
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                <span className="badge-icon">
                  <Leaf width="24" height="24" aria-hidden="true" />
                </span>
                <span className="badge-text text-hindi">
                  <span>100%</span> प्राकृतिक प्रतिबद्धता
                </span>
                <span className="badge-text text-latin">
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
          <motion.div className="section-header" variants={sectionHeaderVariants}>
            <SectionHeader
              title="Mission & Vision"
              titleHindi="मिशन और विजन"
              subtitle="Our purpose and direction"
              subtitleHindi="हमारा उद्देश्य और दिशा"
            />
          </motion.div>
          <motion.div className="mv-grid" aria-labelledby="mv-title" variants={gridStagger(0.15)}>
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
                <h3 className="mv-title">
                  <span className="text-hindi">{item.titleHindi}</span>
                  <span className="text-latin">{item.title}</span>
                </h3>
                <p className="mv-description">
                  <span className="text-hindi">{item.descriptionHindi}</span>
                  <span className="text-latin">{item.description}</span>
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="core-values section" aria-labelledby="values-title">
        <div className="container">
          <motion.div className="section-header" variants={sectionHeaderVariants}>
            <SectionHeader
              title="Our Core Values"
              titleHindi="हमारे मूल मूल्य"
              subtitle="What guides everything we do"
              subtitleHindi="जो हमारे हर कार्य का मार्गदर्शन करता है"
            />
          </motion.div>
          <motion.div className="values-grid" aria-labelledby="values-title" variants={gridStagger(0.08)}>
            {coreValues.map((value) => (
              <motion.article
                key={value.title}
                className="value-card"
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(48, 32, 24, 0.15)', transition: { duration: 0.3 } }}
              >
                <div className="value-icon">
                  <value.icon width="28" height="28" aria-hidden="true" />
                </div>
                <h4 className="value-title">
                  <span className="text-hindi">{value.titleHindi}</span>
                  <span className="text-latin">{value.title}</span>
                </h4>
                <p className="value-desc">
                  <span className="text-hindi">{value.descHindi}</span>
                  <span className="text-latin">{value.desc}</span>
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="offer-section section section-alt" aria-labelledby="offer-title">
        <div className="container">
          <motion.div className="section-header" variants={sectionHeaderVariants}>
            <SectionHeader
              title="What We Offer"
              titleHindi="हम क्या प्रदान करते हैं"
              subtitle="Everyday essentials, made the natural way"
              subtitleHindi="रोजमर्रा की जरूरतें, प्राकृतिक तरीके से तैयार"
            />
          </motion.div>
          <motion.div className="offer-grid" aria-labelledby="offer-title" variants={gridStagger(0.08)}>
            {productCategories.map((category) => (
              <motion.article
                key={category.title}
                className="offer-card"
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(48, 32, 24, 0.15)', transition: { duration: 0.3 } }}
              >
                <div className="offer-image-wrapper">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="offer-image"
                    loading="lazy"
                  />
                </div>
                <div className="offer-body">
                  <span className="offer-icon" aria-hidden="true">
                    <category.icon width="22" height="22" />
                  </span>
                  <h3 className="offer-title">
                    <span className="text-hindi">{category.titleHindi}</span>
                    <span className="text-latin">{category.title}</span>
                  </h3>
                  <p className="offer-desc">
                    <span className="text-hindi">{category.descHindi}</span>
                    <span className="text-latin">{category.desc}</span>
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
          <motion.div
            className="offer-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <MotionLink
              to="/products"
              className="btn btn-primary"
              variants={buttonHoverGold}
              whileHover="whileHover"
              whileTap="whileTap"
            >
              <span className="text-hindi">सभी उत्पाद देखें</span>
              <span className="text-latin">View All Products</span>
            </MotionLink>
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="journey section" aria-labelledby="journey-title">
        <div className="container">
          <motion.div className="section-header" variants={sectionHeaderVariants}>
            <SectionHeader
              title="Our Journey"
              titleHindi="हमारी यात्रा"
              subtitle="Small steps towards a bigger purpose"
              subtitleHindi="छोटे कदमों से बड़ी मंजिल तक"
            />
          </motion.div>
          <div className="timeline">
            {journey.map((item, index) => (
              <motion.article key={item.year} className="timeline-item" variants={scrollRevealLeft}>
                <div className="timeline-marker">
                  <motion.span
                    className="timeline-year"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1, type: 'spring', stiffness: 100 }}
                  >
                    {item.year}
                  </motion.span>
                </div>
                <div className="timeline-content">
                  <h4 className="timeline-title">
                    <span className="text-hindi">{item.titleHindi}</span>
                    <span className="text-latin">{item.title}</span>
                  </h4>
                  <p className="timeline-desc">
                    <span className="text-hindi">{item.descHindi}</span>
                    <span className="text-latin">{item.desc}</span>
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="founders-section section section-alt" aria-labelledby="founders-title">
        <div className="container">
          <motion.div className="section-header" variants={sectionHeaderVariants}>
            <SectionHeader
              title="Our Team"
              titleHindi="हमारी टीम"
              subtitle="The people behind Kundu Naturals"
              subtitleHindi="कुंडू नेचुरल्स के पीछे की टीम"
            />
          </motion.div>
          <motion.div className="founders-grid" variants={gridStagger(0.2)}>
            {founders.map((founder) => (
              <motion.article key={founder.name} className="founder-card" variants={staggerItem}>
                <div className="founder-image-wrapper">
                  <img
                    src={founder.image}
                    alt={founder.alt}
                    className="founder-image"
                    loading="lazy"
                  />
                </div>
                <div className="founder-details">
                  <h3 className="founder-name">
                    <span className="text-hindi">{founder.nameHindi}</span>
                    <span className="text-latin">{founder.name}</span>
                  </h3>
                  <span className="founder-role">
                    <span className="text-hindi">{founder.roleHindi}</span>
                    <span className="text-latin">{founder.role}</span>
                  </span>
                  <p className="founder-bio">
                    <span className="text-hindi">{founder.bioHindi}</span>
                    <span className="text-latin">{founder.bio}</span>
                  </p>
                  <motion.ul className="founder-highlights" variants={listStagger(0.06)}>
                    {founder.highlightsHindi.map((highlight) => (
                      <li key={`hi-${highlight}`} className="highlight-item">
                        <span className="highlight-bullet" aria-hidden="true">•</span>
                        <span className="text-hindi">{highlight}</span>
                      </li>
                    ))}
                    {founder.highlights.map((highlight) => (
                      <li key={`en-${highlight}`} className="highlight-item">
                        <span className="highlight-bullet" aria-hidden="true">•</span>
                        <span className="text-latin">{highlight}</span>
                      </li>
                    ))}
                  </motion.ul>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Traditional Connection */}
      <section className="traditional-section section" aria-labelledby="traditional-title">
        <div className="container">
          <motion.div className="section-header" variants={sectionHeaderVariants}>
            <SectionHeader
              title="Rooted in Traditional Indian Food Culture"
              titleHindi="पारंपरिक भारतीय खाद्य संस्कृति से जुड़ाव"
              subtitle="Our roots, our identity"
              subtitleHindi="हमारी जड़ें, हमारी पहचान"
            />
          </motion.div>
          <motion.div className="traditional-grid" variants={gridStagger(0.1)}>
            {traditionalCards.map((card) => (
              <motion.article
                key={card.title}
                className="traditional-card"
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(48, 32, 24, 0.15)', transition: { duration: 0.3 } }}
              >
                <div className="traditional-icon">
                  <card.icon width="32" height="32" aria-hidden="true" />
                </div>
                <h4 className="traditional-title">
                  <span className="text-hindi">{card.titleHindi}</span>
                  <span className="text-latin">{card.title}</span>
                </h4>
                <p className="traditional-desc">
                  <span className="text-hindi">{card.descHindi}</span>
                  <span className="text-latin">{card.desc}</span>
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta section" aria-labelledby="about-cta-title">
        <div className="container">
          <div className="about-cta-card">
            <h2 id="about-cta-title">
              <span className="text-hindi">हमारी यात्रा का हिस्सा बनें</span>
              <span className="text-latin">Become Part of Our Journey</span>
            </h2>
            <p>
              <span className="text-hindi">
                चाहे आप किसान हों, ग्राहक हों या शुभचिंतक — कुंडू नेचुरल्स परिवार में आपका स्वागत है।
              </span>
              <span className="text-latin">
                Whether you are a farmer, a customer or a well-wisher — you are welcome to the Kundu Naturals family.
              </span>
            </p>
            <div className="cta-buttons">
              <MotionLink
                to="/contact"
                className="btn btn-primary btn-lg"
                variants={buttonHoverGold}
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <span className="text-hindi">हमसे जुड़ें</span>
                <span className="text-latin">Get in Touch</span>
              </MotionLink>
              <MotionLink
                to="/products"
                className="btn btn-outline btn-lg"
                variants={buttonHover}
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <span className="text-hindi">उत्पाद देखें</span>
                <span className="text-latin">View Products</span>
              </MotionLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
