import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	resolve: {
		alias: {
			'@delivery/shared': resolve(__dirname, '../shared/src'),
			'@delivery/ui': resolve(__dirname, '../ui'),
		},
	},
	server: {
		port: 5174,
		proxy: {
			'/api': {
				target: 'http://localhost:3333',
				changeOrigin: true,
			},
		},
	},
})
