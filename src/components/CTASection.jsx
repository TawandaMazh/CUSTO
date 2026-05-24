import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

export default function CTASection() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="py-40 px-6 relative overflow-hidden"
      style={{ background: '#080B14' }}
    >
      {/* Glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-mono text-xs tracking-[0.25em] uppercase mb-6"
          style={{ color: '#A78BFA', fontFamily: 'JetBrains Mono, monospace' }}
        >
          START TODAY · FREE CONSULTATION
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-display font-black mb-6 leading-none"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(48px, 8vw, 110px)',
            color: '#EEF2FF',
          }}
        >
          READY TO WEAR<br />
          <span className="gradient-text">YOUR VISION?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-lg mb-10 max-w-xl mx-auto"
          style={{ color: 'rgba(238,242,255,0.6)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          Jump into the Design Studio or chat with our Lusaka team on WhatsApp.
          First design consultation is always free.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to="/studio" className="btn-primary text-base px-10 py-4">
            Open Design Studio →
          </Link>
          <a
            href="https://wa.me/260970000000?text=Hi%20CUSTO!%20I'd%20like%20to%20chat%20about%20a%20custom%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-base px-10 py-4"
            style={{ borderColor: '#25D366', color: '#25D366' }}
          >
            💬 Chat on WhatsApp
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-8 mt-20 pt-12"
          style={{ borderTop: '1px solid rgba(99,102,241,0.15)' }}
        >
          {[
            { num: '200+', label: 'Happy Customers' },
            { num: '5–7', label: 'Days to Delivery' },
            { num: '4', label: 'Print Methods' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p
                className="font-display font-black gradient-text mb-2"
                style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)' }}
              >
                {stat.num}
              </p>
              <p
                className="text-sm"
                style={{ color: 'rgba(238,242,255,0.4)', fontFamily: 'JetBrains Mono, monospace' }}
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
