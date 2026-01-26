/**
 * MAIN.JS — Application Entry Point
 * 
 * Vite entry point that imports all modules and initializes the application.
 * This replaces the multiple <script> tags in the HTML.
 */

// Import CSS
import './styles/main.css';

// Import the app module
// The app.js module will auto-initialize when loaded
import './js/app.js';

console.log('ProTasker loaded via Vite!');
