import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/getProducts';
import { getBlogCount } from '@/lib/getBlogCount';
import { getProductUrl } from '@/utils/getProductUrl';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blackbellstudio.pl';
  
  // Get all products
  const products = await getProducts();
  
  // Get blog count
  const blogCount = await getBlogCount();
  
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/regulations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
  
  // Blog route (only if there are posts)
  const blogRoutes: MetadataRoute.Sitemap = blogCount > 0
    ? [
        {
          url: `${baseUrl}/blog`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        },
      ]
    : [];
  
  // Product routes from all three categories
  const productRoutes: MetadataRoute.Sitemap = products.map((product: any) => ({
    url: `${baseUrl}${getProductUrl(product)}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  return [...staticRoutes, ...blogRoutes, ...productRoutes];
}

