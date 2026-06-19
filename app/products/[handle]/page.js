import { getProduct, formatPrice } from '@/lib/shopify';
import AddToCart from '@/components/AddToCart';

export async function generateMetadata({ params }) {
  const product = await getProduct(params.handle);
  return { title: product ? `${product.title} — Skinovia` : 'Product — Skinovia' };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.handle);

  if (!product) {
    return (
      <main className="shop">
        <h1 className="sec-h">Product not found</h1>
        <p className="lead">This product isn’t available yet. Connect the Storefront API or check back soon.</p>
      </main>
    );
  }

  const img = product.featuredImage?.url;
  const variant = product.variants?.edges?.[0]?.node;

  return (
    <main className="pdp">
      <div className="gallery">
        {img ? <img src={img} alt={product.featuredImage?.altText || product.title} /> : null}
      </div>
      <div>
        <h1>{product.title}</h1>
        <div className="price">{formatPrice(product.priceRange?.minVariantPrice)}</div>
        <div className="desc" dangerouslySetInnerHTML={{ __html: product.descriptionHtml || '' }} />
        <div style={{ marginTop: 32 }}>
          <AddToCart variantId={variant?.id} available={variant?.availableForSale} />
        </div>
      </div>
    </main>
  );
}
