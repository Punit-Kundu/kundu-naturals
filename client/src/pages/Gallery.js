import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image, Filter, Grid, Loader2 } from 'lucide-react';
import GalleryLightbox from '../components/GalleryLightbox';
import SectionHeader from '../components/SectionHeader';
import PageHero from '../components/PageHero';
import { allProducts } from '../data/products';
import './Gallery.css';

const galleryCategories = [
  { id: 'all', name: 'All', nameEn: 'All' },
  { id: 'products', name: 'Products', nameEn: 'Products' },
  { id: 'farm', name: 'Farm', nameEn: 'Farm' },
  { id: 'packaging', name: 'Packaging', nameEn: 'Packaging' },
  { id: 'team', name: 'Team', nameEn: 'Team' },
  { id: 'processing', name: 'Processing', nameEn: 'Processing' },
];

const galleryImages = [
  ...allProducts.map((product) => ({
    src: product.image,
    alt: `${product.name} from Kundu Naturals`,
    captionHindi: product.nameHindi,
    captionEn: product.name,
    category: 'products',
  })),
  ...['farm', 'packaging'].flatMap((category) => (
    Array.from({ length: 6 }, (_, index) => ({
      src: '/images/gallery-placeholder.svg',
      alt: `Kundu Naturals ${category} gallery image placeholder`,
      captionHindi: `${category === 'farm' ? 'खेत' : 'पैकेजिंग'} गैलरी छवि ${index + 1}`,
      captionEn: `${category[0].toUpperCase()}${category.slice(1)} gallery image ${index + 1}`,
      category,
    }))
  )),
  {
    src: '/images/Kundu-Naturals-Team-Photos/ramesh-kundu-brand-owner.webp',
    alt: 'Ramesh Kundu, owner of Kundu Naturals',
    captionHindi: 'रमेश कुंडू, Kundu Naturals के मालिक',
    captionEn: 'Ramesh Kundu, owner of Kundu Naturals',
    category: 'team',
  },
  {
    src: '/images/Kundu-Naturals-Team-Photos/punit-kundu-business-manager.webp',
    alt: 'Punit Kundu, business manager at Kundu Naturals',
    captionHindi: 'पुनीत कुंडू, Kundu Naturals के बिज़नेस मैनेजर',
    captionEn: 'Punit Kundu, business manager at Kundu Naturals',
    category: 'team',
  },
  ...Array.from({ length: 4 }, (_, index) => ({
    src: '/images/gallery-placeholder.svg',
    alt: `Kundu Naturals team gallery image placeholder ${index + 1}`,
    captionHindi: `टीम गैलरी छवि ${index + 1}`,
    captionEn: `Team gallery image placeholder ${index + 1}`,
    category: 'team',
  })),
  ...Array.from({ length: 6 }, (_, index) => ({
    src: '/images/gallery-placeholder.svg',
    alt: `Kundu Naturals food processing gallery image placeholder`,
    captionHindi: `प्रसंस्करण गैलरी छवि ${index + 1}`,
    captionEn: `Processing gallery image ${index + 1}`,
    category: 'processing',
  })),
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
      {/* Page Hero */}
      <PageHero
        title={language === 'hi' ? 'हरियाणा के प्राकृतिक भोजन की गैलरी' : 'Natural Food Gallery in Haryana'}
        titleHindi="हरियाणा के प्राकृतिक भोजन की गैलरी"
        subtitle={language === 'hi' ? 'कैथल, हरियाणा के खाद्य उत्पाद और टीम' : 'Food products and team from Kaithal, Haryana'}
        subtitleHindi="कैथल, हरियाणा के खाद्य उत्पाद और टीम"
        bgImage="/images/website-header.webp"
        ctaText="Shop Now"
        ctaTextHindi="अभी खरीदें"
        ctaHref="/products"
        cta2Text="Our Story"
        cta2TextHindi="हमारी कहानी"
        cta2Href="/about"
        showContact
        language={language}
      />

      {/* Category Filter */}
      <section className="gallery-filter" aria-label="Gallery category filter">
        <div className="container">
          <div className="filter-tabs" role="tablist" aria-label="Image categories">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                aria-controls="gallery-grid-panel"
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
      <section
        id="gallery-grid-panel"
        className="gallery-section section"
        aria-labelledby="gallery-grid-title"
      >
        <div className="container">
          <h2 id="gallery-grid-title" className="visually-hidden">Kundu Naturals products and team</h2>
          <motion.div
            className="gallery-grid"
            role="list"
            aria-label={`${getCategoryName(activeCategory)} images`}
          >
            {filteredImages.map((image, index) => (
              <motion.button
                key={`${image.src}-${index}`}
                type="button"
                role="listitem"
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => openLightbox(index)}
                aria-label={`${image.captionEn} - ${index + 1} of ${filteredImages.length}`}
              >
                <div className="gallery-image-wrapper">
                  <div className={`gallery-image-skeleton ${loadedImages.has(index) ? 'loaded' : ''}`}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="gallery-image"
                      width="640"
                      height="480"
                      loading="lazy"
                      decoding="async"
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
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="gallery-stats section section-alt" aria-labelledby="stats-title">
        <div className="container">
          <SectionHeader
            id="stats-title"
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