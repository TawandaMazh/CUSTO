const items = [
  '🇿🇲 Proudly Zambian',
  '⚡ 5–7 Day Delivery',
  '💬 200+ Happy Customers',
  '📱 Mobile Money Accepted',
  '✨ Premium Gildan & Stanley Blanks',
  '🧵 Handcrafted in Lusaka',
  '🎨 Free Design Consultation',
  '🚀 Same-day Lusaka Available',
  '🏆 LPOs Accepted',
];

export default function TrustTicker() {
  const text = [...items, ...items].join('   ·   ');

  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        background: 'rgba(10, 13, 26, 0.8)',
        borderTop: '1px solid rgba(99,102,241,0.15)',
        borderBottom: '1px solid rgba(99,102,241,0.15)',
      }}
    >
      <div
        className="flex whitespace-nowrap animate-marquee"
        style={{ fontFamily: 'JetBrains Mono, monospace' }}
      >
        {[1, 2].map(n => (
          <span
            key={n}
            className="inline-block text-sm font-medium tracking-wider pr-12"
            style={{ color: '#A78BFA' }}
          >
            {items.map((item, i) => (
              <span key={i}>
                {item}
                <span className="mx-4 opacity-30">·</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
