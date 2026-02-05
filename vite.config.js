import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  // 👇 ده السطر اللي هيصلح الصفحة البيضاء
  base: '/', 
  
  plugins: [
    react(),
    visualizer({ 
      filename: 'stats.html',
      gzipSize: true 
    })
  ],
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-pdf': ['jspdf', 'docx', 'html2pdf.js'],
          'vendor-icons': ['lucide-react']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})