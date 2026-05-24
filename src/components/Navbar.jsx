import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavScroll } from '../hooks/useScrollProgress';

const links = [
  { label: 'Home', to: '/' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Products', to: '/#techniques' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Design Studio', to: '/studio' },
];

export default function Navbar() {
  const scrolled = useNavScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(8, 11, 20, 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(99, 102, 241, 0.1)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <span
            className="font-display font-extrabold text-2xl gradient-text tracking-tight"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            CUSTO
          </span>
          <span
            className="font-mono text-[10px] opacity-50 text-[#A78BFA]"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            🇿🇲 LUSAKA
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <NavLink key={link.to} link={link} active={location.pathname === link.to} />
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/studio" className="btn-primary text-sm py-3 px-6">
            Start Creating
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="block w-6 h-[2px] bg-[#EEF2FF]"
              animate={{
                rotate: mobileOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                y: mobileOpen ? (i === 0 ? 7 : i === 2 ? -7 : 0) : 0,
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }}
              transition={{ duration: 0.25 }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(8,11,20,0.96)', backdropFilter: 'blur(20px)' }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className="block text-[#EEF2FF] font-semibold text-lg py-2 border-b border-[rgba(99,102,241,0.1)] no-underline hover:text-[#A78BFA] transition-colors"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/studio" className="btn-primary text-center mt-2">
                Start Creating
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({ link, active }) {
  return (
    <Link
      to={link.to}
      className="relative font-semibold text-sm no-underline group"
      style={{
        color: active ? '#A78BFA' : '#EEF2FF',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
      }}
    >
      {link.label}
      <span
        className="absolute bottom-[-4px] left-0 h-[2px] rounded-full transition-all duration-300"
        style={{
          background: 'linear-gradient(90deg, #3B82F6, #A78BFA)',
          width: active ? '100%' : '0%',
        }}
      />
      <style>{`
        .group:hover span { width: 100% !important; }
      `}</style>
    </Link>
  );
}
