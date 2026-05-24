import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="pt-20 min-h-screen" style={{ background: '#080B14' }}>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs tracking-[0.25em] mb-6"
          style={{ color: '#A78BFA', fontFamily: 'JetBrains Mono, monospace' }}
        >
          OUR STORY · LUSAKA, ZAMBIA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display font-black mb-8 leading-none"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(48px, 8vw, 100px)',
            color: '#EEF2FF',
          }}
        >
          BORN IN<br />
          <span className="gradient-text">LUSAKA.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 mb-16"
        >
          {[
            'CUSTO was founded by a team of Zambian creatives who believed that premium custom apparel shouldn\'t require flying to South Africa or waiting months for shipping from China.',
            'Based in Lusaka\'s vibrant creative district, we combine local craftsmanship with global quality standards. Every piece is handled with precision — from your initial design file to the final embroidered or screen-printed result.',
            'We serve everyone from individual creators wanting a single statement piece, to corporations needing thousands of branded uniforms. Payments are fully local — Airtel Money, MTN MoMo, bank transfer, or card.',
            'Our mission is simple: make world-class custom apparel accessible to every Zambian, at prices that make sense, with delivery timelines that respect your deadlines.',
          ].map((para, i) => (
            <p
              key={i}
              className="text-lg leading-relaxed"
              style={{ color: 'rgba(238,242,255,0.65)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              {para}
            </p>
          ))}
        </motion.div>

        {/* Values grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {[
            { icon: '🇿🇲', title: 'Proudly Zambian', desc: 'Designed, printed, and delivered from Lusaka. Every kwacha stays local.' },
            { icon: '✨', title: 'Premium Blanks', desc: 'We use Gildan, Stanley, and Bella+Canvas — brands worn by the world\'s top streetwear labels.' },
            { icon: '⚡', title: 'Fast Turnaround', desc: '5–7 days nationally, same-day available in Lusaka for urgent orders.' },
            { icon: '🤝', title: 'Corporate Ready', desc: 'LPOs accepted, invoices provided, bulk pricing available. ISO-level quality for government and enterprise clients.' },
          ].map((val, i) => (
            <div
              key={val.title}
              className="card-dark p-6"
              style={{ borderTop: '3px solid transparent', borderImage: 'linear-gradient(90deg, #3B82F6, #A78BFA) 1' }}
            >
              <div className="text-3xl mb-3">{val.icon}</div>
              <h3
                className="font-display font-bold text-lg mb-2"
                style={{ fontFamily: 'Syne, sans-serif', color: '#EEF2FF' }}
              >
                {val.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(238,242,255,0.5)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {val.desc}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4"
        >
          <Link to="/studio" className="btn-primary">
            Start Designing →
          </Link>
          <a
            href="https://wa.me/260970000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            💬 Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}
