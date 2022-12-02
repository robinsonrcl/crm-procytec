import { defineConfig } from "vite"
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from "@vitejs/plugin-vue"
import path from "path"

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        ElementPlusResolver()
      ],
      globalComponentsDeclaration: true,
      dts: true,
      customLoaderMatcher: id => id.endsWith('.md'),
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})