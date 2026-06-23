import { getCollection } from "astro:content";

/** Turn a display tag ("Web Dev") into a URL-safe slug ("web-dev"). */
export function slugifyTag(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/** All blog posts, newest first. */
export async function getPosts() {
  return (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export interface TagInfo {
  tag: string;
  slug: string;
  count: number;
}

/** Unique tags across all posts, with counts, sorted by frequency then name. */
export async function getAllTags(): Promise<TagInfo[]> {
  const posts = await getPosts();
  const map = new Map<string, TagInfo>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = slugifyTag(tag);
      const existing = map.get(slug);
      if (existing) existing.count++;
      else map.set(slug, { tag, slug, count: 1 });
    }
  }

  return [...map.values()].sort(
    (a, b) => b.count - a.count || a.tag.localeCompare(b.tag),
  );
}
