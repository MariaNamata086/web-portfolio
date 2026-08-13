import type { MetadataRoute } from 'next';
import { publishedNotes } from '@/content/notes';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/contact', '/notes'].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: p === '' ? 1 : 0.8,
  }));
  const posts = publishedNotes.map((n) => ({
    url: `${site.url}/notes/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));
  return [...routes, ...posts];
}
