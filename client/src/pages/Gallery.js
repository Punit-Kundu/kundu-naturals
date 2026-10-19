import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image, Filter, Grid, Loader2 } from 'lucide-react';
import GalleryLightbox from '../components/GalleryLightbox';
import SectionHeader from '../components/SectionHeader';
import './Gallery.css';

const galleryCategories = [
  { id: 'all', name: 'All', nameEn: 'All' },
  { id: 'products', name: 'Products', nameEn: 'Products' },
  { id: 'farm', name: 'Farm', nameEn: 'Farm' },
  { id: 'packaging', name: 'Packaging', nameEn: 'Packaging' },
  { id: 'team', name: 'Team', nameEn: 'Team' },
  { id: 'processing', name: 'Processing', nameEn: 'Processing' },
];

// Sample gallery images - replace with actual images
const galleryImages = [
  // Products
  { src: '/images/gallery/products-1.jpg', alt: 'Organic wheat flour', captionHindi: 'जैविक गेहूं का आटा', captionEn: 'Organic Wheat Flour', category: 'products' },
  { src: '/images/gallery/products-2.jpg', alt: 'Organic basmati rice', captionHindi: 'जैविक बासमती चावल', captionEn: 'Organic Basmati Rice', category: 'products' },
  { src: '/images/gallery/products-3.jpg', alt: 'Organic turmeric powder', captionHindi: 'जैविक हल्दी पाउडर', captionEn: 'Organic Turmeric Powder', category: 'products' },
  { src: '/images/gallery/products-4.jpg', alt: 'Cold pressed mustard oil', captionHindi: 'कोल्ड प्रेस्ड सरसों तेल', captionEn: 'Cold Pressed Mustard Oil', category: 'products' },
  { src: '/images/gallery/products-5.jpg', alt: 'Raw forest honey', captionHindi: 'कच्चा वन शहद', captionEn: 'Raw Forest Honey', category: 'products' },
  { src: '/images/gallery/products-6.jpg', alt: 'Organic moong dal', captionHindi: 'जैविक मूंग दाल', captionEn: 'Organic Moong Dal', category: 'products' },

  // Farm
  { src: '/images/gallery/farm-1.jpg', alt: 'Organic farms', captionHindi: 'हमारे जैविक खेत', captionEn: 'Our Organic Farms', category: 'farm' },
  { src: '/images/gallery/farm-2.jpg', alt: 'Wheat crop', captionHindi: 'गेहूं की फसल', captionEn: 'Wheat Crop', category: 'farm' },
  { src: '/images/gallery/farm-3.jpg', alt: 'Mustard fields', captionHindi: 'सरसों के पीले खेत', captionEn: 'Mustard Fields', category: 'farm' },
  { src: '/images/gallery/farm-4.jpg', alt: 'Farmer working', captionHindi: 'किसान परिवार खेत में', captionEn: 'Farmer Families at Work', category: 'farm' },
  { src: '/images/gallery/farm-5.jpg', alt: 'Organic manure', captionHindi: 'जैविक खाद', captionEn: 'Organic Manure', category: 'farm' },
  { src: '/images/gallery/farm-6.jpg', alt: 'Traditional irrigation', captionHindi: 'पारंपरिक सिंचाई विधि', captionEn: 'Traditional Irrigation', category: 'farm' },

  // Packaging
  { src: '/images/gallery/packaging-1.jpg', alt: 'Product packaging', captionHindi: 'पर्यावरण-अनुकूल पैकेजिंग', captionEn: 'Eco-friendly Packaging', category: 'packaging' },
  { src: '/images/gallery/packaging-2.jpg', alt: 'Packaging process', captionHindi: 'हाथों से पैकिंग', captionEn: 'Hand Packing Process', category: 'packaging' },
  { src: '/images/gallery/packaging-3.jpg', alt: 'Product in jute bag', captionHindi: 'जूट बैग में उत्पाद', captionEn: 'Traditional Jute Bags', category: 'packaging' },
  { src: '/images/gallery/packaging-4.jpg', alt: 'Honey in glass jars', captionHindi: 'शहद के कांच के जार', captionEn: 'Honey in Glass Jars', category: 'packaging' },
  { src: '/images/gallery/packaging-5.jpg', alt: 'Oil bottles', captionHindi: 'तेल की बोतलें', captionEn: 'Oil Bottle Packaging', category: 'packaging' },
  { src: '/images/gallery/packaging-6.jpg', alt: 'Gift pack', captionHindi: 'त्योहारों के लिए उपहार पैक', captionEn: 'Festival Gift Packs', category: 'packaging' },

  // Team
  { src: '/images/gallery/team-1.jpg', alt: 'Ramesh Kundu', captionHindi: 'श्री रमेश कुंडू', captionEn: 'Mr. Ramesh Kundu', category: 'team' },
  { src: '/images/gallery/team-2.jpg', alt: 'Punit Kundu', captionHindi: 'पुनीत कुंडू', captionEn: 'Punit Kundu', category: 'team' },
  { src: '/images/gallery/team-3.jpg', alt: 'Team with farmers', captionHindi: 'किसान परिवारों के साथ', captionEn: 'With Farmer Families', category: 'team' },
  { src: '/images/gallery/team-4.jpg', alt: 'Quality check team', captionHindi: 'गुणवत्ता जांच टीम', captionEn: 'Quality Check Team', category: 'team' },
  { src: '/images/gallery/team-5.jpg', alt: 'Packaging team', captionHindi: 'पैकेजिंग और डिस्पैच टीम', captionEn: 'Packaging & Dispatch Team', category: 'team' },
  { src: '/images/gallery/team-6.jpg', alt: 'Office team', captionHindi: 'कार्यालय और ग्राहक सेवा टीम', captionEn: 'Office & Customer Service Team', category: 'team' },

  // Processing
  { src: '/images/gallery/processing-1.jpg', alt: 'Stone mill', captionHindi: 'पत्थर की चक्की', captionEn: 'Traditional Stone Mill', category: 'processing' },
  { src: '/images/gallery/processing-2.jpg', alt: 'Kachi ghani', captionHindi: 'सरसों तेल के लिए कच्ची घानी', captionEn: 'Kachi Ghani for Mustard Oil', category: 'processing' },
  { src: '/images/gallery/processing-3.jpg', alt: 'Sun drying', captionHindi: 'प्राकृतिक धूप में सुखाना', captionEn: 'Natural Sun Drying', category: 'processing' },
  { src: '/images/gallery/processing-4.jpg', alt: 'Hand sorting', captionHindi: 'हाथों से दानों की छंटाई', captionEn: 'Hand Sorting of Grains', category: 'processing' },
  { src: '/images/gallery/processing-5.jpg', alt: 'Spice grinding', captionHindi: 'पत्थर पर मसाला पीसना', captionEn: 'Stone Grinding Spices', category: 'processing' },
  { src: '/images/gallery/processing-6.jpg', alt: 'Honey extraction', captionHindi: 'मधुमक्खी पालन और शहद निकालना', captionEn: 'Beekeeping & Honey Extraction', category: 'processing' },
];

