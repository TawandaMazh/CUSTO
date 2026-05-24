import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Upload or Create',
    body: 'Drop your logo or describe your vision. Our Lusaka design team brings it to life — for free on qualifying orders.',
    icon: '🎨',
  },
  {
    num: '02',
    title: 'Choose Your Method',
    body: 'Pick from embroidery, screen printing, DTG, or heat transfer vinyl. Select garment, colour, and quantity.',
    icon: '⚙️',
  },
  {
    num: '03',
    title: 'We Make & Deliver',
    body: 'Crafted at our Lusaka studio. Delivered to your door across Zambia within 5–7 days. Pay by mobile money, bank transfer, or card.',
    icon: '🚚',
  },
];

export default function HowItWorks() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-32 px-6 relative overflow-hidden"
      style={{ background: '#080B14' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p
            className="font-mono text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: '#A78BFA', fontFamily: 'JetBrains Mono, monospace' }}
          >
            THE PROCESS
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
            HOW IT WORKS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="relative card-dark p-8 overflow-hidden group"
              style={{
                borderTop: '4px solid transparent',
                borderImage: 'linear-gradient(90deg, #3B82F6, #A78BFA) 1',
              }}
            >
              {/* Big background number */}
              <span
                className="absolute -top-4 -right-2 font-display font-black opacity-5 select-none"
                style={{
                  fontSize: '140px',
                  fontFamily: 'Syne, sans-serif',
                  color: '#A78BFA',
                  lineHeight: 1,
                }}
              >
                {step.num}
              </span>

              <div className="relative z-10">
                <div className="text-4xl mb-4">{step.icon}</div>
                <p
                  className="font-mono text-xs tracking-[0.2em] mb-3"
                  style={{ color: '#6366F1', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  STEP {step.num}
                </p>
                <h3
                  className="font-display font-bold text-2xl mb-4"
                  style={{ fontFamily: 'Syne, sans-serif', color: '#EEF2FF' }}
                >
                  {step.title}
                </h3>
                <p
                  className="leading-relaxed text-sm"
                  style={{ color: 'rgba(238,242,255,0.6)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
