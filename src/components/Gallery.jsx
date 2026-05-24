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

const heights = ['h-64', 'h-48', 'h-72', 'h-56', 'h-64', 'h-48', 'h-72', 'h-56'];

export default function Gallery() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="py-32 px-6"
      style={{ background: 'linear-gradient(180deg, #0A0D1A 0%, #080B14 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2
            className="font-display font-black"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(48px, 7vw, 110px)',
              color: '#EEF2FF',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}
          >
            WORN ACROSS<br />
            <span className="gradient-text">ZAMBIA</span>
          </h2>
          <p
            className="mt-4 max-w-md"
            style={{ color: 'rgba(238,242,255,0.5)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            From Lusaka to Livingstone — custom gear delivered nationwide.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="relative group overflow-hidden rounded-2xl break-inside-avoid cursor-pointer"
              style={{ marginBottom: '16px' }}
            >
              <img
                src={item.url}
                alt={item.label}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ height: i % 3 === 0 ? '280px' : i % 3 === 1 ? '220px' : '260px' }}
                loading="lazy"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.75), rgba(167,139,250,0.75))' }}
              >
                <span
                  className="font-mono text-white text-sm tracking-widest font-bold"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  VIEW
                </span>
                <span
                  className="text-white text-xs mt-2 opacity-80"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {item.label}
                </span>
              </div>

              {/* City tag */}
              <div
                className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: 'rgba(8,11,20,0.7)',
                  color: '#C4B5FD',
                  fontFamily: 'JetBrains Mono, monospace',
                  backdropFilter: 'blur(8px)',
                }}
              >
                🇿🇲 {item.city}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
