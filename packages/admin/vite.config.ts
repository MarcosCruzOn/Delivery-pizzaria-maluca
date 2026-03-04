import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	server: {
		port: 5174,
		proxy: {
			'/api': {
				target: 'http://localhost:3333',
				changeOrigin: true,
			},
		},
	},
	publicDir: resolve(__dirname, '../ui/public'),
})
