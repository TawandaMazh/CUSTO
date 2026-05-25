import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ShirtCanvas from './ShirtCanvas';

const words = ['YOUR', 'DESIGN.', 'YOUR', 'SHIRT.'];

export default function Hero() {
  const headlineRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const spans = headlineRef.current?.querySelectorAll('.word');
      if (!spans) return;
      gsap.fromTo(
        spans,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.9, ease: 'power3.out', delay: 0.15 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center pt-[68px] overflow-hidden"
      style={{ background: '#FAFAF7' }}
    >
      {/* Subtle warm orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(201,169,110,0.09) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-8 items-center py-16">
        {/* Left */}
        <div className="flex flex-col gap-7">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '10px',
              letterSpacing: '0.28em',
              color: '#C9A96E',
              textTransform: 'uppercase',
            }}
          >
            Premium Custom Apparel · Lusaka, Zambia
          </motion.p>

          <div ref={headlineRef}>
            <h1
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(54px, 7.5vw, 116px)',
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                color: '#0C0C0A',
              }}
            >
              {words.map((w, i) => (
                <span
                  key={i}
                  className="word inline-block mr-[0.18em]"
                  style={{ opacity: 0 }}
                >
                  {w}
                </span>
              ))}
              <br />
              <span className="word inline-block gradient-text" style={{ opacity: 0 }}>
                DELIVERED.
              </span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'rgba(12,12,10,0.5)',
              maxWidth: '400px',
            }}
          >
            Upload your artwork or let us create it. Precision embroidery,
            screen printing &amp; DTG — handcrafted in Lusaka, delivered across Zambia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-3"
          >
            <Link to="/studio" className="btn-primary">
              Start Designing →
            </Link>
            <a href="#how-it-works" className="btn-ghost">
              See How It Works
            </a>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap gap-2 pt-1"
          >
            {['🇿🇲 Made in Zambia', '⚡ 5–7 Day Delivery', '📱 Mobile Money Accepted'].map(badge => (
              <span
                key={badge}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10.5px',
                  letterSpacing: '0.03em',
                  color: 'rgba(12,12,10,0.45)',
                  background: '#F2EFE8',
                  border: '1px solid #E5E0D5',
                  borderRadius: '50px',
                  padding: '6px 12px',
                }}
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right — 3D shirt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative h-[500px] lg:h-[620px]"
        >
          {/* Soft shadow underneath */}
          <div
            className="absolute bottom-8 left-1/2 pointer-events-none"
            style={{
              transform: 'translateX(-50%)',
              width: '240px',
              height: '40px',
              background: 'radial-gradient(ellipse, rgba(12,12,10,0.12) 0%, transparent 75%)',
              borderRadius: '50%',
            }}
          />
          <ShirtCanvas color="#1A1A1A" showParticles />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '9px',
            letterSpacing: '0.25em',
            color: 'rgba(12,12,10,0.3)',
          }}
        >
          SCROLL
        </span>
        <div
          className="w-[1px] h-10"
          style={{ background: 'linear-gradient(to bottom, rgba(12,12,10,0.3), transparent)' }}
        />
      </motion.div>
    </section>
  );
}
