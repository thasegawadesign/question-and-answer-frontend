import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "一問一答メーカー",
    short_name: "一問一答メーカー",
    description: "一問一答メーカー",
    start_url: "/",
    display: "standalone",
    background_color: "#1f2937",
    theme_color: "#1f2937",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
