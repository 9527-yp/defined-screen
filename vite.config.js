import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import legacy from "@vitejs/plugin-legacy";

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    legacy({
      targets: ["ie>=11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"], //解决跨域警告
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8081,
  },
  build: {
    target: ['es2015', 'chrome63'],
    // 在 debug 构建中不使用 minify
    minify: false,
    // 在 debug 构建中生成 sourcemap
    sourcemap: true,
  },
})
