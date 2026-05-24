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
    <footer className="relative overflow-hidden" style={{ background: '#06080F' }}>
      {/* Top gradient bar */}
      <div
        className="h-[2px] w-full"
        style={{ background: 'linear-gradient(90deg, #3B82F6, #6366F1, #A78BFA)' }}
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          {/* Brand col */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-4 no-underline">
              <span
                className="font-display font-extrabold text-3xl gradient-text"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                CUSTO
              </span>
            </Link>
            <p
              className="text-sm mb-6 max-w-xs leading-relaxed"
              style={{ color: 'rgba(238,242,255,0.45)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Wear Your Vision. Premium custom apparel crafted in Lusaka and delivered across Zambia.
            </p>

            {/* Social */}
            <div className="flex gap-4 mb-8">
              {[
                { label: 'Instagram', href: '#', icon: '📸' },
                { label: 'TikTok', href: '#', icon: '🎵' },
                {
                  label: 'WhatsApp',
                  href: 'https://wa.me/260970000000',
                  icon: '💬',
                },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg no-underline transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(99,102,241,0.12)',
                    border: '1px solid rgba(99,102,241,0.2)',
                  }}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Payment icons */}
            <div className="flex flex-wrap gap-2">
              {['📱 Airtel', '📲 MTN', '💳 Visa', '💳 MC'].map(p => (
                <span
                  key={p}
                  className="text-xs px-2.5 py-1 rounded"
                  style={{
                    background: 'rgba(99,102,241,0.08)',
                    color: 'rgba(238,242,255,0.4)',
                    border: '1px solid rgba(99,102,241,0.15)',
                    fontFamily: 'JetBrains Mono, monospace',
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
                className="font-display font-bold text-sm mb-5 tracking-wider"
                style={{ fontFamily: 'Syne, sans-serif', color: '#EEF2FF' }}
              >
                {col.title.toUpperCase()}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm no-underline transition-colors duration-200 hover:text-[#A78BFA]"
                      style={{ color: 'rgba(238,242,255,0.45)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
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
              className="font-display font-bold text-sm mb-5 tracking-wider"
              style={{ fontFamily: 'Syne, sans-serif', color: '#EEF2FF' }}
            >
              CONTACT
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { icon: '📍', text: 'Lusaka, Zambia' },
                { icon: '📧', text: 'hello@custo.co.zm' },
                { icon: '📱', text: '+260 97X XXX XXX' },
              ].map(c => (
                <p
                  key={c.text}
                  className="text-sm flex items-start gap-2"
                  style={{ color: 'rgba(238,242,255,0.45)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  <span>{c.icon}</span>
                  <span>{c.text}</span>
                </p>
              ))}
              <a
                href="https://wa.me/260970000000?text=Hi%20CUSTO!"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold no-underline py-2.5 px-4 rounded-full transition-all hover:opacity-80"
                style={{
                  background: '#25D366',
                  color: 'white',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
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
          style={{ borderTop: '1px solid rgba(99,102,241,0.12)' }}
        >
          <p
            className="text-xs"
            style={{ color: 'rgba(238,242,255,0.3)', fontFamily: 'JetBrains Mono, monospace' }}
          >
            © 2025 CUSTO Zambia. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: 'rgba(238,242,255,0.2)', fontFamily: 'JetBrains Mono, monospace' }}
          >
            🇿🇲 Made with pride in Lusaka
          </p>
        </div>
      </div>
    </footer>
  );
}
