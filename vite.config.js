import {
    defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/',
    server: {
        port: 3000,
        proxy: {
            // En desarrollo, redirige todas las llamadas /api/* al servidor Express
            '/api': {
                target: 'http://localhost:3002',
                changeOrigin: true,
            }
        }
    },
    build: {
        outDir: 'dist'
    }
})