import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/shopify';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getProducts(4);

  return (
    <>
      <Hero />
      <div className="wrap">
        <section>
          <div className="trust">
            <Reveal><div><b>Next-day</b>Delivery across the UAE</div></Reveal>
            <Reveal delay={0.1}><div><b>14-day</b>Easy returns</div></Reveal>
            <Reveal delay={0.2}><div><b>100%</b>Authentic &amp; sealed</div></Reveal>
            <Reveal delay={0.3}><div><b>VAT</b>Included in all prices</div></Reveal>
          </div>
        </section>

        <section className="block">
          <Reveal><p className="lbl">WHAT WE TREAT</p></Reveal>
          <Reveal><h2 className="sec-h">Targeted protocols for the concerns that matter — backed by clinical light science.</h2></Reveal>
          <div className="grid">
            {[
              ['01', 'LED Rejuvenation', 'Red & near-infrared therapy to rebuild collagen and restore density.'],
              ['02', 'Microcurrent Lift', 'Facialist-grade sculpting for visible architectural lift and tone.'],
              ['03', 'Barrier Repair', 'Desert-climate hydration systems that defend and rebuild.'],
              ['04', 'Pigment & Tone', 'Even, luminous complexion through targeted wavelength therapy.'],
              ['05', 'Cryo & Recovery', 'Cold therapy to de-puff, calm and finish every ritual.'],
              ['06', 'Scalp & Hair', 'Red-light and peptide density technology, from the root.']
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
          <Reveal><p className="lbl">THE SCIENCE</p></Reveal>
          <Reveal><h2 className="sec-h" style={{ margin: '0 auto 24px' }}>Light is the active ingredient.</h2></Reveal>
          <Reveal><p className="lead" style={{ margin: '0 auto' }}>Every formula is calibrated to what your skin actually responds to — measured, not marketed.</p></Reveal>
          <div className="pillars">
            <Reveal><div className="pillar"><div className="big">633<span style={{ fontSize: 24 }}>nm</span></div><h4>Red Light</h4><p>Stimulates fibroblasts and collagen synthesis at the dermal layer.</p></div></Reveal>
            <Reveal delay={0.1}><div className="pillar"><div className="big">830<span style={{ fontSize: 24 }}>nm</span></div><h4>Near-Infrared</h4><p>Penetrates deep to accelerate repair and cellular energy.</p></div></Reveal>
            <Reveal delay={0.2}><div className="pillar"><div className="big">415<span style={{ fontSize: 24 }}>nm</span></div><h4>Blue Light</h4><p>Targets acne-causing bacteria without stripping the barrier.</p></div></Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
