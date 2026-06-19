'use client';
import { useState } from 'react';

export default function AddToCart({ variantId, available }) {
  const [loading, setLoading] = useState(false);

  async function buy() {
    if (!variantId) return;
    setLoading(true);
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
