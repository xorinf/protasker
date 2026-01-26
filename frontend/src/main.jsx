/**
 * MAIN.JS — React Application Entry Point
 * 
 * Bootstrap React application and mount to DOM.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Mount React app to root element
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

console.log('ProTasker React app loaded!');
