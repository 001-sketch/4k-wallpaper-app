import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wallscape - Premium 4K Wallpapers",
    short_name: "Wallscape",
    description:
      "Discover stunning 4K, 5K, and 8K wallpapers. Curated collections for every screen.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0d14",
    theme_color: "#0d0d14",
    icons: [
      {
        src: "/icon-light-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
