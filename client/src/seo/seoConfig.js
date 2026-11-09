export const SITE_URL = 'https://kundu-naturals.vercel.app';
export const SITE_NAME = 'Kundu Naturals';
export const SOCIAL_IMAGE_PATH = '/images/website-logo.png';

export const PAGE_SEO = {
  '/': {
    title: 'Organic Food Online India & Haryana | Kundu Naturals',
    description:
      'Shop organic ghee, rice, dals, spices and natural foods from Kundu Naturals in Kailram, Kaithal, Haryana. Explore our range and WhatsApp us to order today.',
  },
  '/about': {
    title: 'Natural Food Brand in Kaithal, Haryana | Kundu Naturals',
    description:
      'Meet Kundu Naturals, a natural food brand from Kailram, Kaithal, Haryana. Learn about owner Ramesh Kundu, business manager Punit Kundu and our food story.',
  },
  '/products': {
    title: 'Natural Food Products Online in India | Kundu Naturals',
    description:
      'Browse organic ghee, rice, dals, spices, desi khand and more from Kundu Naturals in Kaithal, Haryana. Ask about products and order by WhatsApp in India today.',
  },
  '/gallery': {
    title: 'Natural Food Products Gallery in Haryana | Kundu Naturals',
    description:
      'See Kundu Naturals products and team in our food gallery. Explore natural food from Kailram, Kaithal, Haryana, then browse products or contact us today.',
  },
  '/contact': {
    title: 'Natural Food Contact in Kaithal, Haryana | Kundu Naturals',
    description:
      'Contact Kundu Naturals in Kailram, Kaithal, Haryana for product details and orders. Call 9034677123, email us or message us on WhatsApp for help today.',
  },
};

export const CONTACT_FAQS = [
  {
    question: 'How to place an order?',
    answer:
      'Browse the products and contact us on WhatsApp or by phone. Our team will confirm availability and price; checkout is not available on the website.',
    questionHindi: 'ऑर्डर कैसे दें?',
    answerHindi:
      'उत्पाद देखें और WhatsApp या फोन पर संपर्क करें। हमारी टीम उपलब्धता और कीमत की पुष्टि करेगी; वेबसाइट पर चेकआउट की सुविधा नहीं है।',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Delivery availability and estimated timing depend on your address. Our team will confirm the details before accepting the order.',
    questionHindi: 'डिलीवरी में कितना समय लगता है?',
    answerHindi:
      'डिलीवरी की उपलब्धता और अनुमानित समय आपके पते पर निर्भर करता है। ऑर्डर स्वीकार करने से पहले हमारी टीम विवरण की पुष्टि करेगी।',
  },
  {
    question: 'What payment methods?',
    answer:
      'Please ask our team about the payment options available for your order before confirming it.',
    questionHindi: 'भुगतान के तरीके क्या हैं?',
    answerHindi: 'ऑर्डर की पुष्टि से पहले उपलब्ध भुगतान विकल्पों के लिए हमारी टीम से पूछें।',
  },
  {
    question: 'Are products organically certified?',
    answer:
      'Our products are grown using traditional organic methods. Certification is in progress. Currently we rely on farmer declarations and internal quality checks.',
    questionHindi: 'उत्पाद जैविक प्रमाणित हैं?',
    answerHindi:
      'हमारे उत्पाद पारंपरिक जैविक विधियों से उगाए जाते हैं। प्रमाणन प्रक्रिया जारी है। वर्तमान में हम किसानों की घोषणा और आंतरिक गुणवत्ता जांच पर भरोसा करते हैं।',
  },
  {
    question: 'Discount for bulk orders?',
    answer:
      'Contact us on WhatsApp or by email to check bulk-order availability and request a quote.',
    questionHindi: 'थोक ऑर्डर पर छूट?',
    answerHindi: 'थोक ऑर्डर की उपलब्धता और कीमत जानने के लिए WhatsApp या ईमेल पर संपर्क करें।',
  },
  {
    question: 'Return/Refund policy?',
    answer:
      'Contact us with your order details. Our team will explain the applicable return or refund policy.',
    questionHindi: 'रिटर्न/रिफंड नीति?',
    answerHindi: 'अपने ऑर्डर के विवरण के साथ संपर्क करें। हमारी टीम लागू रिटर्न या रिफंड नीति बताएगी।',
  },
];

export function getProductSeo(product) {
  const titleSuffixes = [
    'Natural Food Online in India',
    'Natural Foods in Haryana',
    'Natural Food Products',
    'Food Online in India',
    'Natural Foods',
    'Online in India',
    'Natural Food',
  ];
  const title = titleSuffixes
    .map((suffix) => `${product.name} ${suffix} | ${SITE_NAME}`)
    .find((candidate) => candidate.length >= 50 && candidate.length <= 60);
  const descriptionBase =
    `Explore ${product.name} from Kundu Naturals in Kailram, Kaithal, Haryana. ` +
    'Ask about ingredients, pack sizes and availability. WhatsApp us to order today.';
  const descriptionSuffixes = [
    '',
    ' Ask us.',
    ' Contact us.',
    ' Message us.',
    ' Ask us today.',
    ' Contact us today.',
    ' Reach out today.',
  ];
  const description = descriptionSuffixes
    .map((suffix) => `${descriptionBase}${suffix}`)
    .find((candidate) => candidate.length >= 150 && candidate.length <= 160);

  if (!title || !description) {
    throw new Error(`SEO title or description length is invalid for ${product.name}`);
  }

  return { title, description };
}

export function getPageSeo(pathname, product) {
  if (product) {
    return { ...getProductSeo(product), path: `/products/${product.id}` };
  }

  if (PAGE_SEO[pathname]) {
    return { ...PAGE_SEO[pathname], path: pathname, notFound: false };
  }

  return {
    title: 'Page Not Found | Kundu Naturals',
    description: 'This Kundu Naturals page could not be found.',
    path: pathname,
    notFound: true,
  };
}

export function absoluteUrl(path) {
  return `${SITE_URL.replace(/\/+$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}
