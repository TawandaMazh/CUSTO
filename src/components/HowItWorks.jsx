import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Upload or Create',
    body: 'Drop your logo or describe your vision. Our Lusaka design team brings it to life — free on qualifying orders.',
  },
  {
    num: '02',
    title: 'Choose Your Method',
    body: 'Pick from embroidery, screen printing, DTG, or heat transfer vinyl. Select garment, colour, and quantity.',
  },
  {
    num: '03',
    title: 'We Make & Deliver',
    body: 'Crafted at our Lusaka studio. Delivered to your door across Zambia within 5–7 days. Pay via mobile money, bank, or card.',
  },
];

export default function HowItWorks() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-32 px-6"
      style={{ background: '#F2EFE8' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '10px',
              letterSpacing: '0.28em',
              color: '#C9A96E',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            The Process
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
            HOW IT WORKS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.14 }}
              className="relative py-10 pr-12"
              style={{
                borderRight: i < steps.length - 1 ? '1px solid #E5E0D5' : 'none',
                paddingLeft: i > 0 ? '48px' : '0',
              }}
            >
              {/* Big background number */}
              <span
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: i < steps.length - 1 ? '20px' : 'auto',
                  left: i === 0 ? 'auto' : undefined,
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: '96px',
                  color: '#C9A96E',
                  opacity: 0.08,
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {step.num}
              </span>

              <p
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  color: '#C9A96E',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                }}
              >
                Step {step.num}
              </p>

              <h3
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '22px',
                  color: '#0C0C0A',
                  marginBottom: '14px',
                  letterSpacing: '-0.01em',
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: 'rgba(12,12,10,0.5)',
                }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
