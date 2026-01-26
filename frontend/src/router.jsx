import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import RootLayout from './layouts/RootLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import Login from './pages/Login';
import Register from './pages/Register';

// Providers
import { TaskProvider } from './context/TaskContext';

/**
 * Router Configuration
 */
const router = createBrowserRouter([
    {
        path: '/',
        element: (
            // Wrap Root Layout with TaskProvider so all auth pages have access to tasks
            <TaskProvider>
                <RootLayout />
            </TaskProvider>
        ),
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'tasks', element: <Tasks /> },
            { path: 'projects', element: <Projects /> },
        ],
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
        ],
    },
]);

export default router;
