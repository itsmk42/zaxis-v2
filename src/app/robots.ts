import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/account/'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/admin/', '/api/', '/account/'],
            },
        ],
        sitemap: 'https://zaxisstudio.in/sitemap.xml',
    };
}
