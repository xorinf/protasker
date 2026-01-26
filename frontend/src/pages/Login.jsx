import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="auth-container">
            <h2>Welcome Back</h2>
            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="demo@example.com" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="••••••••" />
                </div>
                <button type="submit" className="btn-primary btn-block">Log In</button>
            </form>
            <p className="auth-footer">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    );
}

export default Login;