function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());
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

  const filteredImages = galleryImages.filter(
    (img) => activeCategory === 'all' || img.category === activeCategory
  );

  const handleImageLoad = useCallback((index) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  }, []);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const getCategoryName = (id) => {
    return galleryCategories.find(c => c.id === id)?.name || id;
  };

  return (
    <>
      {/* Page Header */}
      <section className="page-header" aria-labelledby="gallery-title">
        <div className="page-header-bg" aria-hidden="true">
          <img
            src="/images/gallery-header.jpg"
            alt=""
            className="page-header-image"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="page-header-overlay" />
        </div>
        <div className="container page-header-content">
          <motion.h1
            id="gallery-title"
            className="page-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-hindi">{language === 'hi' ? 'हमारी गैलरी' : 'Our Gallery'}</span>
            <span className="text-latin">{language === 'en' ? 'Our Gallery' : 'हमारी गैलरी'}</span>
          </motion.h1>
          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-hindi">{language === 'hi' ? 'फसल से लेकर आपके घर तक' : 'From farms to your home'}</span>
            <span className="text-latin">{language === 'en' ? 'From farms to your home' : 'फसल से लेकर आपके घर तक'}</span>
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="gallery-filter" aria-label="Gallery category filter">
        <div className="container">
          <div className="filter-tabs" role="tablist" aria-label="Image categories">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                aria-controls={`${cat.id}-gallery-panel`}
                id={`${cat.id}-gallery-tab`}
                className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="text-hindi filter-name">{language === 'hi' ? cat.name : cat.nameEn}</span>
                <span className="filter-count">
                  {galleryImages.filter(img => cat.id === 'all' || img.category === cat.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-section section" aria-labelledby="gallery-grid-title">
        <div className="container">
          <motion.div
            className="gallery-grid"
            role="list"
            aria-label={`${getCategoryName(activeCategory)} images`}
          >
            {filteredImages.map((image, index) => (
              <motion.article
                key={image.src}
                role="listitem"
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => openLightbox(index)}
              >
                <div className="gallery-image-wrapper">
                  <div className={`gallery-image-skeleton ${loadedImages.has(index) ? 'loaded' : ''}`}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="gallery-image"
                      loading="lazy"
                      onLoad={() => handleImageLoad(index)}
                      onError={(e) => {
                        e.target.src = '/images/gallery-placeholder.svg';
                        handleImageLoad(index);
                      }}
                    />
                  </div>
                  <div className="gallery-overlay">
                    <div className="overlay-content">
                      <span>
                        <span className="text-hindi filter-name">{image.captionHindi}</span>
                        <span className="text-latin filter-name">{image.captionEn}</span>
                      </span>
                    </div>
                  </div>
                  <div className="gallery-caption">
                    <span className="text-hindi filter-name">{image.captionHindi}</span>
                    <span className="text-latin filter-name">{image.captionEn}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="gallery-stats section section-alt" aria-labelledby="stats-title">
        <div className="container">
          <SectionHeader
            title="Gallery at a Glance"
            titleHindi="गैलरी एक नज़र में"
            subtitleHindi="हमारी तस्वीरों की संख्या"
            subtitleEn="Gallery at a Glance"
          />
          <motion.div
            className="stats-grid"
            aria-labelledby="stats-title"
          >
            {galleryCategories.filter(c => c.id !== 'all').map((cat, index) => (
              <motion.div
                key={cat.id}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <span className="stat-number">
                  {galleryImages.filter(img => img.category === cat.id).length}
                </span>
                <span className="stat-label">
                  {language === 'hi' ? cat.name : cat.nameEn}
                </span>
              </motion.div>
            ))}
            <motion.div
              className="stat-card total"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <span className="stat-number">{galleryImages.length}</span>
              <span className="stat-label">
                {language === 'hi' ? 'Total images' : 'कुल तस्वीरें'}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="gallery-cta section" aria-labelledby="gallery-cta-title">
        <div className="container">
          <motion.div
            className="gallery-cta-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="gallery-cta-title" className="text-hindi">
              <span className="text-hindi">Share your photos</span>
              <span className="text-latin">Share your photos</span>
            </h2>
            <p className="text-hindi">
              <span className="text-hindi">Have you used Kundu Naturals products? Share your photos and become part of our gallery.</span>
              <span className="text-latin">Have you used Kundu Naturals products? Share your photos and become part of our gallery.</span>
            </p>
            <a href="/contact" className="btn btn-primary btn-lg">
              <span className="text-hindi">Send Photos</span>
              <span className="text-latin">Send Photos</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={filteredImages}
        initialIndex={lightboxIndex}
      />
    </>
  );
}

export default Gallery;