import { getProduct, getProducts, formatPrice } from '@/lib/shopify';
import ProductGallery from '@/components/ProductGallery';
import ProductCard from '@/components/ProductCard';
import BuyBox from '@/components/BuyBox';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const product = await getProduct(params.handle);
  if (!product) return { title: 'Product — Skinovia' };
  const desc = (product.description || 'Advanced anti-aging skincare by Skinovia.').slice(0, 160);
  const img = product.featuredImage?.url;
  return {
    title: `${product.title} — Skinovia`,
    description: desc,
    alternates: { canonical: `/products/${product.handle}` },
    openGraph: {
      title: product.title,
      description: desc,
      type: 'website',
      url: `https://skinovia.ae/products/${product.handle}`,
      images: img ? [{ url: img }] : undefined
    }
  };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.handle);

  if (!product) {
    return (
      <main className="shop">
        <h1 className="sec-h">Product not found</h1>
        <p className="lead">This product isn’t available yet. Please check back soon.</p>
      </main>
    );
  }

  const variant = product.variants?.edges?.[0]?.node;
  const price = product.priceRange?.minVariantPrice;
  const priceText = formatPrice(price);

  let images = product.images?.edges?.map((e) => e.node).filter((n) => n && n.url) || [];
  if (images.length === 0 && product.featuredImage?.url) images = [product.featuredImage];

  let related = [];
  try {
    related = (await getProducts(8)).filter((p) => p.handle !== product.handle).slice(0, 4);
  } catch {
    related = [];
  }

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: images.map((im) => im.url),
    description: product.description || '',
    brand: { '@type': 'Brand', name: 'Skinovia' },
    offers: {
      '@type': 'Offer',
      price: price ? Number(price.amount).toFixed(2) : undefined,
      priceCurrency: price?.currencyCode || 'AED',
      availability: variant?.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://skinovia.ae/products/${product.handle}`
    }
  };

  return (
    <>
      <main className="pdp">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
        <ProductGallery images={images} title={product.title} />
        <div>
          <h1>{product.title}</h1>
          <div className="price">{priceText}</div>
          <div className="trustline">
            <span>✦ Authentic &amp; sealed</span>
            <span>✦ 14-day returns</span>
            <span>✦ Next-day UAE delivery</span>
          </div>
          <div className="desc" dangerouslySetInnerHTML={{ __html: product.descriptionHtml || '' }} />
          <div style={{ marginTop: 28 }}>
            <BuyBox variantId={variant?.id} available={variant?.availableForSale} price={priceText} />
          </div>
        </div>
      </main>

      {related.length > 0 && (
        <section className="block">
          <p className="lbl">YOU MAY ALSO LIKE</p>
          <div className="pgrid">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </>
  );
}
