import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import viteTSConfigPaths from 'vite-tsconfig-paths';

const port = 3000;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTSConfigPaths(), svgr()],
  server: {
    port: port,
    strictPort: true,
  },
  preview: {
    port: port,
    strictPort: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTest.ts'],
    css: true,
  },
});
