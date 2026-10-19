import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './GalleryLightbox.css';

function GalleryLightbox({ isOpen, onClose, images, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const currentImage = images[currentIndex];

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialIndex]);

  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        goToPrev();
        break;
      case 'ArrowRight':
        goToNext();
        break;
      default:
        break;
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleSwipe = (direction) => {
    if (direction === 'left') goToNext();
    if (direction === 'right') goToPrev();
  };

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="छवि दर्शक"
      >
        <motion.div
          className="lightbox-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="lightbox-close"
            onClick={onClose}
            aria-label="बंद करें"
          >
            <X width="24" height="24" />
          </button>

          {images.length > 1 && (
            <>
              <button
                className="lightbox-nav lightbox-prev"
                onClick={goToPrev}
                aria-label="पिछली छवि"
                disabled={isAnimating}
              >
                <ChevronLeft width="28" height="28" />
              </button>
              <button
                className="lightbox-nav lightbox-next"
                onClick={goToNext}
                aria-label="अगली छवि"
                disabled={isAnimating}
              >
                <ChevronRight width="28" height="28" />
              </button>
            </>
          )}

          <motion.div
            className="lightbox-image-wrapper"
            key={currentIndex}
            initial={{ opacity: 0, x: isAnimating ? (currentIndex > initialIndex ? 50 : -50) : 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isAnimating ? (currentIndex > initialIndex ? -50 : 50) : 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt || ''}
              className="lightbox-image"
              onLoad={() => {}}
            />
          </motion.div>

          {(currentImage.caption || currentImage.captionHindi) && (
            <div className="lightbox-caption">
              <p className="text-hindi">{currentImage.captionHindi || currentImage.caption}</p>
            </div>
          )}

          <div className="lightbox-counter" aria-label={`${currentIndex + 1} / ${images.length}`}>
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default GalleryLightbox;