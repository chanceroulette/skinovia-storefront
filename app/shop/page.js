import ProductCard from '@/components/ProductCard';
import { getProducts, shopifyConfigured } from '@/lib/shopify';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Shop — Skinovia',
  description: 'Shop Skinovia anti-aging serums and beauty-tech. Authentic, sealed, with next-day delivery across the UAE.',
  alternates: { canonical: '/shop' }
};

export default async function Shop() {
  const products = await getProducts(48);

  return (
    <main className="shop">
      <p className="lbl">THE COLLECTION</p>
      <h1 className="sec-h">Skincare, engineered.</h1>
      {products.length > 0 ? (
        <div className="pgrid">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="empty">
          {shopifyConfigured()
            ? 'New products are on their way — check back very soon.'
            : 'Storefront not connected yet. Add SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN in Vercel to load products.'}
        </div>
      )}
    </main>
  );
}
