import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className="foot">
        <div className="brand">
          <div className="mark">SKINOVIA</div>
          <p>Advanced anti-aging skincare and beauty-tech, engineered for the modern complexion. Dubai, UAE.</p>
          <p className="footmail"><a href="mailto:admin@skinovia.ae">admin@skinovia.ae</a></p>
        </div>
        <div className="col">
          <h4>Shop</h4>
          <Link href="/shop">All products</Link>
          <Link href="/shop">Serums</Link>
          <Link href="/shop">Skin Analysis</Link>
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
          <a href="https://www.instagram.com/skinovia" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.tiktok.com/@skinovia" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://wa.me/971500000000" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </span>
      </div>
    </>
  );
}
