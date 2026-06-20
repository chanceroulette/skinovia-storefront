'use client';
import { useRef, useEffect } from 'react';
import Link from 'next/link';

const HERO_IMG =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3EQeR6AMjc6LGT7xL4cimnNPhHk/hf_20260620_073656_19ceddb9-f3af-4fdf-95a4-280441143ac5.png';

export default function Hero() {
  const sectionRef = useRef(null);
  const phRef = useRef(null);

  useEffect(() => {
    const s = sectionRef.current;
    const p = phRef.current;
    if (!s || !p) return;
    const onMove = (e) => {
      const r = s.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      p.style.transition = 'transform .5s ease-out';
      p.style.transform = `scale(1.13) translate(${-x * 16}px, ${-y * 12}px)`;
    };
    const onLeave = () => {
      p.style.transition = 'transform 1.2s ease';
      p.style.transform = '';
    };
    s.addEventListener('pointermove', onMove);
    s.addEventListener('pointerleave', onLeave);
    requestAnimationFrame(() => s.classList.add('go'));
    return () => {
      s.removeEventListener('pointermove', onMove);
      s.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section className="heroE" ref={sectionRef}>
      <div className="heroE-ph" ref={phRef} style={{ backgroundImage: `url(${HERO_IMG})` }} />
      <div className="heroE-inner">
        <p className="heroE-over"><b>Skinovia</b> &nbsp;·&nbsp; Advanced skincare — Dubai</p>
        <h1>Rejuvenation,<br /><em>refined.</em></h1>
        <div className="heroE-hr" />
        <p className="heroE-lead">Dermatologist-grade formulas and light-based devices that restore firmness, glow and youth — delivered across the UAE.</p>
        <div className="cta-row">
          <Link className="btn" href="/shop">Discover Skinovia</Link>
          <Link className="btn ghost" href="/shop">Skin analysis</Link>
        </div>
      </div>
    </section>
  );
}
