
import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
  ],
  npmClient: 'npm',
  proxy: {
    '/api': {
      target: 'https://www.partechgss.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
