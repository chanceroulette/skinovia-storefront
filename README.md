# Skinovia — Headless Storefront

Next.js (App Router) headless storefront for **Skinovia** (Opera Engineering FZ-LLC, Dubai).
Shopify is the commerce backend via the **Storefront API**; the front-end is fully custom
(Three.js 3D hero + Framer Motion).

## Deploy (Vercel)
1. Import this repo on Vercel (Add New → Project → Import `skinovia-storefront`).
2. Set Environment Variables (Project → Settings → Environment Variables):
   - `SHOPIFY_STORE_DOMAIN` = `vbe6qe-kq.myshopify.com`
   - `SHOPIFY_STOREFRONT_TOKEN` = your Storefront API access token
     (Shopify admin → Settings → Apps and sales channels → Develop apps → create app → Storefront API → install → copy token)
3. Deploy. Add the domain `skinovia.ae` under Project → Settings → Domains.

Without the env vars the site still builds and runs — product pages simply show an empty state
until the Storefront token is added.

## Stack
- Next.js 14 · React 18
- three.js (WebGL skin/laser scan hero)
- framer-motion (scroll reveals)
- Shopify Storefront API (products, cart → native Shopify checkout)

## Routes
`/` home · `/shop` · `/products/[handle]` · `/about` `/faq` `/contact` · legal: `/privacy-policy` `/terms` `/refund-returns` `/shipping-policy`
