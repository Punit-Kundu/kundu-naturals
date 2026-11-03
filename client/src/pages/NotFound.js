import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <section className="not-found-page section" aria-labelledby="not-found-title">
      <div className="container">
        <p className="not-found-code">404</p>
        <h1 id="not-found-title">Page not found</h1>
        <p>The page you are looking for is unavailable. Explore Kundu Naturals products or return home.</p>
        <div className="not-found-links">
          <Link className="btn btn-primary" to="/">Home</Link>
          <Link className="btn btn-outline" to="/products">Browse products</Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
