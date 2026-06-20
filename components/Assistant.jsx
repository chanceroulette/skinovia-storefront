'use client';
import { useState, useRef, useEffect } from 'react';

const WA = '971543481109';
const WA_LINK = `https://wa.me/${WA}`;

// Knowledge base — rule-based for now. Upgrade path: replace `respond()` with a
// call to /api/chat (LLM grounded on this same content) without changing the UI.
const KB = [
  {
    keys: ['ship', 'shipping', 'deliver', 'delivery', 'how long', 'arrive', 'emirate', 'dubai', 'abu dhabi', 'sharjah', 'when will', 'days'],
    answer:
      'We deliver across all seven Emirates. Dubai is typically <b>next business day</b>; other Emirates 1–3 business days. You get a tracking link by email on dispatch. <a href="/shipping-policy">Shipping policy →</a>'
  },
  {
    keys: ['return', 'refund', 'exchange', 'money back', 'send back', 'cancel'],
    answer:
      'You can return <b>unused, sealed</b> items within <b>14 days</b>. Faulty or wrong items are replaced or refunded. <a href="/refund-returns">Refunds &amp; returns →</a>'
  },
  {
    keys: ['track', 'tracking', 'where is my order', 'order status', 'status', 'shipped', 'dispatch'],
    answer:
      'As soon as your order ships we email you a <b>tracking link</b>. If you can’t find it, message us on WhatsApp with your order number and we’ll check it for you: <a href="' +
      WA_LINK +
      '" target="_blank" rel="noopener noreferrer">Chat on WhatsApp →</a>'
  },
  {
    keys: ['pay', 'payment', 'card', 'cash', 'cod', 'tabby', 'tamara', 'instal', 'vat', 'price', 'cost', 'tax'],
    answer:
      'Checkout is secure with card payments, and prices <b>include 5% VAT</b>. Cash on delivery and instalments (Tabby/Tamara) are coming soon.'
  },
  {
    keys: ['product', 'serum', 'lash', 'brow', 'hair', 'sell', 'catalog', 'catalogue', 'shop', 'buy', 'ingredient', 'skincare', 'anti', 'aging', 'ageing'],
    answer:
      'We craft anti-aging skincare and beauty-tech — including a peptide <b>lash &amp; brow serum</b> and a copper-peptide <b>hair density serum</b>. Browse everything in the <a href="/shop">shop →</a>'
  },
  {
    keys: ['human', 'agent', 'contact', 'speak', 'talk', 'phone', 'call', 'email', 'whatsapp', 'support', 'someone'],
    answer:
      'Our team is happy to help: <a href="mailto:admin@skinovia.ae">admin@skinovia.ae</a> or <a href="' +
      WA_LINK +
      '" target="_blank" rel="noopener noreferrer">WhatsApp +971 54 348 1109</a> (Sun–Thu, 9:00–18:00 GST).'
  },
  {
    keys: ['about', 'who are you', 'company', 'brand', 'where are you', 'located', 'authentic', 'genuine', 'original'],
    answer:
      'Skinovia is a Dubai-based skincare house operated by <b>Opera Engineering FZ-LLC</b>. Every product is authentic and sealed.'
  },
  {
    keys: ['hi', 'hello', 'hey', 'salam', 'marhaba', 'ciao', 'hallo'],
    answer: 'Hello! How can I help today? Ask me about shipping, returns, tracking, products or payment.'
  }
];

const QUICK = [
  { label: 'Shipping', q: 'shipping' },
  { label: 'Returns', q: 'returns' },
  { label: 'Track my order', q: 'tracking' },
  { label: 'Products', q: 'products' },
  { label: 'Talk to a human', q: 'talk to a human' }
];

function respond(text) {
  const t = (text || '').toLowerCase();
  for (const item of KB) {
    if (item.keys.some((k) => t.includes(k))) return item.answer;
  }
  return (
    'I’m not certain about that one yet — our team can help directly on <a href="' +
    WA_LINK +
    '" target="_blank" rel="noopener noreferrer">WhatsApp</a> or at <a href="mailto:admin@skinovia.ae">admin@skinovia.ae</a>.'
  );
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', html: 'Hi, I’m the Skinovia assistant. How can I help? Try one of the options below or type your question.' }
  ]);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open]);

  function send(text) {
    const q = (text != null ? text : input).trim();
    if (!q) return;
    setMessages((m) => [...m, { from: 'user', text: q }, { from: 'bot', html: respond(q) }]);
    setInput('');
  }

  return (
    <>
      <button className="asst-fab" aria-label="Open assistant" onClick={() => setOpen((v) => !v)}>
        {open ? (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1z" fill="currentColor"/></svg>
        )}
      </button>

      <div className={`asst-panel${open ? ' open' : ''}`} role="dialog" aria-label="Skinovia assistant">
        <div className="asst-head">
          <div>
            <div className="asst-title">Skinovia Assistant</div>
            <div className="asst-sub">Usually replies instantly</div>
          </div>
          <button className="asst-x" aria-label="Close" onClick={() => setOpen(false)}>×</button>
        </div>

        <div className="asst-body" ref={bodyRef}>
          {messages.map((m, i) =>
            m.from === 'user' ? (
              <div key={i} className="am am-user">{m.text}</div>
            ) : (
              <div key={i} className="am am-bot" dangerouslySetInnerHTML={{ __html: m.html }} />
            )
          )}
        </div>

        <div className="asst-quick">
          {QUICK.map((qr) => (
            <button key={qr.label} onClick={() => send(qr.q)}>{qr.label}</button>
          ))}
        </div>

        <form
          className="asst-input"
          onSubmit={(e) => { e.preventDefault(); send(); }}
        >
          <input
            type="text"
            placeholder="Type your question…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Message"
          />
          <button type="submit" aria-label="Send">→</button>
        </form>
      </div>
    </>
  );
}
