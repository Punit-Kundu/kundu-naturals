import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, LayoutGrid, List, Tag, Package, ArrowLeft, Wheat, Shield } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem, scrollReveal, scrollRevealLeft, scrollRevealRight, sectionHeaderVariants, gridStagger, cardHover, imageReveal, buttonHover, buttonHoverGold } from '../utils/animations';
import './Products.css';


// Sample product data - replace with actual data
const allProducts = [
  {
    id: 'organic-wheat',
    name: 'Organic Wheat Flour',
    nameHindi: 'जैविक गेहूं का आटा',
    description: 'Stone-ground whole wheat flour from our farms',
    descriptionHindi: 'हमारे खेतों से पत्थर-पिसा साबुत गेहूं का आटा',
    category: 'grains',
    categoryHindi: 'अनाज',
    packSizes: ['1 kg', '5 kg', '10 kg'],
    price: 120,
    originalPrice: 150,
    inStock: true,
    isFeatured: true,
    isOrganic: true,
  },
  {
    id: 'organic-rice',
    name: 'Organic Basmati Rice',
    nameHindi: 'जैविक बासमती चावल',
    description: 'Aged basmati rice grown without chemicals',
    descriptionHindi: 'रसायन-मुक्त उगाया गया पुराना बासमती चावल',
    image: '/images/products/organic-rice.jpg',
    category: 'grains',
    categoryHindi: 'अनाज',
    packSizes: ['1 kg', '5 kg'],
    price: 180,
    originalPrice: 220,
    inStock: true,
    isOrganic: true,
  },
  {
    id: 'organic-moong-dal',
    name: 'Organic Moong Dal',
    nameHindi: 'जैविक मूंग दाल',
    description: 'Split green gram, rich in protein',
    descriptionHindi: 'प्रोटीन से भरपूर छिलके वाली मूंग दाल',
    image: '/images/products/moong-dal.jpg',
    category: 'pulses',
    categoryHindi: 'दालें',
    packSizes: ['500g', '1 kg'],
    price: 140,
    inStock: true,
    isOrganic: true,
  },
  {
    id: 'organic-toor-dal',
    name: 'Organic Toor Dal',
    nameHindi: 'जैविक अरहर दाल',
    description: 'Pigeon peas, staple in Indian cuisine',
    descriptionHindi: 'भारतीय रसोई का अभिन्न अंग अरहर दाल',
    image: '/images/products/toor-dal.jpg',
    category: 'pulses',
    categoryHindi: 'दालें',
    packSizes: ['500g', '1 kg'],
    price: 160,
    originalPrice: 190,
    inStock: true,
    isOrganic: true,
  },
  {
    id: 'organic-turmeric',
    name: 'Organic Turmeric Powder',
    nameHindi: 'जैविक हल्दी पाउडर',
    description: 'Pure turmeric with high curcumin content',
    descriptionHindi: 'उच्च करक्यूमिन सामग्री वाली शुद्ध हल्दी',
    image: '/images/products/organic-turmeric.jpg',
    category: 'spices',
    categoryHindi: 'मसाले',
    packSizes: ['100g', '250g', '500g'],
    price: 180,
    originalPrice: 220,
    inStock: true,
    isFeatured: true,
    isOrganic: true,
  },
  {
    id: 'organic-cumin',
    name: 'Organic Cumin Seeds',
    nameHindi: 'जैविक जीरा',
    description: 'Aromatic cumin seeds for daily cooking',
    descriptionHindi: 'दैनिक खाना पकाने के लिए सुगंधित जीरा',
    image: '/images/products/organic-cumin.jpg',
    category: 'spices',
    categoryHindi: 'मसाले',
    packSizes: ['100g', '250g'],
    price: 150,
    inStock: true,
    isOrganic: true,
  },
  {
    id: 'organic-mustard-oil',
    name: 'Cold Pressed Mustard Oil',
    nameHindi: 'कोल्ड प्रेस्ड सरसों तेल',
    description: 'Traditional kachi ghani mustard oil',
    descriptionHindi: 'पारंपरिक कच्ची घानी सरसों तेल',
    image: '/images/products/mustard-oil.jpg',
    category: 'oils',
    categoryHindi: 'तेल',
    packSizes: ['500ml', '1L', '2L'],
    price: 280,
    originalPrice: 320,
    inStock: true,
    isOrganic: true,
  },
  {
    id: 'organic-coconut-oil',
    name: 'Virgin Coconut Oil',
    nameHindi: 'वर्जिन नारियल तेल',
    description: 'Cold pressed from fresh coconuts',
    descriptionHindi: 'ताजा नारियल से कोल्ड प्रेस्ड',
    image: '/images/products/coconut-oil.jpg',
    category: 'oils',
    categoryHindi: 'तेल',
    packSizes: ['250ml', '500ml'],
    price: 320,
    inStock: true,
    isOrganic: true,
  },
  {
    id: 'organic-honey',
    name: 'Raw Forest Honey',
    nameHindi: 'कच्चा वन शहद',
    description: 'Unprocessed honey from wild bees',
    descriptionHindi: 'जंगली मधुमक्खियों से असंसाधित शहद',
    image: '/images/products/organic-honey.jpg',
    category: 'honey',
    categoryHindi: 'शहद',
    packSizes: ['250g', '500g', '1 kg'],
    price: 350,
    inStock: true,
    isFeatured: true,
    isOrganic: true,
  },
  {
    id: 'organic-jaggery',
    name: 'Organic Jaggery Powder',
    nameHindi: 'जैविक गुड़ पाउडर',
    description: 'Chemical-free jaggery from sugarcane',
    descriptionHindi: 'गन्ने से रसायन-मुक्त गुड़',
    image: '/images/products/jaggery.jpg',
    category: 'others',
    categoryHindi: 'अन्य',
    packSizes: ['500g', '1 kg'],
    price: 120,
    inStock: true,
    isOrganic: true,
  },
];

