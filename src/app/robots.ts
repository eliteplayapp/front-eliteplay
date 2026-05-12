import { MetadataRoute } from 'next'

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eliteplayapp.com').replace(/\/$/, '');
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/admin/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
