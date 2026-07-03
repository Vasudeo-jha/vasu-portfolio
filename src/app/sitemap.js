import { projectsData } from '@/lib/data';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://vasujha.dev';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  // Project pages
  const projectPages = projectsData.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages];
}
