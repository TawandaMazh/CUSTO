import Gallery from '../components/Gallery';
import { motion } from 'framer-motion';

export default function GalleryPage() {
  return (
    <div className="pt-20" style={{ background: '#080B14', minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs tracking-[0.25em] mb-4"
          style={{ color: '#A78BFA', fontFamily: 'JetBrains Mono, monospace' }}
        >
          OUR WORK · ZAMBIA WIDE
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display font-black mb-4"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(40px, 7vw, 96px)',
            color: '#EEF2FF',
            lineHeight: 0.9,
          }}
        >
          LOOKBOOK
        </motion.h1>
      </div>
      <Gallery />
    </div>
  );
}
