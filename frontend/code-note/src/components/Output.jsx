// src/components/Output.js
import React from 'react';
import '../styles/Output.css';

const Output = ({ output }) => {
  return (
    <div className="output-container">
      <div className="output-header">
        <i className="fas fa-terminal"></i>
        Output
      </div>
      <div className="output-content">
        {output}
      </div>
    </div>
  );
};

export default Output;