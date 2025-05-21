import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Supply Tracker",
        short_name: "Tracker",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#3eaf7c",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    port: 5050, // 使用するポート番号を指定
    host: "0.0.0.0", // すべてのIPアドレスからアクセスを受け入れる
    watch: {
      usePolling: true, // ファイル変更の検出をポーリング方式にする（特にDocker環境で必要）
    },
  },
});
