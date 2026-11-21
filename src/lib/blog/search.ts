export type SearchablePost = { title: string; description: string; topic: string };

export function filterBlogPosts<T extends SearchablePost>(posts: readonly T[], query: string, topic: string): T[] {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return posts.filter(post => (topic === "All guides" || post.topic === topic) &&
    terms.every(term => `${post.title} ${post.description} ${post.topic}`.toLocaleLowerCase().includes(term)));
}
