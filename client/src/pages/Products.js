import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight, LayoutGrid, List, Tag, Package, Wheat, Shield, Leaf } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem, scrollReveal, scrollRevealLeft, scrollRevealRight, sectionHeaderVariants, gridStagger, cardHover, imageReveal, buttonHover, buttonHoverGold } from '../utils/animations';
import './Products.css';
const productCatalog = [
  ['Buffalo Desi Ghee', 'भैंस का देसी घी', 'others', 'अन्य', '01-kundu-naturals-buffalo-desi-ghee'],
  ['Basmati Rice', 'बासमती चावल', 'grains', 'अनाज', '02-kundu-naturals-basmati-rice'],
  ['Jeera Biscuit', 'जीरा बिस्कुट', 'others', 'अन्य', '03-kundu-naturals-jeera-biscuit'],
  ['Khichdi Rice', 'खिचड़ी चावल', 'grains', 'अनाज', '04-kundu-naturals-khichdi-chawal'],
  ['Kala Dhan Chawal', 'काला धान चावल', 'grains', 'अनाज', '05-kundu-naturals-kala-dhan-chawal'],
  ['Saunf', 'सौंफ', 'spices', 'मसाले', '06-kundu-naturals-saunf'],
  ['Amla Murabba', 'आंवला मुरब्बा', 'others', 'अन्य', '07-kundu-naturals-amla-murabba'],
  ['Gajar Achar', 'गाजर का अचार', 'others', 'अन्य', '08-kundu-naturals-gajar-achar'],
  ['Dhaga Mishri', 'धागा मिश्री', 'others', 'अन्य', '09-kundu-naturals-dhaga-mishri'],
  ['Kadi Patta', 'कड़ी पत्ता', 'spices', 'मसाले', '10-kundu-naturals-kadi-patta'],
  ['Moong Dhuli Dal', 'धुली मूंग दाल', 'pulses', 'दालें', '11-kundu-naturals-moong-dhuli-dal'],
  ['Besan Biscuit', 'बेसन बिस्कुट', 'others', 'अन्य', '12-kundu-naturals-besan-biscuit'],
  ['Red Chili Powder', 'लाल मिर्च पाउडर', 'spices', 'मसाले', '13-kundu-naturals-lal-mirch-powder'],
  ['Bajra Atta', 'बाजरा आटा', 'grains', 'अनाज', '14-kundu-naturals-bajra-atta'],
  ['Coriander Powder', 'धनिया पाउडर', 'spices', 'मसाले', '15-kundu-naturals-dhaniya-powder'],
  ['Kala Chana', 'काला चना', 'pulses', 'दालें', '16-kundu-naturals-kala-chana'],
  ['Tur Dal', 'तूर दाल', 'pulses', 'दालें', '17-kundu-naturals-tur-dal'],
  ['Moong Chilka Dal', 'छिलके वाली मूंग दाल', 'pulses', 'दालें', '18-kundu-naturals-moong-chilka-dal'],
  ['Turmeric Powder', 'हल्दी पाउडर', 'spices', 'मसाले', '19-kundu-naturals-haldi-powder'],
  ['Sona Moti Wheat Daliya', 'सोना मोती गेहूं दलिया', 'grains', 'अनाज', '20-kundu-naturals-sona-moti-gehu-daliya'],
  ['Sarbati Atta', 'सरबती आटा', 'grains', 'अनाज', '21-kundu-naturals-sarbati-atta'],
  ['Urad Dal', 'उड़द दाल', 'pulses', 'दालें', '22-kundu-naturals-urad-dal'],
  ['Besan Flour', 'बेसन', 'pulses', 'दालें', '23-kundu-naturals-besan-flour'],
  ['Panchvati Chutney', 'पंचवटी चटनी', 'others', 'अन्य', '24-kundu-naturals-panchvati-chutney'],
  ['Sweet Lemon Pickle', 'मीठा नींबू अचार', 'others', 'अन्य', '25-kundu-naturals-meetha-nimbu-achar'],
  ['Mixed Pickle', 'मिक्स अचार', 'others', 'अन्य', '26-kundu-naturals-mix-achar'],
  ['Methi Pickle', 'मेथी का अचार', 'others', 'अन्य', '27-kundu-naturals-methi-achar'],
  ['A2 Desi Cow Ghee', 'ए2 देसी गाय का घी', 'others', 'अन्य', '28-kundu-naturals-a2-desi-cow-ghee'],
  ['Crushed Turmeric', 'कुटी हल्दी', 'spices', 'मसाले', '29-kundu-naturals-kuti-haldi-powder'],
  ['Chana Dal', 'चना दाल', 'pulses', 'दालें', '30-kundu-naturals-chana-dal'],
  ['Shakkar', 'शक्कर', 'others', 'अन्य', '31-kundu-naturals-shakkar'],
  ['Desi Khand', 'देसी खांड', 'others', 'अन्य', '32-kundu-naturals-desi-khand'],
  ['Yellow Mustard Oil', 'पीली सरसों का तेल', 'oils', 'तेल', '33-kundu-naturals-yellow-mustard-oil'],
  ['Sesame Oil', 'तिल का तेल', 'oils', 'तेल', '34-kundu-naturals-til-oil'],
  ['Black Mustard Oil', 'काली सरसों का तेल', 'oils', 'तेल', '35-kundu-naturals-black-mustard-oil'],
  ['Shatavari Powder', 'शतावरी पाउडर', 'spices', 'मसाले', '36-kundu-naturals-shatavari-powder'],
  ['Multifloral Honey', 'मल्टीफ्लोरल शहद', 'honey', 'शहद', '37-kundu-naturals-multifloral-honey'],
  ['Ginger Powder', 'अदरक पाउडर', 'spices', 'मसाले', '38-kundu-naturals-ginger-powder'],
  ['Black Turmeric Powder', 'काली हल्दी पाउडर', 'spices', 'मसाले', '39-kundu-naturals-black-haldi-powder'],
  ['Ginger Pickle', 'अदरक का अचार', 'others', 'अन्य', '40-kundu-naturals-adrak-achar'],
];

