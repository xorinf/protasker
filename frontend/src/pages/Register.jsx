import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
    return (
        <div className="auth-container">
            <h2>Create Account</h2>
            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" placeholder="John Doe" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="demo@example.com" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="••••••••" />
                </div>
                <button type="submit" className="btn-primary btn-block">Sign Up</button>
            </form>
            <p className="auth-footer">
                Already have an account? <Link to="/login">Log In</Link>
            </p>
        </div>
    );
}

export default Register;
