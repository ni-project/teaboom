import { defineConfig } from 'vite';
import { resolve, extname, relative } from 'path';
import fs from 'fs';

function getHtmlTemplates(dir, inputEntries = {}) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = resolve(dir, file);
    const stat = fs.statSync(filePath);

    if (file === 'node_modules' || file === 'dist') continue;

    if (stat.isDirectory()) {
      getHtmlTemplates(filePath, inputEntries);
    } else if (extname(file) === '.html') {
      const relativePath = relative(import.meta.dirname, filePath);
      const entryName = relativePath.replace(/\.html$/, '');

      inputEntries[entryName] = filePath;
    }
  }

  return inputEntries;
}

export default defineConfig({
  resolve: {
    alias: {
      '@styles': resolve(import.meta.dirname, 'src/styles'),
      '@assets': resolve(import.meta.dirname, 'src/assets'),
      '@images': resolve(import.meta.dirname, 'src/assets/images'),
    },
  },
  build: {
    rollupOptions: {
      input: getHtmlTemplates(import.meta.dirname),
    },
  },
  server: {
    port: 3000,
    open: true
  }
});