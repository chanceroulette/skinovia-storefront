import Link from 'next/link';
import { formatPrice } from '@/lib/shopify';

export default function ProductCard({ product }) {
  const img = product.featuredImage?.url;
  return (
    <Link className="card" href={`/products/${product.handle}`}>
      <div className="media">
        {img ? <img src={img} alt={product.featuredImage?.altText || product.title} /> : null}
      </div>
      <div className="info">
        <div className="t">{product.title}</div>
        <div className="p">{formatPrice(product.priceRange?.minVariantPrice)}</div>
      </div>
    </Link>
  );
}
