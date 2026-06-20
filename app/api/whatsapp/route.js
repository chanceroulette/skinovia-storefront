import { generateReply } from '@/lib/assistant';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Webhook verification (Meta calls this once when you set the callback URL).
export async function GET(request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');
  if (mode === 'subscribe' && token && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new Response(challenge || '', { status: 200 });
  }
  return new Response('Forbidden', { status: 403 });
}

async function sendWhatsApp(to, text) {
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_TOKEN;
  if (!phoneId || !token) return;
  await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
    body: JSON.stringify({ messaging_product: 'whatsapp', to, text: { body: text } })
  });
}

// Incoming messages from WhatsApp Cloud API.
export async function POST(request) {
  try {
    const body = await request.json();
    const value = body?.entry?.[0]?.changes?.[0]?.value;
    const msg = value?.messages?.[0];
    if (!msg || msg.type !== 'text') return new Response('ok', { status: 200 });

    const from = msg.from;
    const text = msg.text?.body || '';

    let reply = null;
    try {
      reply = await generateReply([{ role: 'user', content: text.slice(0, 1000) }]);
    } catch {
      reply = null;
    }
    if (!reply) {
      reply = 'Thanks for messaging Skinovia! Our team will get back to you shortly. For anything urgent: admin@skinovia.ae';
    }

    await sendWhatsApp(from, reply);
    return new Response('ok', { status: 200 });
  } catch (e) {
    return new Response('ok', { status: 200 });
  }
}
