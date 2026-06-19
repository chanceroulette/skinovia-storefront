export const metadata = { title: 'FAQ — Skinovia' };

const faqs = [
  ['Where do you deliver, and how long does it take?', 'We deliver across all seven Emirates. In-stock orders are typically delivered next-day within Dubai and within 1–3 business days elsewhere in the UAE.'],
  ['How much is shipping?', 'Standard delivery is free on orders over [soglia AED — DA COMPLETARE]. Below that, a flat fee applies and is shown at checkout. Cash on delivery may be available depending on your area.'],
  ['What payment methods do you accept?', 'Major credit and debit cards (Visa, Mastercard) and other methods enabled at checkout. All prices are in AED and include VAT where applicable.'],
  ['Can I return a product?', 'Unused items in their original, sealed packaging can be returned within 14 days. For hygiene reasons, opened personal-care items and consumables cannot be returned unless faulty.'],
  ['Is there a warranty?', 'Electronic devices carry a manufacturer warranty of [durata — DA COMPLETARE] against manufacturing defects from delivery. It does not cover misuse, accidental damage or normal wear.'],
  ['Are the products safe? Any contraindications?', 'Our devices are wellness and cosmetic skincare tools, not medical devices. Follow the included instructions and avoid use if pregnant, with a pacemaker, epilepsy or active skin conditions, unless cleared by your doctor.'],
  ['How do I track my order?', 'Once dispatched you’ll receive a confirmation email with tracking. You can also reach us at support@skinovia.ae with your order number.']
];

export default function FAQ() {
  return (
    <>
      <div className="phead">
        <p className="over">HELP CENTRE</p>
        <h1>Frequently<br />asked questions.</h1>
      </div>
      <main className="doc">
        {faqs.map(([q, a]) => (
          <details key={q} style={{ borderBottom: '1px solid var(--line)', padding: '20px 0' }}>
            <summary style={{ cursor: 'pointer', fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: '#EFE7DA' }}>{q}</summary>
            <p style={{ marginTop: 14 }}>{a}</p>
          </details>
        ))}
      </main>
    </>
  );
}
