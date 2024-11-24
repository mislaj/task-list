import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
declare const __dirname: string; 

export default defineConfig({
  plugins: [react()],
  css:{
    preprocessorOptions:{
      scss:{
        // additionalData: `@import "./src/styles/_variables.scss";`,
      }
    }
  },
  resolve: {
    alias: {
      // This is the alias for the src directory
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      'config': path.resolve(__dirname, './src/config'),
      '@utils': path.resolve(__dirname, './src/utils'),
    }
  }
})
