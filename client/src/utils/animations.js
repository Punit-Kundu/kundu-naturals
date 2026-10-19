// ========================================
// KUNDU NATURALS - ANIMATION UTILITIES
// Framer Motion Variants & Helpers
// ========================================

/**
 * Standard page transition variants
 */
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
};

/**
 * Fade in up animation - most common
 */
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
};

/**
 * Fade in left
 */
export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
};

/**
 * Fade in right
 */
export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
};

/**
 * Scale in
 */
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
};

/**
 * Staggered children container
 */
export const staggerContainer = (delay = 0.1) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: delay,
      delayChildren: 0.2
    }
  }
});

/**
 * Staggered item
 */
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
};

/**
 * Hero section specific animations
 */
export const heroVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
};

export const heroContentVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }
};

export const heroButtonVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }
};

/**
 * Scroll reveal - for sections
 */
export const scrollReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
};

export const scrollRevealLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
};

export const scrollRevealRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
};

/**
 * Card hover animations
 */
export const cardHover = {
  whileHover: {
    y: -8,
    boxShadow: '0 20px 40px rgba(48, 32, 24, 0.15)',
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  whileTap: { scale: 0.98 }
};

/**
 * Button animations
 */
export const buttonHover = {
  whileHover: { y: -2, boxShadow: '0 8px 24px rgba(214, 173, 98, 0.3)' },
  whileTap: { scale: 0.96 }
};

export const buttonHoverGold = {
  whileHover: { y: -2, boxShadow: '0 8px 24px rgba(214, 173, 98, 0.4)' },
  whileTap: { scale: 0.96 }
};

/**
 * Image reveal animations
 */
export const imageReveal = {
  initial: { opacity: 0, scale: 1.1 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
};

/**
 * Section header animations
 */
export const sectionHeaderVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
};

/**
 * Floating animation for decorative elements
 */
export const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
  }
};

/**
 * Pulse animation for CTAs
 */
export const pulseAnimation = {
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(214, 173, 98, 0.4)',
      '0 0 0 12px rgba(214, 173, 98, 0)',
      '0 0 0 0 rgba(214, 173, 98, 0.4)'
    ],
    transition: { duration: 2, repeat: Infinity }
  }
};

/**
 * Slide up for mobile menus/drawers
 */
export const slideUp = {
  initial: { opacity: 0, y: '100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '100%' },
  transition: { type: 'spring', damping: 25, stiffness: 300 }
};

/**
 * Modal/overlay animations
 */
export const modalVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
};

export const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

/**
 * Counter animation helper
 */
export const useCounter = (end, duration = 2000) => {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(easedProgress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  return count;
};

/**
 * Text reveal animation (character by character)
 */
export const textReveal = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02
    }
  }
};

export const textRevealChar = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
};

/**
 * Grid stagger for product/category grids
 */
export const gridStagger = (delay = 0.08) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: delay,
      delayChildren: 0.1
    }
  }
});

/**
 * List stagger
 */
export const listStagger = (delay = 0.06) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: delay
    }
  }
});

/**
 * Parallax helper for background images
 */
export const parallaxVariants = (speed = 0.3) => ({
  initial: { y: 0 },
  whileInView: {
    y: (_, { progress }) => progress * 100 * speed,
    transition: { duration: 0.1 }
  },
  viewport: { once: false }
});

/**
 * Section divider animation
 */
export const dividerVariants = {
  initial: { width: 0, opacity: 0 },
  whileInView: { width: '60px', opacity: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
};

/**
 * Reduced motion respect
 */
export const getReducedMotionVariants = (variants) => {
  // This would need to be used with useReducedMotion hook
  // For now, return variants as-is
  return variants;
};

import React from 'react';

export default {
  pageVariants,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  staggerItem,
  heroVariants,
  heroContentVariants,
  heroButtonVariants,
  scrollReveal,
  scrollRevealLeft,
  scrollRevealRight,
  cardHover,
  buttonHover,
  buttonHoverGold,
  imageReveal,
  sectionHeaderVariants,
  floatAnimation,
  pulseAnimation,
  slideUp,
  modalVariants,
  overlayVariants,
  textReveal,
  textRevealChar,
  gridStagger,
  listStagger,
  parallaxVariants,
  dividerVariants
};