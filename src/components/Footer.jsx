import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'T-Shirts', to: '/studio' },
      { label: 'Hoodies', to: '/studio' },
      { label: 'Polo Shirts', to: '/studio' },
      { label: 'Bulk Orders', to: '/pricing' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Screen Printing', to: '/#techniques' },
      { label: 'Embroidery', to: '/#techniques' },
      { label: 'DTG Printing', to: '/#techniques' },
      { label: 'Heat Transfer Vinyl', to: '/#techniques' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Design Studio', to: '/studio' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0C0C0A' }}>
      <div
        className="h-[1px] w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-4 no-underline">
              <span
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: '28px',
                  color: '#FAFAF7',
                  letterSpacing: '-0.03em',
                }}
              >
                CUSTO
              </span>
            </Link>
            <p
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '13px',
                lineHeight: 1.7,
                color: 'rgba(250,250,247,0.35)',
                maxWidth: '220px',
                marginBottom: '24px',
              }}
            >
              Wear Your Vision. Premium custom apparel crafted in Lusaka and delivered across Zambia.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mb-8">
              {[
                { label: 'Instagram', href: '#', icon: '📸' },
                { label: 'TikTok', href: '#', icon: '🎵' },
                { label: 'WhatsApp', href: 'https://wa.me/260970000000', icon: '💬' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '15px',
                    background: 'rgba(250,250,247,0.06)',
                    border: '1px solid rgba(250,250,247,0.1)',
                    transition: 'all 0.2s',
                  }}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Payment badges */}
            <div className="flex flex-wrap gap-2">
              {['Airtel', 'MTN', 'Visa', 'Mastercard'].map(p => (
                <span
                  key={p}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '9px',
                    letterSpacing: '0.08em',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    background: 'rgba(250,250,247,0.05)',
                    border: '1px solid rgba(250,250,247,0.1)',
                    color: 'rgba(250,250,247,0.3)',
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {columns.map(col => (
            <div key={col.title}>
              <h4
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  color: 'rgba(250,250,247,0.35)',
                  textTransform: 'uppercase',
                  marginBottom: '18px',
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="no-underline"
                      style={{
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: '13px',
                        color: 'rgba(250,250,247,0.45)',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,250,247,0.45)'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.16em',
                color: 'rgba(250,250,247,0.35)',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}
            >
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '📍', text: 'Lusaka, Zambia' },
                { icon: '📧', text: 'hello@custo.co.zm' },
                { icon: '📱', text: '+260 97X XXX XXX' },
              ].map(c => (
                <p
                  key={c.text}
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '13px',
                    color: 'rgba(250,250,247,0.4)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                  }}
                >
                  <span>{c.icon}</span>
                  <span>{c.text}</span>
                </p>
              ))}
              <a
                href="https://wa.me/260970000000?text=Hi%20CUSTO!"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '8px',
                  padding: '9px 18px',
                  borderRadius: '50px',
                  background: '#25D366',
                  color: '#FFFFFF',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: '13px',
                  textDecoration: 'none',
                  width: 'fit-content',
                  transition: 'opacity 0.2s',
                }}
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(250,250,247,0.07)' }}
        >
          <p
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '10px',
              color: 'rgba(250,250,247,0.2)',
              letterSpacing: '0.06em',
            }}
          >
            © 2025 CUSTO Zambia. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '10px',
              color: 'rgba(250,250,247,0.15)',
              letterSpacing: '0.06em',
            }}
          >
            🇿🇲 Made with pride in Lusaka
          </p>
        </div>
      </div>
    </footer>
  );
}
