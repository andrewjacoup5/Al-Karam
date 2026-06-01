import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Custom plugin to serve the root-level 'assets' folder in dev mode and copy it during build
function serveRootAssets() {
  return {
    name: 'serve-root-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Decode URL to handle spaces and arabic characters
        const decodedUrl = decodeURIComponent(req.url);
        if (decodedUrl.startsWith('/assets/')) {
          const filePath = path.join(__dirname, decodedUrl);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            let contentType = 'application/octet-stream';
            if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
            else if (ext === '.png') contentType = 'image/png';
            else if (ext === '.gif') contentType = 'image/gif';
            else if (ext === '.svg') contentType = 'image/svg+xml';
            else if (ext === '.pdf') contentType = 'application/pdf';
            else if (ext === '.docx') contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            
            res.writeHead(200, { 'Content-Type': contentType });
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        next();
      });
    },
    closeBundle() {
      const src = path.join(__dirname, 'assets');
      const dest = path.join(__dirname, 'dist', 'assets');
      if (fs.existsSync(src)) {
        console.log('Copying assets to dist...');
        fs.mkdirSync(dest, { recursive: true });
        fs.cpSync(src, dest, { recursive: true });
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), serveRootAssets()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 800,
    cssCodeSplit: true,
    sourcemap: false
  }
})
