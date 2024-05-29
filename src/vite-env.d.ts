import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@css': path.resolve(__dirname, 'src/components/css'),
            '@data': path.resolve(__dirname, 'src/data'),
            "@fonts": path.resolve(__dirname, 'src/assets/fonts'),
        },
    },
    plugins: [react()]
})
