'use client';
import { useState } from 'react';
import { trackInitiateCheckout } from '@/lib/track';

export default function AddToCart({ variantId, available, productTitle, amount, currency }) {
  const [loading, setLoading] = useState(false);

  async function buy() {
    if (!variantId) return;
    setLoading(true);

    // Analytics is best-effort: never let it block or break the purchase.
    try {
      trackInitiateCheckout({ id: variantId, title: productTitle, amount, currency, quantity: 1 });
    } catch {}

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId })
      });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; }
      else { setLoading(false); alert('Checkout is not available yet.'); }
    } catch {
      setLoading(false);
      alert('Something went wrong. Please try again.');
    }
  }

  return (
    <button className="btn" onClick={buy} disabled={loading || available === false}>
      {available === false ? 'Sold out' : loading ? 'Loading…' : 'Add to cart'}
    </button>
  );
}
