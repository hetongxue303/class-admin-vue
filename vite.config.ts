import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
    plugins: [
        vue(),
        WindiCSS()
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@views': resolve(__dirname, 'src/views'),
            '@layout': resolve(__dirname, 'src/layout'),
            '@components': resolve(__dirname, 'src/components')
        }
    },
    server: {
        host: '127.0.0.1',
        port: 5173,
        cors: true,
        open: false,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '')
            }
        }
    }
})