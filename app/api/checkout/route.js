import { NextResponse } from 'next/server';
import { createCheckout } from '@/lib/shopify';

export async function POST(request) {
  try {
    const { variantId, quantity } = await request.json();
    if (!variantId) return NextResponse.json({ error: 'Missing variantId' }, { status: 400 });
    const url = await createCheckout(variantId, quantity || 1);
    if (!url) return NextResponse.json({ error: 'Checkout unavailable' }, { status: 502 });
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
