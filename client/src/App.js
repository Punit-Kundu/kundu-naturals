import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Gallery from './pages/Gallery';
import OurBrand from './pages/OurBrand';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import FloatingContactButtons from './components/FloatingContactButtons';
import WebsiteChatbot from './components/WebsiteChatbot';
import { BusinessInfoProvider } from './context/BusinessInfoContext';

function App() {
  return (
    <BusinessInfoProvider>
      <>
        <a href="#main-content" className="skip-link">मुख्य सामग्री पर जाएं</a>
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/our-brand" element={<OurBrand />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
        <Footer />
        <FloatingContactButtons />
        <ScrollToTop />
        <WebsiteChatbot />
      </>
    </BusinessInfoProvider>
  );
}

export default App;