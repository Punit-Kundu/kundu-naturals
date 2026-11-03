import React from 'react';
import './Layout.css';

function Layout({ children }) {
  return (
    <main id="main-content" className="layout-main">
      {children}
    </main>
  );
}

export default Layout;