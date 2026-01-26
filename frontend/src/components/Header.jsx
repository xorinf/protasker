import React from 'react';

/**
 * Header Component
 * 
 * Demonstrates:
 * - Functional component
 * - Props destructuring
 * - Default props
 */
function Header({ title = 'ProTasker', subtitle = 'Phase 6: React Fundamentals' }) {
    return (
        <header>
            <h1>{title}</h1>
            <p className="subtitle">{subtitle}</p>
        </header>
    );
}

export default Header;
