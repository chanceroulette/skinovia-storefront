'use client';

import { useEffect } from 'react';
import { trackViewContent } from '@/lib/track';

/**
 * Drop-in tracker for the product detail page.
 * Renders nothing; fires view_item / ViewContent once on mount.
 */
export default function ViewContentTracker({ id, title, amount, currency }) {
  useEffect(() => {
    if (!id) return;
    trackViewContent({ id, title, amount, currency });
  }, [id, title, amount, currency]);

  return null;
}
