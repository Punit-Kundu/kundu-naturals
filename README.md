# कुंडू नेचुरल्स - Kundu Naturals

> शुद्ध आहार • स्वस्थ जीवन | Pure Food • Healthy Life

Authentic Indian organic food website built with React, Node.js, and traditional Indian design aesthetics.

## 🌿 Features

- **6 Pages**: Home, About, Products, Gallery, Our Brand, Contact
- **Authentic Indian Desi Design**: Earth tones, traditional patterns, cultural aesthetics
- **Real Images**: Uses your actual logo, founder photos, and product images
- **Bilingual**: Hindi (primary) + English support
- **Responsive**: Mobile-first, works on all devices
- **Accessible**: WCAG 2.1 AA compliant, semantic HTML, keyboard navigation
- **Animated**: Smooth Framer Motion animations, respects reduced-motion
- **Functional Backend**: Contact form with email integration
- **SEO Ready**: Meta tags, Open Graph, semantic structure

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git (optional)

### Installation

```bash
# Clone or navigate to project
cd kundunaturals

# Install all dependencies (root, client, server)
npm run install:all
```

### Development

```bash
# Run both frontend and backend concurrently
npm run dev
```

This starts:
- **Frontend**: http://localhost:3000 (React dev server)
- **Backend**: http://localhost:5000 (Express API)

### Production Build

```bash
# Build frontend for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
kundunaturals/
├── client/                 # React Frontend
│   ├── public/
│   │   └── images/         # Your actual images go here
│   │       ├── logo.png
│   │       ├── ramesh-kundu.jpg
│   │       ├── punit-kundu.jpg
│   │       └── products/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── Layout.js
│   │   │   ├── ProductCard.js
│   │   │   ├── SectionHeader.js
│   │   │   ├── GalleryLightbox.js
│   │   │   ├── ContactForm.js
│   │   │   └── ScrollToTop.js
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js
│   │   │   ├── About.js
│   │   │   ├── Products.js
│   │   │   ├── Gallery.js
│   │   │   ├── OurBrand.js
│   │   │   └── Contact.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css       # Design system & global styles
│   └── package.json
├── server/                 # Node.js/Express Backend
│   ├── routes/
│   │   └── contact.js      # Contact form API
│   ├── index.js
│   └── package.json
├── .env.example            # Environment variables template
└── package.json            # Root scripts
```

## 🖼️ Adding Your Images

Place your actual images in `client/public/images/`:

| File | Description | Required |
|------|-------------|----------|
| `logo.png` | Brand logo (used in header, footer) | ✅ Yes |
| `ramesh-kundu.jpg` | Founder photo (About, Home, Founders) | ✅ Yes |
| `punit-kundu.jpg` | Co-founder photo (About, Home, Founders) | ✅ Yes |
| `hero-farm.jpg` | Hero background (Home page) | Recommended |
| `about-header.jpg` | About page header background | Optional |
| `products-header.jpg` | Products page header | Optional |
| `gallery-header.jpg` | Gallery page header | Optional |
| `contact-header.jpg` | Contact page header | Optional |
| `brand-header.jpg` | Our Brand page header | Optional |
| `about-story.jpg` | About story section | Optional |
| `products/` | Product photos (see below) | ✅ Yes |
| `gallery/` | Gallery photos (see below) | Recommended |

### Product Images
Add to `client/public/images/products/`:
- `organic-wheat.jpg`
- `organic-rice.jpg`
- `moong-dal.jpg`
- `toor-dal.jpg`
- `organic-turmeric.jpg`
- `organic-cumin.jpg`
- `mustard-oil.jpg`
- `coconut-oil.jpg`
- `organic-honey.jpg`
- `jaggery.jpg`

### Gallery Images
Add to `client/public/images/gallery/`:
- `products-1.jpg` through `products-6.jpg`
- `farm-1.jpg` through `farm-6.jpg`
- `packaging-1.jpg` through `packaging-6.jpg`
- `team-1.jpg` through `team-6.jpg`
- `processing-1.jpg` through `processing-6.jpg`

**Note**: If images are missing, placeholder SVGs are shown automatically.

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env` in the root directory:

```bash
cp .env.example .env
```

Fill in your values:

```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Business Info (displayed on website)
BUSINESS_PHONE=+91-9876543210
BUSINESS_EMAIL=info@kundunaturals.com
BUSINESS_ADDRESS=Kundu Naturals, Village - YourVillage, District - YourDistrict, Haryana - 123456, India
WHATSAPP_NUMBER=919876543210
CONTACT_EMAIL=info@kundunaturals.com

# SMTP (for contact form emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password

# Google Maps (optional)
GOOGLE_MAPS_API_KEY=your-api-key
BUSINESS_LATITUDE=28.6139
BUSINESS_LONGITUDE=77.2090
```

### Gmail SMTP Setup
1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password: Google Account → Security → App Passwords
3. Use the App Password as `SMTP_PASS`

### Product Data
Edit product data in `client/src/pages/Products.js` and `client/src/pages/Home.js` (featuredProducts array).

### Gallery Data
Edit gallery data in `client/src/pages/Gallery.js` (galleryImages array).

### Content Text
All Hindi/English text is in the page components. Edit directly in the JSX.

## 🎨 Design System

### Colors (CSS Variables)
```css
--color-leaf-green: #2d5a27;
--color-forest-green: #1b3a18;
--color-mitti-brown: #8b6914;
--color-warm-beige: #e8dcc8;
--color-mustard-yellow: #d4a80a;
--color-off-white: #faf8f3;
--color-cream: #f5f0e8;
```

### Fonts
- **Devanagari**: Noto Sans Devanagari
- **Latin**: Poppins

### Animations
- Fade-in, slide-in on scroll
- Hover effects on cards
- Page transitions
- Respects `prefers-reduced-motion`

## 📱 Responsive Breakpoints
- Mobile: ≤ 480px
- Tablet: 481px - 768px
- Laptop: 769px - 1024px
- Desktop: 1025px - 1440px
- Large: ≥ 1441px

## ♿ Accessibility
- Semantic HTML5
- ARIA labels and roles
- Focus visible outlines
- Skip to main content link
- Color contrast ratios (WCAG AA)
- Keyboard navigable
- Alt text for all images
- Form validation with error announcements

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run install:all` | Install all dependencies |
| `npm run dev` | Run dev servers (client + server) |
| `npm run client` | Run only React dev server |
| `npm run server` | Run only Express server |
| `npm run build` | Build React for production |
| `npm start` | Start production server |

## 📦 Deployment

### Frontend (Netlify/Vercel)
1. Connect repository
2. Build command: `cd client && npm run build`
3. Publish directory: `client/build`
4. Add environment variables

### Backend (Railway/Render/Heroku)
1. Connect repository
2. Root directory: `server`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables

### Full Stack (VPS/Docker)
```bash
# Build frontend
cd client && npm run build

# Start server (serves static files + API)
cd ../server && npm start
```

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router 6, Framer Motion, Lucide React
- **Styling**: Custom CSS with CSS Variables (Design System)
- **Backend**: Node.js, Express, Nodemailer
- **Development**: Concurrently, Nodemon, React Scripts

## 📝 License

Private project for Kundu Naturals. All rights reserved.

## 🤝 Support

For technical issues or customization:
- Check the console for errors
- Verify `.env` configuration
- Ensure images are in correct paths
- Contact the developer

---

**Made with 💚 for Kundu Naturals**  
*शुद्ध आहार, स्वस्थ जीवन*