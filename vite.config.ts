import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		emptyOutDir: false,
		lib: {
			entry: 'src/index.ts',
			name: 'Anime',
			fileName: format => `Anime.${format}.js`
		},
		rollupOptions: {
			output: {
				dir: resolve(__dirname, 'dist'),
				format: 'umd'
			}
		}
	}
})
