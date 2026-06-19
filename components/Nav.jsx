import Link from 'next/link';

export default function Nav() {
  return (
    <header className="nav">
      <Link className="mark" href="/">SKINOVIA</Link>
      <nav className="links">
        <Link href="/shop">SHOP</Link>
        <Link href="/about">ABOUT</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/contact">CONTACT</Link>
        <Link className="cta" href="/shop">✦ SKIN ANALYSIS</Link>
      </nav>
    </header>
  );
}
