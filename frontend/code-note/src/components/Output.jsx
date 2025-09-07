import React from 'react';

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