import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, MessageCircle, Package } from 'lucide-react';
import { allProducts } from './Products';
import { useBusinessInfo } from '../context/BusinessInfoContext';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const product = allProducts.find((item) => item.id === id);
  const businessInfo = useBusinessInfo();

  useEffect(() => {
    if (!product) return undefined;
    const previousTitle = document.title;
    document.title = `${product.name} | Kundu Naturals`;
    return () => {
      document.title = previousTitle;
    };
  }, [product]);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const whatsappDigits = String(businessInfo.whatsapp).replace(/\D/g, '');
  const whatsappNumber = whatsappDigits.startsWith('91') ? whatsappDigits : `91${whatsappDigits}`;
  const enquiryMessage = encodeURIComponent(
    `नमस्ते! मुझे "${product.name}" में दिलचस्पी है। कृपया कीमत और उपलब्धता की जानकारी दें।`,
  );

  return (
    <section className="product-detail-page section" aria-labelledby="product-detail-title">
      <div className="container">
        <Link to="/products" className="product-detail-back">
          <ArrowLeft width="18" height="18" aria-hidden="true" />
          <span className="text-hindi">सभी उत्पाद</span>
          <span className="text-latin">All products</span>
        </Link>

        <article className="product-detail">
          <div className="product-detail-image">
            <img
              src={product.image || '/images/product-placeholder.svg'}
              alt={product.name}
              onError={(event) => { event.currentTarget.src = '/images/product-placeholder.svg'; }}
            />
          </div>

          <div className="product-detail-content">
            <p className="product-detail-category">
              <span className="text-hindi">{product.categoryHindi}</span>
              <span className="text-latin">{product.category}</span>
            </p>
            <h1 id="product-detail-title" className="product-detail-title">
              <span className="text-hindi">{product.nameHindi}</span>
              <span className="text-latin">{product.name}</span>
            </h1>
            <p className="product-detail-description">
              <span className="text-hindi">{product.descriptionHindi}</span>
              <span className="text-latin">{product.description}</span>
            </p>

            <div className="product-detail-price">
              {product.price ? (
                <>
                  <strong>₹{product.price}</strong>
                  {product.originalPrice > product.price && (
                    <del aria-label="Original price">₹{product.originalPrice}</del>
                  )}
                  <span className="text-hindi">से शुरू</span>
                  <span className="text-latin">starting price</span>
                </>
              ) : (
                <span className="text-hindi">कीमत के लिए संपर्क करें</span>
              )}
            </div>

            {product.packSizes.length > 0 && (
              <div className="product-detail-packs">
                <h2>
                  <Package width="18" height="18" aria-hidden="true" />
                  <span className="text-hindi">उपलब्ध पैक</span>
                  <span className="text-latin">Available pack sizes</span>
                </h2>
                <ul>
                  {product.packSizes.map((packSize) => <li key={packSize}>{packSize}</li>)}
                </ul>
              </div>
            )}

            <p className={`product-detail-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
              <CheckCircle width="18" height="18" aria-hidden="true" />
              <span className="text-hindi">{product.inStock ? 'उपलब्धता की पुष्टि संपर्क पर करें' : 'उपलब्धता के लिए संपर्क करें'}</span>
              <span className="text-latin">{product.inStock ? 'Confirm availability when you enquire' : 'Contact us to check availability'}</span>
            </p>

            <a
              className="btn btn-primary btn-lg product-detail-enquiry"
              href={`https://wa.me/${whatsappNumber}?text=${enquiryMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle width="20" height="20" aria-hidden="true" />
              <span className="text-hindi">WhatsApp पर पूछताछ करें</span>
              <span className="text-latin">Enquire on WhatsApp</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

export default ProductDetails;
