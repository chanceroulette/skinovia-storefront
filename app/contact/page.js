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
          Email: <a href="mailto:admin@skinovia.ae">admin@skinovia.ae</a><br />
          Phone / WhatsApp: +971 54 348 1109<br />
          Hours: Sun–Thu, 9:00–18:00 GST<br />
          Address: FXMB0229 Compass Building, Al Shuhada&apos; Road, Ras Al Khaimah, UAE
        </p>
        <p>For media &amp; partnership enquiries, write to <a href="mailto:admin@skinovia.ae">admin@skinovia.ae</a> and mark your subject line accordingly.</p>
      </main>
    </>
  );
}
