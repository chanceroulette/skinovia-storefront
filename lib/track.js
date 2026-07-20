'use client';

/**
 * Thin wrappers around gtag / fbq.
 *
 * Every helper is a no-op when the tag is absent, so the site keeps working
 * with analytics disabled, blocked by an ad blocker, or during SSR.
 */

function gtagEvent(name, params) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

function fbqEvent(name, params) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', name, params);
  }
}

/** Fired when a product detail page is viewed. */
export function trackViewContent({ id, title, amount, currency = 'AED' }) {
  const value = Number(amount) || 0;

  gtagEvent('view_item', {
    currency,
    value,
    items: [{ item_id: id, item_name: title, price: value, quantity: 1 }]
  });

  fbqEvent('ViewContent', {
    content_ids: [id],
    content_name: title,
    content_type: 'product',
    value,
    currency
  });
}

/**
 * Fired right before the shopper is redirected to Shopify checkout.
 * The "Add to cart" button on this storefront goes straight to checkout,
 * so begin_checkout / InitiateCheckout is the accurate event here.
 */
export function trackInitiateCheckout({ id, title, amount, currency = 'AED', quantity = 1 }) {
  const unit = Number(amount) || 0;
  const value = unit * quantity;

  gtagEvent('begin_checkout', {
    currency,
    value,
    items: [{ item_id: id, item_name: title, price: unit, quantity }]
  });

  fbqEvent('InitiateCheckout', {
    content_ids: [id],
    content_name: title,
    content_type: 'product',
    num_items: quantity,
    value,
    currency
  });
}
