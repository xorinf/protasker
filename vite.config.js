import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    // Build configuration
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: true,
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