export const allProducts = productCatalog.map(([name, nameHindi, category, categoryHindi, imageName]) => ({
  id: imageName.replace(/^\d+-kundu-naturals-/, ''),
  name,
  nameHindi,
  description: 'Contact us for product details.',
  descriptionHindi: 'उत्पाद की जानकारी के लिए संपर्क करें।',
  image: `/images/Kundu-Naturals-All-Products/${imageName}.webp`,
  category,
  categoryHindi,
  packSizes: [],
  inStock: true,
  isOrganic: false,
}));

const PRODUCTS_PER_PAGE = allProducts.length;

const categories = [
  { id: 'all', name: 'All', nameHindi: 'सभी', icon: LayoutGrid },
  { id: 'grains', name: 'Grains', nameHindi: 'अनाज', icon: Wheat },
  { id: 'pulses', name: 'Pulses', nameHindi: 'दालें', icon: Package },
  { id: 'spices', name: 'Spices', nameHindi: 'मसाले', icon: Leaf },
  { id: 'oils', name: 'Oils', nameHindi: 'तेल', icon: Package },
  { id: 'honey', name: 'Honey', nameHindi: 'शहद', icon: Leaf },
  { id: 'others', name: 'Others', nameHindi: 'अन्य', icon: Tag },
];

function Products() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [language, setLanguage] = useState('en'); // Default to English
  const [currentPage, setCurrentPage] = useState(1);
  
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

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortBy, language]);

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    return allProducts.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = product.nameHindi.toLocaleLowerCase().includes(query) ||
                           product.name.toLocaleLowerCase().includes(query) ||
                           product.categoryHindi.toLocaleLowerCase().includes(query) ||
                           product.category.toLocaleLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'name') {
        const nameA = language === 'hi' ? a.nameHindi : a.name;
        const nameB = language === 'hi' ? b.nameHindi : b.name;
        return nameA.localeCompare(nameB);
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
  }, [activeCategory, searchQuery, sortBy, language]);

  const pageCount = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );
  const selectedCategory = categories.find((category) => category.id === activeCategory);

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
              <div className="category-filters" role="group" aria-label={language === 'hi' ? 'उत्पाद श्रेणियाँ' : 'Product categories'}>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={activeCategory === cat.id}
                    className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat.id)}
                  >
                    <span>{language === 'hi' ? cat.nameHindi : cat.name}</span>
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
              <span>{language === 'hi' ? 'फ़िल्टर: ' : 'Filter: '}{language === 'hi' ? selectedCategory?.nameHindi : selectedCategory?.name}</span>
              <button
                type="button"
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
                ? language === 'hi' ? `${selectedCategory?.nameHindi} (${filteredProducts.length})`
                : `${selectedCategory?.name} (${filteredProducts.length})`
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
              {visibleProducts.map((product) => (
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

          {pageCount > 1 && (
            <nav className="pagination" aria-label={language === 'hi' ? 'उत्पाद पृष्ठ' : 'Product pages'}>
              <button
                type="button"
                className="page-btn"
                aria-label={language === 'hi' ? 'पिछला पृष्ठ' : 'Previous page'}
                onClick={() => setCurrentPage((page) => page - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft width="18" height="18" aria-hidden="true" />
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                <button
                  type="button"
                  key={page}
                  className={`page-btn ${currentPage === page ? 'active' : ''}`}
                  aria-label={language === 'hi' ? `पृष्ठ ${page}` : `Page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                className="page-btn"
                aria-label={language === 'hi' ? 'अगला पृष्ठ' : 'Next page'}
                onClick={() => setCurrentPage((page) => page + 1)}
                disabled={currentPage === pageCount}
              >
                <ChevronRight width="18" height="18" aria-hidden="true" />
              </button>
            </nav>
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
                  {language === 'hi' ? cat.nameHindi : cat.name}
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