// src/components/Header.js
import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="app-title">
        <i className="fas fa-code"></i>
        <span>CodeNote Editor</span>
      </div>
      <div>
        <i className="fas fa-user"></i>
        <span> Developer</span>
      </div>
    </header>
  );
};

export default Header;