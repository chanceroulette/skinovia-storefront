import Image from 'next/image';
import { getProduct, formatPrice } from '@/lib/shopify';
import AddToCart from '@/components/AddToCart';

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

  const img = product.featuredImage?.url;
  const variant = product.variants?.edges?.[0]?.node;
  const price = product.priceRange?.minVariantPrice;

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: img ? [img] : [],
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
    <main className="pdp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <div className="gallery">
        {img ? (
          <Image
            src={img}
            alt={product.featuredImage?.altText || product.title}
            fill
            sizes="(max-width:880px) 100vw, 600px"
            style={{ objectFit: 'cover' }}
            priority
          />
        ) : null}
      </div>
      <div>
        <h1>{product.title}</h1>
        <div className="price">{formatPrice(price)}</div>
        <div className="trustline">
          <span>✦ Authentic &amp; sealed</span>
          <span>✦ 14-day returns</span>
          <span>✦ Next-day UAE delivery</span>
        </div>
        <div className="desc" dangerouslySetInnerHTML={{ __html: product.descriptionHtml || '' }} />
        <div style={{ marginTop: 32 }}>
          <AddToCart variantId={variant?.id} available={variant?.availableForSale} />
        </div>
      </div>
    </main>
  );
}
