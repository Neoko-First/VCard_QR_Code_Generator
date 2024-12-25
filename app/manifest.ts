import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ToolBox",
    short_name: "ToolBox",
    description: "All your tools in one place",
    theme_color: "#0169EA",
    background_color: "#0D1826",
    display: "standalone",
    orientation: "portrait",
    scope: "/",
    start_url: "/",
    icons: [
      { src: "16x16.png", sizes: "16x16", type: "image/png" },
      { src: "32x32.png", sizes: "32x32", type: "image/png" },
      { src: "72x72.png", sizes: "72x72", type: "image/png" },
      { src: "96x96.png", sizes: "96x96", type: "image/png" },
      { src: "120x120.png", sizes: "120x120", type: "image/png" },
      { src: "128x128.png", sizes: "128x128", type: "image/png" },
      { src: "144x144.png", sizes: "144x144", type: "image/png" },
      { src: "152x152.png", sizes: "152x152", type: "image/png" },
      { src: "180x180.png", sizes: "180x180", type: "image/png" },
      { src: "192x192.png", sizes: "192x192", type: "image/png" },
      { src: "384x384.png", sizes: "384x384", type: "image/png" },
      {
        src: "512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    id: "ToolBox",
    shortcuts: [],
    categories: ["utilities"],
    dir: "ltr",
    lang: "fr",
    display_override: [
      "window-controls-overlay",
      "standalone",
      "minimal-ui",
      "fullscreen",
      "browser",
    ],
    launch_handler: {
      client_mode: "navigate-new",
    },
  };
}
