'use client';
import { useState } from 'react';

export default function BuyBox({ variantId, available, price }) {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const sold = available === false;

  async function buy() {
    if (!variantId || loading || sold) return;
    setLoading(true);
    setErr('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId, quantity: qty })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
        setErr('Checkout isn’t available right now. Please try again or contact us on WhatsApp.');
      }
    } catch {
      setLoading(false);
      setErr('Something went wrong. Please try again.');
    }
  }

  const label = sold ? 'Sold out' : loading ? 'Loading…' : 'Add to cart';

  return (
    <>
      <div className="buybox">
        <div className="qty">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={sold}>−</button>
          <span>{qty}</span>
          <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(10, q + 1))} disabled={sold}>+</button>
        </div>
        <button className="btn buy" onClick={buy} disabled={loading || sold}>{label}</button>
      </div>
      {err && <p className="buyerr">{err}</p>}

      <div className="buybar">
        <span className="buybar-price">{price}</span>
        <button className="btn" onClick={buy} disabled={loading || sold}>{sold ? 'Sold out' : loading ? '…' : 'Add to cart'}</button>
      </div>
    </>
  );
}
