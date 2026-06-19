export const metadata = { title: 'Shipping Policy — Skinovia' };

export default function Shipping() {
  return (
    <>
      <div className="phead"><p className="over">LEGAL</p><h1>Shipping Policy</h1></div>
      <main className="doc">
        <p style={{ color: 'var(--earth)', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 12 }}>Last updated: 19 June 2026</p>
        <h2>1. Where we deliver</h2><p>Across all seven Emirates of the UAE. International shipping: <span className="todo">[Confermare — DA COMPLETARE]</span>.</p>
        <h2>2. Processing</h2><p>Orders are processed within 1–2 business days (Sun–Thu, excluding public holidays). You’ll receive a confirmation email on dispatch.</p>
        <h2>3. Delivery times (UAE)</h2><ul><li>Dubai: typically next business day.</li><li>Other Emirates: typically 1–3 business days.</li></ul>
        <h2>4. Costs</h2><p>Free on orders over <span className="todo">[soglia AED — DA COMPLETARE]</span>. Below the threshold, a flat fee of <span className="todo">[importo AED — DA COMPLETARE]</span> applies, shown at checkout.</p>
        <h2>5. Tracking</h2><p>You’ll receive tracking by email. Questions: <a href="mailto:support@skinovia.ae">support@skinovia.ae</a>.</p>
        <h2>6. Damaged in transit</h2><p>Contact us within 7 days with photos and we’ll resolve it under our Refunds &amp; Returns Policy.</p>
        <h2>7. Contact</h2><p><a href="mailto:support@skinovia.ae">support@skinovia.ae</a></p>
      </main>
    </>
  );
}
