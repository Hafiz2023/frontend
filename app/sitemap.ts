import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zatraders.com';
  
  // In a real application, you might fetch dynamic routes from a CMS here
  const staticRoutes = [
    '',
    '/about-us',
    '/products',
    '/printed-tags',
    '/woven-labels',
    '/leather-patches',
    '/paper-bags',
    '/contact-us',
    '/faq',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return staticRoutes;
}
