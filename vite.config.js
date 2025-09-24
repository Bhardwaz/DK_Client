import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
      VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "datekarle",
        short_name: "Spark",
        description: "Date Karle Native App",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#317EFB",
        icons: [
          { src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
          { src: "/web-app-manifest-192x192.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
        ]
      }
    })
  ],
})
