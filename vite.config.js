import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    // 🚨 THIS IS THE FIX: Tell Vite your site lives in a sub-folder
    base: '/reogheritage/public/build/',

    server: {
        host: '127.0.0.1', 
        port: 5173, 
        strictPort: false, 
        cors: {
            origin: 'http://127.0.0.1:8000', 
            methods: ['GET', 'HEAD', 'PUT', 'POST'],
            credentials: true,
        },
        hmr: {
            host: '127.0.0.1',
            port: 5173,
        }
    },

    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.tsx'
            ],
            refresh: true,
        }),
        
        react(),
    ],
});