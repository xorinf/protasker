import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './styles/main.css';

/**
 * App Component
 * 
 * Now simplified to just providing the router.
 * State and Layout are handled by RouterProviders and Layout components.
 */
function App() {
    return <RouterProvider router={router} />;
}

export default App;
