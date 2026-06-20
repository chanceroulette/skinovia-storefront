'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images, title }) {
  const imgs = Array.isArray(images) ? images.filter((im) => im && im.url) : [];
  const [i, setI] = useState(0);
  if (!imgs.length) return <div className="gallery" />;
  const main = imgs[Math.min(i, imgs.length - 1)];
  return (
    <div className="gallery-wrap">
      <div className="gallery">
        <Image
          src={main.url}
          alt={main.altText || title}
          fill
          sizes="(max-width:880px) 100vw, 600px"
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      {imgs.length > 1 && (
        <div className="thumbs">
          {imgs.map((im, idx) => (
            <button
              key={idx}
              className={`thumb${idx === i ? ' on' : ''}`}
              onClick={() => setI(idx)}
              aria-label={`View image ${idx + 1}`}
            >
              <Image src={im.url} alt={im.altText || `${title} ${idx + 1}`} fill sizes="80px" style={{ objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
