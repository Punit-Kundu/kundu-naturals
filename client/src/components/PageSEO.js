import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { allProducts } from '../data/products';
import {
  absoluteUrl,
  CONTACT_FAQS,
  getPageSeo,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_PATH,
} from '../seo/seoConfig';

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = url;
}

function getBreadcrumbs(pathname, product) {
  const breadcrumbs = [{ name: 'Home', path: '/' }];

  if (pathname === '/') return breadcrumbs;
  if (product) {
    breadcrumbs.push({ name: 'Products', path: '/products' });
    breadcrumbs.push({ name: product.name, path: `/products/${product.id}` });
    return breadcrumbs;
  }

  const pageNames = {
    '/about': 'About',
    '/products': 'Products',
    '/gallery': 'Gallery',
    '/our-brand': 'Our Brand',
    '/contact': 'Contact',
  };
  const name = pageNames[pathname];
  if (name) breadcrumbs.push({ name, path: pathname });
  return breadcrumbs;
}

function PageSEO() {
  const { pathname } = useLocation();
  const productId = pathname.startsWith('/products/') ? pathname.split('/')[2] : null;
  const product = productId ? allProducts.find((item) => item.id === productId) : null;
  const page = getPageSeo(pathname, product);

  useEffect(() => {
    const canonicalUrl = absoluteUrl(page.path);
    const imageUrl = absoluteUrl(SOCIAL_IMAGE_PATH);
    const robots = page.notFound ? 'noindex, follow' : 'index, follow';
    const breadcrumbs = getBreadcrumbs(pathname, product).map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    }));

    document.title = page.title;
    setMeta('name', 'description', page.description);
    setMeta('name', 'robots', robots);
    setMeta('name', 'theme-color', '#14532D');
    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    setMeta('property', 'og:image', imageUrl);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', product ? 'product' : 'website');
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:image:alt', `${SITE_NAME} logo`);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', page.title);
    setMeta('name', 'twitter:description', page.description);
    setMeta('name', 'twitter:image', imageUrl);
    setCanonical(canonicalUrl);

    const organization = {
      '@type': 'Organization',
      '@id': `${SITE_URL.replace(/\/+$/, '')}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: imageUrl,
      email: 'kundupunit927@gmail.com',
      telephone: '+919034677123',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kailram',
        addressLocality: 'Kaithal',
        addressRegion: 'Haryana',
        addressCountry: 'IN',
      },
    };
    const localBusiness = {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL.replace(/\/+$/, '')}/#localbusiness`,
      name: SITE_NAME,
      url: SITE_URL,
      image: imageUrl,
      logo: imageUrl,
      telephone: '+919034677123',
      email: 'kundupunit927@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kailram',
        addressLocality: 'Kaithal',
        addressRegion: 'Haryana',
        addressCountry: 'IN',
      },
      parentOrganization: { '@id': organization['@id'] },
    };
    const graph = [
      organization,
      localBusiness,
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL.replace(/\/+$/, '')}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { '@id': organization['@id'] },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: page.title,
        description: page.description,
        isPartOf: { '@id': `${SITE_URL.replace(/\/+$/, '')}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs,
      },
    ];

    if (product) {
      graph.push({
        '@type': 'Product',
        name: product.name,
        image: absoluteUrl(product.image),
        description: product.description,
        brand: { '@type': 'Brand', name: SITE_NAME },
        url: canonicalUrl,
      });
    }

    if (pathname === '/contact') {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: CONTACT_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      });
    }

    let script = document.getElementById('kundu-structured-data');
    if (!script) {
      script = document.createElement('script');
      script.id = 'kundu-structured-data';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  }, [page.title, page.description, page.path, page.notFound, pathname, product]);

  return null;
}

export default PageSEO;
