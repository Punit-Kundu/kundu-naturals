import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, MessageCircle, Tag, Package } from 'lucide-react';
import './ProductCard.css';

function ProductCard({ product, variant = 'default' }) {
  const {
    id,
    name,
    nameHindi,
    description,
    descriptionHindi,
    image,
    images = [],
    category,
    categoryHindi,
    packSizes = [],
    price,
    originalPrice,
    inStock = true,
    isFeatured = false,
    isNew = false,
    isOrganic = true,
  } = product;

  const displayName = nameHindi || name;
  const displayDescription = descriptionHindi || description;
  const displayCategory = categoryHindi || category;

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const phoneNumber = '919034677123'; // WhatsApp number
    const message = encodeURIComponent(
      `नमस्ते! मुझे "${displayName}" में दिलचस्पी है। कृपया कीमत और उपलब्धता की जानकारी दें।`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (variant === 'compact') {
    return (
      <article className="product-card compact">
        <Link to={`/products/${id}`} className="product-card-link" aria-label={`${displayName} देखें`}>
          <div className="product-image-wrapper">
            <img
              src={image || '/images/product-placeholder.svg'}
              alt={displayName}
              className="product-image"
              loading="lazy"
              onError={(e) => { e.target.src = '/images/product-placeholder.svg'; }}
            />
            {isNew && <span className="product-badge new">नया</span>}
            {isFeatured && <span className="product-badge featured">विशेष</span>}
            {!inStock && <span className="product-badge out-of-stock">स्टॉक में नहीं</span>}
          </div>
          <div className="product-info">
            <span className="product-category">
              <span className="text-hindi">{displayCategory}</span>
              <span className="text-latin">{category || displayCategory}</span>
            </span>
            <h3 className="product-name">
              <span className="text-hindi">{displayName}</span>
              <span className="text-latin">{name || displayName}</span>
            </h3>
            <div className="product-price-row">
              {price && (
                <>
                  <span className="product-price">₹{price}</span>
                  {originalPrice && originalPrice > price && (
                    <span className="product-original-price">₹{originalPrice}</span>
                  )}
                </>
              )}
              {!price && (
                <span className="product-price-placeholder">
                  <span className="text-hindi">कीमत के लिए संपर्क करें</span>
                  <span className="text-latin">Contact for price</span>
                </span>
              )}
            </div>
          </div>
        </Link>
        <div className="product-actions">
          <button
            className="btn btn-outline btn-sm product-action-btn"
            onClick={handleWhatsAppOrder}
            aria-label={`${displayName} के लिए व्हाट्सऐप पर ऑर्डर करें`}
          >
            <MessageCircle width="16" height="16" aria-hidden="true" />
            <span>
            <span className="text-hindi">ऑर्डर करें</span>
            <span className="text-latin">Order Now</span>
          </span>
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="product-card">
      <Link to={`/products/${id}`} className="product-card-link" aria-label={`${displayName} - विस्तार से देखें`}>
        <div className="product-image-wrapper">
          <img
            src={image || '/images/product-placeholder.svg'}
            alt={displayName}
            className="product-image"
            loading="lazy"
            onError={(e) => { e.target.src = '/images/product-placeholder.svg'; }}
          />
          <div className="product-badges">
            {isNew && <span className="product-badge new">नया</span>}
            {isFeatured && <span className="product-badge featured">विशेष</span>}
            {isOrganic && <span className="product-badge organic">जैविक</span>}
            {!inStock && <span className="product-badge out-of-stock">स्टॉक में नहीं</span>}
          </div>
        </div>
        <div className="product-info">
          <span className="product-category text-hindi">{displayCategory}</span>
          <h3 className="product-name text-hindi">{displayName}</h3>
          <p className="product-description">
            <span className="text-hindi">{displayDescription}</span>
            <span className="text-latin">{description || displayDescription}</span>
          </p>

          {packSizes.length > 0 && (
            <div className="product-pack-sizes">
              <span className="pack-sizes-label">
                <span className="text-hindi">उपलब्ध पैक:</span>
                <span className="text-latin">Pack sizes:</span>
              </span>
              <div className="pack-size-tags">
                {packSizes.map((size, index) => (
                  <span key={`${size}-${index}`} className="pack-size-tag">{size}</span>
                ))}
              </div>
            </div>
          )}

          <div className="product-footer">
            <div className="product-price-row">
              {price && (
                <>
                  <span className="product-price">₹{price}</span>
                  {originalPrice && originalPrice > price && (
                    <span className="product-original-price">₹{originalPrice}</span>
                  )}
                </>
              )}
              {!price && (
                <span className="product-price-placeholder">
                  <span className="text-hindi">कीमत के लिए संपर्क करें</span>
                  <span className="text-latin">Contact for price</span>
                </span>
              )}
            </div>
            <span className="product-stock" aria-label={inStock ? 'उपलब्ध / In Stock' : 'स्टॉक में नहीं / Out of Stock'}>
              {inStock ? (
                <span className="in-stock" aria-hidden="true">✓ <span className="text-hindi">उपलब्ध</span><span className="text-latin">In Stock</span></span>
              ) : (
                <span className="out-of-stock" aria-hidden="true">✗ <span className="text-hindi">स्टॉक में नहीं</span><span className="text-latin">Out of Stock</span></span>
              )}
            </span>
          </div>
        </div>
      </Link>
      <div className="product-actions">
        <button
          className="btn btn-primary product-action-btn"
          onClick={handleWhatsAppOrder}
          aria-label={`${displayName} के लिए व्हाट्सऐप पर पूछताछ करें`}
          disabled={!inStock}
        >
          <MessageCircle width="18" height="18" aria-hidden="true" />
          <span>
            <span className="text-hindi">पूछताछ / ऑर्डर</span>
            <span className="text-latin">Enquire / Order</span>
          </span>
        </button>
        <Link
          to={`/products/${id}`}
          className="btn btn-outline btn-sm product-detail-btn"
          aria-label={`${displayName} का पूरा विवरण देखें`}
        >
          <Eye width="16" height="16" aria-hidden="true" />
          <span>
            <span className="text-hindi">विवरण</span>
            <span className="text-latin">Details</span>
          </span>
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;