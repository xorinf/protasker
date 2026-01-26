import React from 'react';
import { Outlet, Link } from 'react-router-dom';

/**
 * AuthLayout
 * 
 * Layout for authentication pages (Login/Register).
 * Simple centered layout without the main navigation.
 */
function AuthLayout() {
    return (
        <div className="auth-layout">
            <div className="auth-card">
                <div className="auth-header">
                    <Link to="/" className="auth-logo">ProTasker</Link>
                </div>
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;
