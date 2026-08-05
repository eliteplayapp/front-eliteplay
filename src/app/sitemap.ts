import { MetadataRoute } from 'next'

export const dynamic = 'force-static';

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eliteplayapp.com').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = ['es', 'pt-br', 'en']

  const routes = [
    { path: '', priority: 1.0 as const },
    { path: '/arenas', priority: 0.8 as const },
  ]

  return routes.flatMap(route =>
    languages.map(lang => ({
      url: `${BASE_URL}${route.path}${lang === 'es' ? '' : `?lang=${lang}`}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route.priority,
    }))
  )
}
