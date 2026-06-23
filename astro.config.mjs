// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.faizdotid.me/",
  integrations: [mdx(), sitemap()],

  markdown: {
    // Drive code highlighting from CSS variables so it follows the
    // monochrome light/dark theme (see --astro-code-* in global.css).
    shikiConfig: { theme: "css-variables" },
  },

  fonts: [
    // Body text — matches faizdotid.me.
    // 400 body, 500 UI (nav/eyebrow/buttons/tags), 600 strong & search highlights.
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-sans",
      fallbacks: ["system-ui", "sans-serif"],
      weights: [400, 500, 600],
      styles: ["normal"],
      subsets: ["latin"],
    },
    // Display / headings — matches faizdotid.me.
    // 300 blockquote, 500 headings/brand/titles, 600 highlighted text in titles.
    {
      provider: fontProviders.google(),
      name: "Space Grotesk",
      cssVariable: "--font-grotesk",
      fallbacks: ["system-ui", "sans-serif"],
      weights: [300, 500, 600],
      styles: ["normal"],
      subsets: ["latin"],
    },
    // Code — only the regular weight is used (code blocks & kbd).
    {
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      fallbacks: ["monospace"],
      weights: [400],
      subsets: ["latin"],
    },
  ],

  adapter: cloudflare(),
});