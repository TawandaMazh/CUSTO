import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Techniques', to: '/#techniques' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: scrolled ? 'rgba(250,250,247,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid #E5E0D5' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="no-underline flex items-center gap-2.5">
          <span
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: '22px',
              color: '#0C0C0A',
              letterSpacing: '-0.02em',
            }}
          >
            CUSTO
          </span>
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '9px',
              color: '#C9A96E',
              letterSpacing: '0.18em',
              opacity: 0.8,
            }}
          >
            ZM
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="no-underline transition-colors duration-200"
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 500,
                fontSize: '13.5px',
                letterSpacing: '0.01em',
                color: location.pathname === link.to ? '#0C0C0A' : 'rgba(12,12,10,0.5)',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#0C0C0A'}
              onMouseLeave={e => e.currentTarget.style.color = location.pathname === link.to ? '#0C0C0A' : 'rgba(12,12,10,0.5)'}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <Link to="/studio" className="btn-primary" style={{ fontSize: '13px', padding: '10px 24px' }}>
            Start Creating
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
          style={{ cursor: 'pointer', background: 'none', border: 'none' }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="block w-5 h-[1.5px]"
              style={{ background: '#0C0C0A' }}
              animate={{
                rotate: mobileOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                y: mobileOpen ? (i === 0 ? 6.5 : i === 2 ? -6.5 : 0) : 0,
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(250,250,247,0.98)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #E5E0D5' }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className="block py-2 no-underline"
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '18px',
                      color: '#0C0C0A',
                      borderBottom: '1px solid #E5E0D5',
                    }}
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
