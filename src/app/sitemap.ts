import { MetadataRoute } from 'next'
import { getPaginaInicial, getPaginaArenas } from '@/src/services/strapi.service'

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eliteplayapp.com').replace(/\/$/, '');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const languages = ['es', 'pt-br']
  const [homeData, arenasData] = await Promise.all([getPaginaInicial(), getPaginaArenas()]);

  const routes = [
    { path: '', data: homeData, priority: 1.0 },
    { path: '/arenas', data: arenasData, priority: 0.8 }
  ]

  return routes.flatMap(route => 
    languages.map(lang => ({
      url: `${BASE_URL}${route.path}${lang === 'es' ? '' : `?lang=${lang}`}`,
      lastModified: route.data?.updatedAt ? new Date(route.data.updatedAt) : new Date(),
      changeFrequency: 'daily',
      priority: route.priority,
    }))
  )
}
