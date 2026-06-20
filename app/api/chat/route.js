import { generateReply, aiProvider } from '@/lib/assistant';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// --- Basic in-memory rate limit (per IP, per lambda instance) ---
const RL_WINDOW = 60 * 1000; // 60s
const RL_MAX = 15; // max requests per window
const hits = new Map();
function clientIp(request) {
  const xff = request.headers.get('x-forwarded-for') || '';
  return xff.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
}
function rateLimited(ip) {
  const now = Date.now();
  if (hits.size > 10000) hits.clear();
  const arr = (hits.get(ip) || []).filter((t) => t > now - RL_WINDOW);
  if (arr.length >= RL_MAX) {
    hits.set(ip, arr);
    return true;
  }
  arr.push(now);
  hits.set(ip, arr);
  return false;
}

export async function GET() {
  const provider = aiProvider();
  return Response.json({ ai: provider !== 'none', provider });
}

export async function POST(request) {
  try {
    if (rateLimited(clientIp(request))) {
      return Response.json({ fallback: true, error: 'rate_limited' }, { status: 429 });
    }
    const body = await request.json();
    const incoming = Array.isArray(body?.messages) ? body.messages : [];
    const messages = incoming
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));
    if (messages.length === 0) return Response.json({ fallback: true });

    if (aiProvider() === 'none') return Response.json({ fallback: true });
    const reply = await generateReply(messages);
    if (!reply) return Response.json({ fallback: true });
    return Response.json({ reply });
  } catch (e) {
    return Response.json({ fallback: true });
  }
}
