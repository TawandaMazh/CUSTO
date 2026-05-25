const items = [
  'Proudly Zambian',
  '5–7 Day Delivery',
  '200+ Happy Customers',
  'Mobile Money Accepted',
  'Premium Gildan & Stanley Blanks',
  'Handcrafted in Lusaka',
  'Free Design Consultation',
  'Same-day Lusaka Available',
  'LPOs Accepted',
];

export default function TrustTicker() {
  return (
    <div
      className="relative overflow-hidden py-3.5"
      style={{
        background: '#0C0C0A',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {[1, 2].map(n => (
          <span
            key={n}
            className="inline-flex items-center gap-0"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {items.map((item, i) => (
              <span key={i} className="inline-flex items-center">
                <span
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.14em',
                    color: 'rgba(250,250,247,0.55)',
                    textTransform: 'uppercase',
                  }}
                >
                  {item}
                </span>
                <span
                  className="mx-6"
                  style={{ color: '#C9A96E', fontSize: '10px', opacity: 0.7 }}
                >
                  ✦
                </span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
