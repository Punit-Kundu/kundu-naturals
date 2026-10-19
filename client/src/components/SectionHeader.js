import React from 'react';
import { motion } from 'framer-motion';
import './SectionHeader.css';

function SectionHeader({
  title,
  titleHindi,
  subtitle,
  subtitleHindi,
  children,
  className = '',
  alignment = 'center'
}) {
  return (
    <motion.div
      className={`section-header ${alignment} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      role="region"
  aria-label={`${titleHindi || title}${title ? '/' + title : ''}`}
    >
      {children && <div className="section-header-badge">{children}</div>}
      <h2 className="section-title">
        <span className="text-hindi">{titleHindi || title}</span>
        <span className="text-latin">{title || titleHindi}</span>
      </h2>
      {(subtitle || subtitleHindi) && (
        <p className="section-subtitle">
          <span className="text-hindi">{subtitleHindi || subtitle}</span>
          <span className="text-latin">{subtitle || subtitleHindi}</span>
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeader;