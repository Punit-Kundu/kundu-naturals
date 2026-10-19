import React from 'react';
import { motion } from 'framer-motion';
import './Layout.css';

function Layout({ children }) {
  return (
    <motion.main
      id="main-content"
      className="layout-main"
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.4 } }
      }}
    >
      {children}
    </motion.main>
  );
}

export default Layout;