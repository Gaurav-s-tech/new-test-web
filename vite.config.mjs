import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main:       resolve(__dirname, 'index.html'),
        about:      resolve(__dirname, 'about.html'),
        contact:    resolve(__dirname, 'contact.html'),
        aboutPage:  resolve(__dirname, 'about/about.html'),
        work:       resolve(__dirname, 'work/work.html'),
        comptia:    resolve(__dirname, 'comptia/comptia.html'),
        learning:   resolve(__dirname, 'comptia/learning.html'),
        microsoft:  resolve(__dirname, 'comptia/microsoft.html'),
      }
    }
  },
  plugins: [
    viteStaticCopy({
      targets: [
        // Copy the already-built lanyard sub-project verbatim so the iframe works
        { src: 'lanyard-project/dist', dest: 'lanyard-project' }
      ]
    })
  ]
})
