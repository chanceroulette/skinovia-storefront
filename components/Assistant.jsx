'use client';
import { useState, useRef, useEffect } from 'react';

const WA = '971543481109';
const WA_LINK = `https://wa.me/${WA}`;

// Rule-based knowledge base — used as a graceful fallback if the AI endpoint
// is unavailable (e.g. no API key set yet, or a network error).
const KB = [
  { keys: ['ship', 'shipping', 'deliver', 'delivery', 'how long', 'arrive', 'emirate', 'dubai', 'abu dhabi', 'sharjah', 'when will', 'days'],
    answer: 'We deliver across all seven Emirates. Dubai is typically <b>next business day</b>; other Emirates 1–3 business days. You get a tracking link by email on dispatch. <a href="/shipping-policy">Shipping policy →</a>' },
  { keys: ['return', 'refund', 'exchange', 'money back', 'send back', 'cancel'],
    answer: 'You can return <b>unused, sealed</b> items within <b>14 days</b>. Faulty or wrong items are replaced or refunded. <a href="/refund-returns">Refunds &amp; returns →</a>' },
  { keys: ['track', 'tracking', 'where is my order', 'order status', 'status', 'shipped', 'dispatch'],
    answer: 'As soon as your order ships we email you a <b>tracking link</b>. If you can’t find it, message us on WhatsApp with your order number: <a href="' + WA_LINK + '" target="_blank" rel="noopener noreferrer">Chat on WhatsApp →</a>' },
  { keys: ['pay', 'payment', 'card', 'cash', 'cod', 'tabby', 'tamara', 'instal', 'vat', 'price', 'cost', 'tax'],
    answer: 'Checkout is secure with card payments, and prices <b>include 5% VAT</b>. Cash on delivery and instalments (Tabby/Tamara) are coming soon.' },
  { keys: ['product', 'serum', 'lash', 'brow', 'hair', 'sell', 'catalog', 'catalogue', 'shop', 'buy', 'ingredient', 'skincare', 'anti', 'aging', 'ageing'],
    answer: 'We craft anti-aging skincare and beauty-tech — including a peptide <b>lash &amp; brow serum</b> and a copper-peptide <b>hair density serum</b>. Browse everything in the <a href="/shop">shop →</a>' },
  { keys: ['human', 'agent', 'contact', 'speak', 'talk', 'phone', 'call', 'email', 'whatsapp', 'support', 'someone'],
    answer: 'Our team is happy to help: <a href="mailto:admin@skinovia.ae">admin@skinovia.ae</a> or <a href="' + WA_LINK + '" target="_blank" rel="noopener noreferrer">WhatsApp +971 54 348 1109</a> (Sun–Thu, 9:00–18:00 GST).' },
  { keys: ['about', 'who are you', 'company', 'brand', 'where are you', 'located', 'authentic', 'genuine', 'original'],
    answer: 'Skinovia is a Dubai-based skincare house operated by <b>Opera Engineering FZ-LLC</b>. Every product is authentic and sealed.' },
  { keys: ['hi', 'hello', 'hey', 'salam', 'marhaba', 'ciao', 'hallo'],
    answer: 'Hello! How can I help today? Ask me about shipping, returns, tracking, products or payment.' }
];

const QUICK = [
  { label: 'Shipping', q: 'What are your shipping options?' },
  { label: 'Returns', q: 'What is your return policy?' },
  { label: 'Track my order', q: 'How do I track my order?' },
  { label: 'Products', q: 'What products do you sell?' },
  { label: 'Talk to a human', q: 'I want to talk to a human' }
];

function kbRespond(text) {
  const t = (text || '').toLowerCase();
  for (const item of KB) if (item.keys.some((k) => t.includes(k))) return item.answer;
  return 'I’m not certain about that one yet — our team can help directly on <a href="' + WA_LINK + '" target="_blank" rel="noopener noreferrer">WhatsApp</a> or at <a href="mailto:admin@skinovia.ae">admin@skinovia.ae</a>.';
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function linkify(text) {
  let s = escapeHtml(text);
  s = s.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  s = s.replace(/([\w.+-]+@[\w-]+\.[\w.-]+)/g, '<a href="mailto:$1">$1</a>');
  return s.replace(/\n/g, '<br/>');
}
function stripHtml(s) {
  return (s || '').replace(/<[^>]+>/g, '');
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi, I’m the Skinovia assistant. How can I help? Try one of the options below or just type your question.' }
  ]);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open]);

  async function send(text) {
    const q = (text != null ? text : input).trim();
    if (!q || busy) return;
    setInput('');
    setBusy(true);

    const base = [...messages, { from: 'user', text: q }];
    setMessages([...base, { from: 'bot', typing: true }]);

    const history = base.map((m) => ({
      role: m.from === 'user' ? 'user' : 'assistant',
      content: m.text || stripHtml(m.html)
    }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });
      const data = await res.json();
      if (data && data.reply) {
        setMessages([...base, { from: 'bot', html: linkify(data.reply) }]);
      } else {
        setMessages([...base, { from: 'bot', html: kbRespond(q) }]);
      }
    } catch {
      setMessages([...base, { from: 'bot', html: kbRespond(q) }]);
    } finally {
      setBusy(false);
    }
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
          {messages.map((m, i) => {
            if (m.from === 'user') return <div key={i} className="am am-user">{m.text}</div>;
            if (m.typing) return <div key={i} className="am am-bot am-typing"><span/><span/><span/></div>;
            if (m.html) return <div key={i} className="am am-bot" dangerouslySetInnerHTML={{ __html: m.html }} />;
            return <div key={i} className="am am-bot">{m.text}</div>;
          })}
        </div>

        <div className="asst-quick">
          {QUICK.map((qr) => (
            <button key={qr.label} disabled={busy} onClick={() => send(qr.q)}>{qr.label}</button>
          ))}
        </div>

        <form className="asst-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <input
            type="text"
            placeholder="Type your question…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Message"
          />
          <button type="submit" aria-label="Send" disabled={busy}>→</button>
        </form>
      </div>
    </>
  );
}
