export const metadata = { title: 'Contact — Skinovia' };

export default function Contact() {
  return (
    <>
      <div className="phead">
        <p className="over">GET IN TOUCH</p>
        <h1>We’re here<br />to help.</h1>
        <p className="sub">Questions about an order, a product or a partnership — we usually reply within one business day.</p>
      </div>
      <main className="doc">
        <h2>Customer care</h2>
        <p>
          Support: <a href="mailto:support@skinovia.ae">support@skinovia.ae</a><br />
          General: <a href="mailto:hello@skinovia.ae">hello@skinovia.ae</a><br />
          Phone / WhatsApp: <a href="tel:+971543481109">+971 54 348 1109</a><br />
          Hours: Sun–Thu, 9:00–18:00 GST
        </p>
        <h2>Registered office</h2>
        <p>Opera Engineering FZ-LLC<br />FXMB0229, Compass Building, Al Shohada Road,<br />Al Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE</p>
        <p>For media &amp; partnership enquiries, write to <a href="mailto:info@skinovia.ae">info@skinovia.ae</a>.</p>
      </main>
    </>
  );
}
