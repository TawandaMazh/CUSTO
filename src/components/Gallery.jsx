import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const items = [
  { id: 1, url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', label: 'Custom Streetwear', city: 'Lusaka' },
  { id: 2, url: 'https://images.unsplash.com/photo-1503341338985-95ad05769881?w=600&q=80', label: 'Corporate Merch', city: 'Ndola' },
  { id: 3, url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80', label: 'Team Kits', city: 'Kitwe' },
  { id: 4, url: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80', label: 'Event Tees', city: 'Livingstone' },
  { id: 5, url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80', label: 'Premium Hoodies', city: 'Lusaka' },
  { id: 6, url: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80', label: 'Embroidered Polos', city: 'Chipata' },
  { id: 7, url: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80', label: 'School Uniforms', city: 'Kabwe' },
  { id: 8, url: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=600&q=80', label: 'Branded Apparel', city: 'Lusaka' },
];

export default function Gallery() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-32 px-6" style={{ background: '#FAFAF7' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-end justify-between flex-wrap gap-6"
        >
          <div>
            <h2
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(48px, 7vw, 110px)',
                color: '#0C0C0A',
                lineHeight: 0.88,
                letterSpacing: '-0.035em',
              }}
            >
              WORN ACROSS<br />
              <span className="gradient-text">ZAMBIA</span>
            </h2>
            <p
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '14px',
                color: 'rgba(12,12,10,0.45)',
                marginTop: '16px',
              }}
            >
              From Lusaka to Livingstone — custom gear delivered nationwide.
            </p>
          </div>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3" style={{ columnGap: '12px' }}>
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07 }}
              className="relative group overflow-hidden break-inside-avoid cursor-pointer"
              style={{
                borderRadius: '12px',
                marginBottom: '12px',
                border: '1px solid #E5E0D5',
              }}
            >
              <img
                src={item.url}
                alt={item.label}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ height: i % 3 === 0 ? '280px' : i % 3 === 1 ? '220px' : '260px', display: 'block' }}
                loading="lazy"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-350"
                style={{ background: 'rgba(12,12,10,0.72)' }}
              >
                <span
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '13px',
                    letterSpacing: '0.1em',
                    color: '#FAFAF7',
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '10px',
                    color: '#C9A96E',
                    marginTop: '6px',
                    letterSpacing: '0.16em',
                  }}
                >
                  🇿🇲 {item.city}
                </span>
              </div>

              {/* City tag */}
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  padding: '4px 10px',
                  borderRadius: '50px',
                  background: 'rgba(250,250,247,0.88)',
                  backdropFilter: 'blur(8px)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '9px',
                  letterSpacing: '0.1em',
                  color: 'rgba(12,12,10,0.55)',
                }}
              >
                {item.city}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
