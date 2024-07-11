import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from "vite-plugin-svgr";

const env = loadEnv('', process.cwd())

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: parseInt(env.VITE_PORT) || 3000, // you can replace this port with any port
  },
  resolve: {
    alias: {
      // This is needed to make `@prisma/client` work
      // See: https://github.com/prisma/prisma/issues/12504
      ".prisma/client/index-browser": "../../node_modules/.prisma/client/index-browser.js"
    }
  }
});
