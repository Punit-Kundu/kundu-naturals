import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
import PageSEO from './components/PageSEO';
import ScrollToTop from './components/ScrollToTop';
import FloatingContactButtons from './components/FloatingContactButtons';
import WebsiteChatbot from './components/WebsiteChatbot';
import { BusinessInfoProvider } from './context/BusinessInfoContext';
import Home from './pages/Home';

const About = React.lazy(() => import('./pages/About'));
const Products = React.lazy(() => import('./pages/Products'));
const ProductDetails = React.lazy(() => import('./pages/ProductDetails'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Contact = React.lazy(() => import('./pages/Contact'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <BusinessInfoProvider>
      <>
        <a href="#main-content" className="skip-link">मुख्य सामग्री पर जाएं</a>
        <PageSEO />
        <Header />
        <Layout>
          <React.Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
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