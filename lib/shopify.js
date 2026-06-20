const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = '2024-10';

export function shopifyConfigured() {
  return Boolean(DOMAIN && TOKEN);
}

async function storefront(query, variables = {}) {
  if (!shopifyConfigured()) return null;
  try {
    const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': TOKEN
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }
    });
    const json = await res.json();
    if (json.errors) { console.error('Shopify errors', json.errors); return null; }
    return json.data;
  } catch (e) {
    console.error('Shopify fetch failed', e);
    return null;
  }
}

const PRODUCT_FIELDS = `
  id
  title
  handle
  description
  descriptionHtml
  featuredImage { url altText }
  images(first: 6) { edges { node { url altText } } }
  priceRange { minVariantPrice { amount currencyCode } }
  variants(first: 1) { edges { node { id availableForSale } } }
`;

export async function getProducts(first = 24) {
  const data = await storefront(
    `query Products($first:Int!){ products(first:$first, sortKey:CREATED_AT, reverse:true){ edges { node { ${PRODUCT_FIELDS} } } } }`,
    { first }
  );
  if (!data) return [];
  return data.products.edges.map((e) => e.node);
}

export async function getProduct(handle) {
  const data = await storefront(
    `query Product($handle:String!){ product(handle:$handle){ ${PRODUCT_FIELDS} } }`,
    { handle }
  );
  return data ? data.product : null;
}

export async function createCheckout(variantId, quantity = 1) {
  const data = await storefront(
    `mutation Create($lines:[CartLineInput!]!){ cartCreate(input:{lines:$lines}){ cart { checkoutUrl } userErrors { message } } }`,
    { lines: [{ merchandiseId: variantId, quantity }] }
  );
  if (!data || !data.cartCreate || !data.cartCreate.cart) return null;
  let url = data.cartCreate.cart.checkoutUrl;
  // The store's primary domain (skinovia.ae) points to this Vercel storefront,
  // so Shopify's checkoutUrl on that host 404s. Force checkout onto the
  // Shopify-hosted domain so the checkout actually loads.
  try {
    const u = new URL(url);
    u.protocol = 'https:';
    u.host = DOMAIN || 'vbe6qe-kq.myshopify.com';
    url = u.toString();
  } catch {}
  return url;
}

export function formatPrice(money) {
  if (!money) return '';
  const amount = Number(money.amount);
  try {
    return new Intl.NumberFormat('en-AE', { style: 'currency', currency: money.currencyCode || 'AED' }).format(amount);
  } catch {
    return `${money.currencyCode || 'AED'} ${amount.toFixed(2)}`;
  }
}
