import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className="foot">
        <div className="brand">
          <div className="mark">SKINOVIA</div>
          <p>A curated house of skincare, hair, make-up and beauty-tech from the brands we trust — delivered fast across the UAE.</p>
          <p className="footmail"><a href="mailto:admin@skinovia.ae">admin@skinovia.ae</a></p>
        </div>
        <div className="col">
          <h4>Shop</h4>
          <Link href="/shop">All products</Link>
          <Link href="/shop">Skincare</Link>
          <Link href="/shop">Make-up</Link>
        </div>
        <div className="col">
          <h4>Company</h4>
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="col">
          <h4>Legal</h4>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/refund-returns">Refunds</Link>
          <Link href="/shipping-policy">Shipping</Link>
        </div>
      </footer>
      <div className="foot-bar">
        <span>© 2026 Skinovia — Opera Engineering FZ-LLC · Dubai, UAE</span>
        <span className="social">
          {/*
            Instagram and TikTok intentionally absent (2026-07-20):
            @skinovia.skincare did not exist (Instagram 404) and @skinovia on
            TikTok belongs to an unrelated business ("Skinovia BD", Bangladesh).
            Add them back here — and to the `sameAs` array in app/layout.js —
            once the official profiles are registered.
          */}
          <a href="https://www.facebook.com/profile.php?id=61591043871607" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://wa.me/971543481109" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </span>
      </div>
    </>
  );
}
