import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

export default function CTASection() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="py-40 px-6 relative overflow-hidden"
      style={{ background: '#0C0C0A' }}
    >
      {/* Subtle warm glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(201,169,110,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            letterSpacing: '0.28em',
            color: '#C9A96E',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          Start Today · Free Consultation
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(48px, 8vw, 110px)',
            color: '#FAFAF7',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            marginBottom: '24px',
          }}
        >
          READY TO WEAR<br />
          <span className="gradient-text">YOUR VISION?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '15px',
            lineHeight: 1.7,
            color: 'rgba(250,250,247,0.45)',
            maxWidth: '480px',
            margin: '0 auto 40px',
          }}
        >
          Jump into the Design Studio or chat with our Lusaka team on WhatsApp.
          First design consultation is always free.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Link
            to="/studio"
            style={{
              background: '#C9A96E',
              color: '#0C0C0A',
              border: '1.5px solid #C9A96E',
              borderRadius: '50px',
              padding: '14px 36px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '0.04em',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.25s',
            }}
          >
            Open Design Studio →
          </Link>
          <a
            href="https://wa.me/260970000000?text=Hi%20CUSTO!%20I'd%20like%20to%20chat%20about%20a%20custom%20order."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'transparent',
              color: '#FAFAF7',
              border: '1.5px solid rgba(250,250,247,0.2)',
              borderRadius: '50px',
              padding: '14px 36px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              letterSpacing: '0.04em',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.25s',
            }}
          >
            💬 Chat on WhatsApp
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-8 mt-24 pt-12"
          style={{ borderTop: '1px solid rgba(250,250,247,0.08)' }}
        >
          {[
            { num: '200+', label: 'Happy Customers' },
            { num: '5–7',  label: 'Days to Delivery' },
            { num: '4',    label: 'Print Methods' },
          ].map(stat => (
            <div key={stat.label}>
              <p
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  color: '#C9A96E',
                  marginBottom: '6px',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.num}
              </p>
              <p
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  color: 'rgba(250,250,247,0.3)',
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
