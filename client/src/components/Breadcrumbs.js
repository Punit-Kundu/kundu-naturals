import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs container" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li key={item.path}>
              {isCurrent ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link to={item.path}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
