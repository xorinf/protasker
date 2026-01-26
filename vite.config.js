import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    // Set root to frontend directory
    root: 'frontend',

    // Build configuration
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'frontend/index.html'),
            },
        },
    },

    // Development server configuration
    server: {
        port: 5173,
        open: true,
        cors: true,
    },

    // Path resolution
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'frontend/src'),
            '@js': path.resolve(__dirname, 'frontend/src/js'),
            '@styles': path.resolve(__dirname, 'frontend/src/styles'),
        },
    },

    // Enable CSS preprocessing if needed
    css: {
        devSourcemap: true,
    },
});
