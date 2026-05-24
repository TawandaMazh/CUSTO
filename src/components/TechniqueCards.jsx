import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { printMethods } from '../data/pricing';

const svgIllustrations = {
  screen: (
    <svg viewBox="0 0 80 80" className="w-16 h-16">
      <rect x="10" y="10" width="60" height="50" rx="4" fill="none" stroke="#3B82F6" strokeWidth="2"/>
      <rect x="20" y="20" width="40" height="30" rx="2" fill="rgba(59,130,246,0.2)"/>
      <circle cx="40" cy="35" r="10" fill="#3B82F6" opacity="0.8"/>
      <path d="M30 65 L50 65" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round"/>
      <path d="M35 65 L35 75 M45 65 L45 75" stroke="#A78BFA" strokeWidth="2"/>
    </svg>
  ),
  embroidery: (
    <svg viewBox="0 0 80 80" className="w-16 h-16">
      <path d="M20 60 Q40 20 60 60" fill="none" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round"/>
      <path d="M25 55 Q40 25 55 55" fill="none" stroke="#A78BFA" strokeWidth="2" opacity="0.6"/>
      <circle cx="20" cy="60" r="3" fill="#A78BFA"/>
      <circle cx="60" cy="60" r="3" fill="#A78BFA"/>
      <path d="M10 40 L15 35 M70 40 L65 35" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="30" y="18" width="20" height="8" rx="2" fill="rgba(167,139,250,0.2)" stroke="#A78BFA" strokeWidth="1.5"/>
      <path d="M35 22 H45" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  dtg: (
    <svg viewBox="0 0 80 80" className="w-16 h-16">
      <rect x="15" y="20" width="50" height="45" rx="6" fill="none" stroke="#6366F1" strokeWidth="2"/>
      <rect x="25" y="30" width="30" height="25" rx="3" fill="rgba(99,102,241,0.15)"/>
      <rect x="28" y="33" width="10" height="10" rx="1" fill="#3B82F6" opacity="0.8"/>
      <rect x="42" y="33" width="10" height="4" rx="1" fill="#A78BFA" opacity="0.8"/>
      <rect x="42" y="39" width="7" height="4" rx="1" fill="#6366F1" opacity="0.8"/>
      <rect x="28" y="45" width="24" height="3" rx="1" fill="rgba(167,139,250,0.4)"/>
      <circle cx="40" cy="14" r="4" fill="none" stroke="#6366F1" strokeWidth="1.5"/>
      <path d="M40 18 L40 22" stroke="#6366F1" strokeWidth="1.5"/>
    </svg>
  ),
  vinyl: (
    <svg viewBox="0 0 80 80" className="w-16 h-16">
      <path d="M20 20 L60 20 L60 55 L20 55 Z" fill="none" stroke="#C4B5FD" strokeWidth="2"/>
      <path d="M20 20 L60 20" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round"/>
      <path d="M30 35 L50 35 M30 43 L45 43" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round"/>
      <path d="M15 60 L65 60" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3"/>
      <path d="M58 15 L70 15 L70 55 L58 55" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5"/>
    </svg>
  ),
};

const methodList = Object.values(printMethods);

export default function TechniqueCards() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="techniques"
      ref={ref}
      className="py-32 px-6"
      style={{ background: 'linear-gradient(180deg, #080B14 0%, #0A0D1A 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p
            className="font-mono text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: '#A78BFA', fontFamily: 'JetBrains Mono, monospace' }}
          >
            OUR CRAFT
          </p>
          <h2
            className="font-display font-bold"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(36px, 5vw, 72px)',
              color: '#EEF2FF',
              lineHeight: 1,
            }}
          >
            FOUR WAYS TO<br />
            <span className="gradient-text">MAKE YOUR MARK</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {methodList.map((method, i) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="card-dark p-8 group relative overflow-hidden cursor-pointer"
            >
              {/* Hover gradient border */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(167,139,250,0.1))',
                  border: '1px solid rgba(99,102,241,0.5)',
                }}
              />

              <div className="relative z-10">
                {/* SVG illustration */}
                <div className="mb-6">{svgIllustrations[method.id]}</div>

                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p
                      className="font-mono text-xs tracking-wider mb-1"
                      style={{ color: '#6366F1', fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {method.tagline.toUpperCase()}
                    </p>
                    <h3
                      className="font-display font-bold text-2xl"
                      style={{ fontFamily: 'Syne, sans-serif', color: '#EEF2FF' }}
                    >
                      {method.label}
                    </h3>
                  </div>
                  <span
                    className="font-mono text-sm font-bold px-3 py-1.5 rounded-full whitespace-nowrap"
                    style={{
                      background: 'rgba(167,139,250,0.15)',
                      color: '#C4B5FD',
                      border: '1px solid rgba(167,139,250,0.3)',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    From K{method.basePrice}/unit
                  </span>
                </div>

                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: 'rgba(238,242,255,0.6)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {method.detail}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {method.features.map(f => (
                    <span
                      key={f}
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        background: 'rgba(59,130,246,0.1)',
                        color: '#93C5FD',
                        border: '1px solid rgba(59,130,246,0.2)',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <button
                  className="text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                  style={{ color: '#3B82F6', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  Learn More
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
