import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/shopify';

export default function ProductCard({ product }) {
  const img = product.featuredImage?.url;
  return (
    <Link className="card" href={`/products/${product.handle}`}>
      <div className="media">
        {img ? (
          <Image
            src={img}
            alt={product.featuredImage?.altText || product.title}
            fill
            sizes="(max-width:780px) 100vw, 300px"
            style={{ objectFit: 'cover' }}
          />
        ) : null}
      </div>
      <div className="info">
        <div className="t">{product.title}</div>
        <div className="p">{formatPrice(product.priceRange?.minVariantPrice)}</div>
      </div>
    </Link>
  );
}
