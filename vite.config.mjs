import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main:      resolve(__dirname, 'index.html'),
        contact:   resolve(__dirname, 'contact.html'),
        about:     resolve(__dirname, 'about/about.html'),
        work:      resolve(__dirname, 'work/work.html'),
        comptia:   resolve(__dirname, 'comptia/comptia.html'),
        learning:  resolve(__dirname, 'comptia/learning.html'),
        microsoft: resolve(__dirname, 'comptia/microsoft.html'),
      }
    }
  },
  plugins: [
      viteStaticCopy({
        targets: [
          // Your existing lanyard copy rule
          { src: 'lanyard-project/dist', dest: 'lanyard-project' },
          
          // ADD THIS NEW LINE to force copy the certifications folder
          { src: 'certifications', dest: '' } 
        ]
      })
    ]
})
