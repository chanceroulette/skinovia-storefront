import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/shopify';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getProducts(50);

  return (
    <>
      <Hero />
      <div className="wrap">
        <section>
          <div className="trust">
            <Reveal><div><b>Fast</b>Delivery across the UAE</div></Reveal>
            <Reveal delay={0.1}><div><b>14-day</b>Easy returns</div></Reveal>
            <Reveal delay={0.2}><div><b>100%</b>Authentic &amp; sealed</div></Reveal>
            <Reveal delay={0.3}><div><b>VAT</b>Included in all prices</div></Reveal>
          </div>
        </section>

        <section className="block">
          <Reveal><p className="lbl">WHAT WE CURATE</p></Reveal>
          <Reveal><h2 className="sec-h">A focused edit across skincare, hair, make-up and beauty-tech — only the brands and products we&apos;d use ourselves.</h2></Reveal>
          <div className="grid">
            {[
              ['01', 'Skincare', 'Serums, creams and SPF for glow, hydration and anti-aging — chosen for results.'],
              ['02', 'Hair Care', 'Density treatments, repair and styling to strengthen and revive every type of hair.'],
              ['03', 'Make-up', 'Foundation, lips, eyes and nails — long-wear formulas that perform in the UAE climate.'],
              ['04', 'Body & Bath', 'Nourishing oils, firming creams and self-care rituals from head to toe.'],
              ['05', 'Beauty Devices', 'LED, microcurrent and sonic tools that bring the clinic home.'],
              ['06', 'Tools & Accessories', 'The finishing pieces — rollers, brushes and everyday essentials.']
            ].map(([n, h, p], i) => (
              <Reveal key={n} delay={(i % 3) * 0.08}>
                <div className="tile">
                  <span className="n">{n}</span>
                  <div>
                    <h3>{h}</h3>
                    <p>{p}</p>
                  </div>
                  <span className="go">DISCOVER →</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {products.length > 0 && (
          <section className="block">
            <Reveal><p className="lbl">FEATURED</p></Reveal>
            <Reveal><h2 className="sec-h">Where the ritual begins.</h2></Reveal>
            <div className="pgrid">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}

        <section className="block center">
          <Reveal><p className="lbl">THE SKINOVIA STANDARD</p></Reveal>
          <Reveal><h2 className="sec-h" style={{ margin: '0 auto 24px' }}>Curated. Authentic. Delivered.</h2></Reveal>
          <Reveal><p className="lead" style={{ margin: '0 auto' }}>We don&apos;t carry everything — we carry what works. Every product is sourced genuine and shipped fast from within the UAE.</p></Reveal>
          <div className="pillars">
            <Reveal><div className="pillar"><div className="big">7<span style={{ fontSize: 24 }}>&nbsp;emirates</span></div><h4>Delivered everywhere</h4><p>Fast shipping to every corner of the UAE, with tracking on every order.</p></div></Reveal>
            <Reveal delay={0.1}><div className="pillar"><div className="big">1&ndash;3<span style={{ fontSize: 24 }}>&nbsp;days</span></div><h4>Quick delivery</h4><p>Dubai typically next business day; other emirates within one to three days.</p></div></Reveal>
            <Reveal delay={0.2}><div className="pillar"><div className="big">100<span style={{ fontSize: 24 }}>%</span></div><h4>Authentic &amp; sealed</h4><p>Hand-picked from brands we trust — genuine, sealed and quality-checked.</p></div></Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
