import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { printMethods } from '../data/pricing';

const methodList = Object.values(printMethods);

const icons = {
  screen: (
    <svg viewBox="0 0 48 48" width="32" height="32" fill="none">
      <rect x="6" y="8" width="36" height="26" rx="3" stroke="#0C0C0A" strokeWidth="1.5"/>
      <rect x="12" y="14" width="24" height="14" rx="1.5" fill="rgba(12,12,10,0.05)" stroke="#C9A96E" strokeWidth="1.2"/>
      <path d="M18 38 L30 38" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round"/>
      <path d="M21 38 L21 44 M27 38 L27 44" stroke="rgba(12,12,10,0.3)" strokeWidth="1.5"/>
    </svg>
  ),
  embroidery: (
    <svg viewBox="0 0 48 48" width="32" height="32" fill="none">
      <path d="M10 36 Q24 8 38 36" stroke="#0C0C0A" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 32 Q24 12 34 32" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="10" cy="36" r="2" fill="#C9A96E"/>
      <circle cx="38" cy="36" r="2" fill="#C9A96E"/>
      <rect x="18" y="6" width="12" height="6" rx="1.5" fill="rgba(201,169,110,0.15)" stroke="#C9A96E" strokeWidth="1.2"/>
    </svg>
  ),
  dtg: (
    <svg viewBox="0 0 48 48" width="32" height="32" fill="none">
      <rect x="8" y="12" width="32" height="28" rx="4" stroke="#0C0C0A" strokeWidth="1.5"/>
      <rect x="14" y="18" width="20" height="16" rx="2" fill="rgba(12,12,10,0.04)" stroke="#C9A96E" strokeWidth="1.2"/>
      <rect x="16" y="20" width="6" height="6" rx="1" fill="#C9A96E" opacity="0.7"/>
      <rect x="25" y="20" width="6" height="2.5" rx="0.5" fill="rgba(12,12,10,0.25)"/>
      <rect x="25" y="24" width="4" height="2.5" rx="0.5" fill="rgba(12,12,10,0.15)"/>
      <circle cx="24" cy="7" r="3" stroke="#0C0C0A" strokeWidth="1.5"/>
      <path d="M24 10 L24 13" stroke="#0C0C0A" strokeWidth="1.5"/>
    </svg>
  ),
  vinyl: (
    <svg viewBox="0 0 48 48" width="32" height="32" fill="none">
      <rect x="8" y="10" width="32" height="28" rx="3" stroke="#0C0C0A" strokeWidth="1.5"/>
      <path d="M8 10 L40 10" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round"/>
      <path d="M15 22 L33 22 M15 29 L27 29" stroke="rgba(12,12,10,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

export default function TechniqueCards() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="techniques"
      ref={ref}
      className="py-32 px-6"
      style={{ background: '#FAFAF7' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-end justify-between flex-wrap gap-6"
        >
          <div>
            <p
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.28em',
                color: '#C9A96E',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
            >
              Our Craft
            </p>
            <h2
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(40px, 5.5vw, 80px)',
                color: '#0C0C0A',
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
              }}
            >
              FOUR WAYS TO<br />
              <span className="gradient-text">MAKE YOUR MARK</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {methodList.map((method, i) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card-clean p-8 group cursor-pointer"
            >
              <div className="mb-6">{icons[method.id]}</div>

              <div className="flex items-start justify-between mb-3">
                <div>
                  <p
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '9.5px',
                      letterSpacing: '0.2em',
                      color: '#C9A96E',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                    }}
                  >
                    {method.tagline}
                  </p>
                  <h3
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '22px',
                      color: '#0C0C0A',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {method.label}
                  </h3>
                </div>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '6px 14px',
                    borderRadius: '50px',
                    background: '#F2EFE8',
                    border: '1px solid #E5E0D5',
                    color: '#A07840',
                    whiteSpace: 'nowrap',
                  }}
                >
                  From K{method.basePrice}/unit
                </span>
              </div>

              <p
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '13.5px',
                  lineHeight: 1.7,
                  color: 'rgba(12,12,10,0.5)',
                  marginBottom: '20px',
                }}
              >
                {method.detail}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {method.features.map(f => (
                  <span
                    key={f}
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '10px',
                      padding: '5px 11px',
                      borderRadius: '50px',
                      background: '#F2EFE8',
                      border: '1px solid #E5E0D5',
                      color: 'rgba(12,12,10,0.5)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              <button
                className="flex items-center gap-2 group-hover:gap-3 transition-all"
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0C0C0A',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Learn More
                <span>→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
