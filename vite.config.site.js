import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


/**
 * 构建文档
*/
export default defineConfig({
  plugins: [vue()],
  base: '/videojs-plugin-marker/',
  build: {
    outDir: "docs"
  }
})