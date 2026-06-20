import { getProducts } from '@/lib/shopify';

export const revalidate = 3600;

export default async function sitemap() {
  const base = 'https://skinovia.ae';
  const now = new Date();
  const staticPaths = ['', '/shop', '/about', '/faq', '/contact', '/privacy-policy', '/terms', '/refund-returns', '/shipping-policy'];
  const staticEntries = staticPaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.7
  }));

  let products = [];
  try { products = await getProducts(100); } catch { products = []; }
  const productEntries = products.map((p) => ({
    url: `${base}/products/${p.handle}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  return [...staticEntries, ...productEntries];
}
