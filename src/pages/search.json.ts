import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// Build-time search index consumed by the Search component on the client.
export const GET: APIRoute = async () => {
  const posts = await getCollection("blog");

  const index = posts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      slug: post.id,
      pubDate: post.data.pubDate.toISOString(),
      tags: post.data.tags,
      // Strip Markdown so the body is searchable as plain text.
      // Tags are prepended so they're matchable too.
      body: (post.data.tags.join(" ") + " " + (post.body ?? ""))
        .replace(/```[\s\S]*?```/g, " ") // fenced code
        .replace(/`[^`]*`/g, " ") // inline code
        .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> text
        .replace(/[#>*_~`-]/g, " ") // leftover md symbols
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 3000),
    }));

  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json" },
  });
};
