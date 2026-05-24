import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ShirtCanvas from './ShirtCanvas';

const words1 = ['YOUR', 'DESIGN.', 'YOUR', 'SHIRT.'];

export default function Hero() {
  const headlineRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const spans = headlineRef.current?.querySelectorAll('.word');
      if (!spans) return;
      gsap.fromTo(
        spans,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center pt-[72px] overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #080B14 0%, #0F1629 60%, #080B14 100%)' }}
    >
      {/* Background gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-16">
        {/* Left */}
        <div className="flex flex-col gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-xs tracking-[0.25em] uppercase"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              color: '#A78BFA',
            }}
          >
            PREMIUM CUSTOM APPAREL · ZAMBIA
          </motion.p>

          <div ref={headlineRef}>
            <h1
              className="font-display leading-[0.92] tracking-tight"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(52px, 7vw, 110px)',
                fontWeight: 800,
              }}
            >
              {words1.map((w, i) => (
                <span
                  key={i}
                  className="word inline-block mr-[0.2em]"
                  style={{ color: '#EEF2FF' }}
                >
                  {w}
                </span>
              ))}
              <br />
              <span
                className="word inline-block gradient-text"
                style={{ opacity: 0 }}
              >
                DELIVERED.
              </span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-base leading-relaxed max-w-md"
            style={{ color: 'rgba(238,242,255,0.7)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Upload your artwork or let us create it. Precision embroidery, screen
            printing &amp; DTG — crafted and delivered across Zambia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/studio" className="btn-primary">
              Start Designing →
            </Link>
            <a href="#how-it-works" className="btn-ghost">
              See How It Works
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            {['🇿🇲 Made in Zambia', '⚡ 5–7 Day Delivery', '💳 Mobile Money Accepted'].map(badge => (
              <span
                key={badge}
                className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                style={{
                  borderColor: 'rgba(99,102,241,0.3)',
                  color: 'rgba(238,242,255,0.6)',
                  background: 'rgba(99,102,241,0.08)',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right — 3D Shirt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative h-[520px] lg:h-[640px]"
        >
          {/* Glow behind shirt */}
          <div
            className="absolute inset-0 m-auto w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          <ShirtCanvas color="#FFFFFF" showParticles autoRotate />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="font-mono text-[10px] tracking-widest"
          style={{ color: 'rgba(167,139,250,0.5)', fontFamily: 'JetBrains Mono, monospace' }}
        >
          SCROLL
        </span>
        <div
          className="w-[1px] h-12 mx-auto"
          style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,0.6), transparent)' }}
        />
      </motion.div>
    </section>
  );
}