const categories = [
  { id: 'all', name: 'All', nameEn: 'All', icon: LayoutGrid },
  { id: 'grains', name: 'Grains', nameEn: 'Grains', icon: Wheat },
  { id: 'pulses', name: 'Pulses', nameEn: 'Pulses', icon: Package },
  { id: 'spices', name: 'Spices', nameEn: 'Spices', icon: Leaf },
  { id: 'oils', name: 'Oils', nameEn: 'Oils', icon: Package },
  { id: 'honey', name: 'Honey', nameEn: 'Honey', icon: Leaf },
  { id: 'others', name: 'Others', nameEn: 'Others', icon: Tag },
];

import { Leaf } from 'lucide-react';

function Products() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [language, setLanguage] = useState('en'); // Default to English
  
  // Set language from localStorage
  useEffect(() => {
    const syncLanguage = () => {
      const savedLang = localStorage.getItem('kundu-language');
      if (savedLang) {
        setLanguage(savedLang);
      }
    };
    syncLanguage();
    window.addEventListener('languagechange', syncLanguage);
    return () => window.removeEventListener('languagechange', syncLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.className = language === 'en' ? 'en' : 'hi';
    localStorage.setItem('kundu-language', language);
  }, [language]);

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = product.nameHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.categoryHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'name') {
        return (a.nameHindi || a.name).localeCompare(b.nameHindi || b.name);
      }
      if (sortBy === 'price-low') {
        return (a.price || 0) - (b.price || 0);
      }
      if (sortBy === 'price-high') {
        return (b.price || 0) - (a.price || 0);
      }
      if (sortBy === 'featured') {
        return (b.isFeatured === a.isFeatured) ? 0 : b.isFeatured ? 1 : -1;
      }
      return 0;
    });
  }, [allProducts, activeCategory, searchQuery, sortBy]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <>
      {/* Page Header */}
      <section className="page-header" aria-labelledby="products-title">
        <div className="page-header-bg" aria-hidden="true">
          <img
            src="/images/products-header.jpg"
            alt=""
            className="page-header-image"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="page-header-overlay" />
        </div>
        <div className="container page-header-content">
          <motion.h1
            id="products-title"
            className="page-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-hindi">{language === 'hi' ? 'सभी उत्पाद' : 'All Products'}</span>
            <span className="text-latin">{language === 'en' ? 'All Products' : 'सभी उत्पाद'}</span>
          </motion.h1>
          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-hindi">{language === 'hi' ? 'किसानों के खेतों से सीधे' : 'Direct from farmers'}</span>
            <span className="text-latin">{language === 'en' ? 'Direct from farmers' : 'किसानों के खेतों से सीधे'}</span>
          </motion.p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="products-toolbar" aria-label="Product filters and search">
        <div className="container">
          <div className="toolbar-content">
            <div className="search-wrapper">
              <label htmlFor="product-search" className="visually-hidden">{language === 'hi' ? 'उत्पाद खोजें' : 'Search products'}</label>
              <div className="search-input-wrapper">
                <Search width="20" height="20" aria-hidden="true" />
                <input
                  type="search"
                  id="product-search"
                  className="search-input"
                  placeholder={language === 'hi' ? 'उत्पाद नाम, श्रेणी से खोजें...' : 'Search products...'}
                  value={searchQuery}
                  onChange={handleSearch}
                  aria-label={language === 'hi' ? 'उत्पाद खोजें' : 'Search products'}
                />
              </div>
            </div>

            <div className="filters-wrapper">
              <div className="category-filters" role="tablist" aria-label="Product categories">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={activeCategory === cat.id}
                    aria-controls={`${cat.id}-panel`}
                    id={`${cat.id}-tab`}
                    className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat.id)}
                  >
                    <span>{language === 'hi' ? cat.nameHindi || cat.name : cat.nameHindi || cat.name}</span>
                    <span className="filter-count">
                      {allProducts.filter(p => cat.id === 'all' || p.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>

              <div className="view-sort-controls">
                <div className="view-toggle" role="group" aria-label="View mode">
                  <button
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    aria-label={language === 'hi' ? 'ग्रिड दृश्य' : 'Grid view'}
                    aria-pressed={viewMode === 'grid'}
                  >
                    <LayoutGrid width="20" height="20" />
                  </button>
                  <button
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    aria-label={language === 'hi' ? 'सूची दृश्य' : 'List view'}
                    aria-pressed={viewMode === 'list'}
                  >
                    <List width="20" height="20" />
                  </button>
                </div>

                <div className="sort-select-wrapper">
                  <label htmlFor="sort-select" className="visually-hidden">{language === 'hi' ? 'क्रमबद्ध करें' : 'Sort'}</label>
                  <Filter width="18" height="18" className="sort-icon" aria-hidden="true" />
                  <select
                    id="sort-select"
                    className="sort-select"
                    value={sortBy}
                    onChange={handleSortChange}
                    aria-label={language === 'hi' ? 'क्रमबद्ध करें' : 'Sort'}
                  >
                    <option value="name">{language === 'hi' ? 'नाम के अनुसार' : 'Name'}</option>
                    <option value="price-low">{language === 'hi' ? 'कीमत: कम से अधिक' : 'Price: Low to High'}</option>
                    <option value="price-high">{language === 'hi' ? 'कीमत: अधिक से कम' : 'Price: High to Low'}</option>
                    <option value="featured">{language === 'hi' ? 'विशेष पहले' : 'Featured first'}</option>
                  </select>
                  <ChevronDown width="18" height="18" className="sort-chevron" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          {activeCategory !== 'all' && (
            <motion.div
              className="active-filter-tag"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Tag width="16" height="16" aria-hidden="true" />
              <span>{language === 'hi' ? 'फ़िल्टर: ' + categories.find(c => c.id === activeCategory)?.nameHindi || categories.find(c => c.id === activeCategory)?.name : 'Filter: ' + (categories.find(c => c.id === activeCategory)?.nameHindi || categories.find(c => c.id === activeCategory)?.name)}</span>
              <button
                className="clear-filter"
                onClick={() => handleCategoryChange('all')}
                aria-label={language === 'hi' ? 'फ़िल्टर हटाएं' : 'Clear filter'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section section" aria-labelledby="products-list-title">
        <div className="container">
          <motion.div
            className="section-header-row"
            aria-label="Products section"
            variants={sectionHeaderVariants}
          >
            <motion.h2 
              id="products-list-title" 
              className="section-title-inline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {activeCategory !== 'all'
                ? language === 'hi' ? `${categories.find(c => c.id === activeCategory)?.nameHindi || categories.find(c => c.id === activeCategory)?.name} (${filteredProducts.length})`
                : `${categories.find(c => c.id === activeCategory)?.nameEn || categories.find(c => c.id === activeCategory)?.name} (${filteredProducts.length})`
                : language === 'hi' ? `सभी उत्पाद (${filteredProducts.length})` : `All products (${filteredProducts.length})`}
            </motion.h2>
          </motion.div>

          {filteredProducts.length === 0 ? (
            <motion.div
              className="no-products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Package width="64" height="64" className="no-products-icon" aria-hidden="true" />
              <h3>{language === 'hi' ? 'कोई उत्पाद नहीं मिला' : 'No products found'}</h3>
              <p>{language === 'hi' ? 'अपनी खोज या फ़िल्टर बदलकर पुनः प्रयास करें।' : 'Please try changing your search or filter.'}</p>
              <motion.button 
                className="btn btn-outline" 
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                variants={buttonHover}
                whileHover="whileHover"
                whileTap="whileTap"
              >
                {language === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset Filter'}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              className={`products-grid ${viewMode}`}
              role="list"
              aria-label={
                activeCategory !== 'all'
                  ? (language === 'hi' ? 'उत्पाद सूची' : 'Product list')
                  : (language === 'hi' ? 'सभी उत्पाद' : 'All products')
              }
              variants={gridStagger(0.06)}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  role="listitem"
                  variants={staggerItem}
                >
                  <ProductCard
                    product={product}
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination placeholder */}
          {filteredProducts.length > 12 && (
            <div className="pagination">
              <button className="page-btn" aria-label={language === 'hi' ? 'पिछला पृष्ठ' : 'Previous page'} disabled>
                <ArrowLeft width="18" height="18" />
              </button>
              <button className="page-btn active" aria-label={language === 'hi' ? 'पृष्ठ 1' : 'Page 1'}>{language === 'hi' ? '1' : '1'}</button>
              <button className="page-btn" aria-label={language === 'hi' ? 'पृष्ठ 2' : 'Page 2'}>{language === 'hi' ? '2' : '2'}</button>
              <button className="page-btn" aria-label={language === 'hi' ? 'अगला पृष्ठ' : 'Next page'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="6" y1="18" x2="18" y2="6"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Category Info Section */}
      <section className="category-info section section-alt" aria-labelledby="cat-info-title">
        <div className="container">
          <motion.div
            className="section-header"
            variants={sectionHeaderVariants}
          >
            <SectionHeader
              title="Product Categories"
              titleHindi="उत्पाद श्रेणियाँ"
              subtitle={language === 'hi' ? 'हमारी सभी श्रेणियाँ देखें' : 'View All Categories'}
              subtitleHindi={language === 'hi' ? 'हमारी सभी श्रेणियाँ देखें' : 'View All Categories'}
            />
          </motion.div>
          <motion.div
            className="category-info-grid"
            variants={gridStagger(0.08)}
          >
            {categories.filter(c => c.id !== 'all').map((cat, index) => (
              <motion.article
                key={cat.id}
                className="category-info-card"
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(48, 32, 24, 0.15)', transition: { duration: 0.3 } }}
              >
                <motion.div 
                  className="category-info-icon"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 100 }}
                >
                  <Wheat width="28" height="28" aria-hidden="true" />
                </motion.div>
                <motion.h3 
                  className="category-info-name text-hindi"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 + 0.1 }}
                >
                  {language === 'hi' ? cat.nameHindi || cat.name : cat.nameHindi || cat.name}
                </motion.h3>
                <motion.p 
                  className="category-info-count text-hindi"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 + 0.2 }}
                >
                  {allProducts.filter(p => p.category === cat.id).length} {language === 'hi' ? 'उत्पाद' : 'products'}
                </motion.p>
                <motion.button
                  className="btn btn-outline btn-sm category-info-btn"
                  onClick={() => handleCategoryChange(cat.id)}
                  variants={buttonHover}
                  whileHover="whileHover"
                  whileTap="whileTap"
                >
                  {language === 'hi' ? 'देखें' : 'View'}
                </motion.button>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="quality-section section" aria-labelledby="quality-title">
        <div className="container">
          <motion.div
            className="section-header"
            variants={sectionHeaderVariants}
          >
            <SectionHeader
              title="Quality Promise"
              titleHindi="गुणवत्ता का वादा"
              subtitle="Every product meets our highest standards"
              subtitleHindi="हर उत्पाद हमारे उच्चतम मानकों को पूरा करता है"
            />
          </motion.div>
          <motion.div
            className="quality-grid"
            aria-labelledby="quality-title"
            variants={gridStagger(0.1)}
          >
            {[
              { icon: Leaf, title: '100% Natural', titleHindi: '100% प्राकृतिक', desc: 'No chemicals, no preservatives, no artificial colors', descHindi: 'कोई रसायन, कोई प्रिजर्वेटिव, कोई कृत्रिम रंग नहीं' },
              { icon: Wheat, title: 'Traditional Processing', titleHindi: 'पारंपरिक प्रसंस्करण', desc: 'Stone mill, kachi ghani, sun drying', descHindi: 'पत्थर की चक्की, कच्ची घानी, धूप में सुखाना' },
              { icon: Shield, title: 'Quality Check', titleHindi: 'गुणवत्ता जांच', desc: 'Every batch tested, transparent labeling', descHindi: 'हर बैच की कड़ी गुणवत्ता जांच और परीक्षण' },
              { icon: Package, title: 'Eco-friendly Packaging', titleHindi: 'पर्यावरण-अनुकूल पैकिंग', desc: 'Recyclable, plastic-free packaging', descHindi: 'पुनर्चक्रण योग्य, प्लास्टिक-मुक्त पैकेजिंग' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="quality-card"
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(48, 32, 24, 0.15)', transition: { duration: 0.3 } }}
              >
                <motion.div 
                  className="quality-icon"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 100 }}
                >
                  <item.icon width="28" height="28" aria-hidden="true" />
                </motion.div>
                <motion.h4 
                  className="quality-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                >
                  <span className="text-hindi">{item.titleHindi}</span>
                  <span className="text-latin">{item.title}</span>
                </motion.h4>
                <motion.p 
                  className="quality-desc"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  <span className="text-hindi">{item.descHindi}</span>
                  <span className="text-latin">{item.desc}</span>
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Products;