import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@images': '/src/assets/images',
        },
    },
    server: {
        headers: {
            'Content-Security-Policy': "script-src 'self' 'unsafe-inline';",
        },
    },
});
