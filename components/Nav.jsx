'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}${open ? ' open' : ''}`}>
      <Link className="mark" href="/" onClick={close}>SKINOVIA</Link>

      <nav className="links">
        <Link href="/shop">SHOP</Link>
        <Link href="/about">ABOUT</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/contact">CONTACT</Link>
        <Link className="cta" href="/skin-analysis">✦ SKIN ANALYSIS</Link>
      </nav>

      <button
        className="navtoggle"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>

      <nav className="navmobile" onClick={close}>
        <Link href="/shop" onClick={close}>Shop</Link>
        <Link href="/about" onClick={close}>About</Link>
        <Link href="/faq" onClick={close}>FAQ</Link>
        <Link href="/contact" onClick={close}>Contact</Link>
        <Link className="cta" href="/skin-analysis" onClick={close}>✦ SKIN ANALYSIS</Link>
      </nav>
    </header>
  );
}
