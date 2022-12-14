import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), htmlPlugin(loadEnv(mode, "."))],
  resolve: {
    alias: {
      "/assets": "src/assets",
    },
  },
  build: {
    minify: true,
    chunkSizeWarningLimit: 1500,
    // rollupOptions: {
    //   output: {
    //     manualChunks: (id) => {
    //       if (id.includes("node_modules"))
    //         return id
    //           .toString()
    //           .split("node_modules/")[1]
    //           .split("/")[0]
    //           .toString();
    //     },
    //   },
    // },
  },
}));

/**
 * Replace env variables in index.html
 * @see https://github.com/vitejs/vite/issues/3105#issuecomment-939703781
 * @see https://vitejs.dev/guide/api-plugin.html#transformindexhtml
 */
function htmlPlugin(env: ReturnType<typeof loadEnv>) {
  return {
    name: "html-transform",
    transformIndexHtml: {
      enforce: "pre" as const,
      transform: (html: string): string =>
        html.replace(/%(.*?)%/g, (match, p1) => env[p1] ?? match),
    },
  };
}
