import React from 'react';

const Header = () => {
    return (
        <header className="app-header">
            <div className="app-title">
                <i className="fas fa-code"></i>
                <span>CodeNote Editor</span>
            </div>
            <div>
                <i className="fas fa-database"></i>
                <span> MongoDB</span>
            </div>
        </header>
    );
};

export default Header;