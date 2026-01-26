import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Header from '../components/Header';

/**
 * RootLayout
 * 
 * The main application shell.
 * Renders the persistent Header/Nav and the changing page content (Outlet).
 */
function RootLayout() {
    return (
        <div className="app-layout">
            <Header title="ProTasker" subtitle="Phase 7: React Router" />

            <nav className="main-nav">
                <ul className="nav-list">
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''}>
                            Tasks
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>
                            Projects
                        </NavLink>
                    </li>
                </ul>
                <div className="nav-auth">
                    <NavLink to="/login" className="nav-link-auth">Login</NavLink>
                </div>
            </nav>

            <main className="container page-content">
                <Outlet />
            </main>

            <footer>
                <p>&copy; 2026 ProTasker — React Architecture</p>
            </footer>
        </div>
    );
}

export default RootLayout;
