import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { quantityTiers, paymentMethods, garmentMultipliers, printMethods } from '../data/pricing';

const garmentOptions = [
  { id: 'tshirt', label: 'T-Shirt', mult: 1 },
  { id: 'hoodie', label: 'Hoodie', mult: 1.4 },
  { id: 'polo', label: 'Polo', mult: 1.2 },
];

const basePrice = 95;

export default function PricingSection() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [garment, setGarment] = useState('tshirt');

  const mult = garmentMultipliers[garment] ?? 1;

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-32 px-6"
      style={{ background: '#080B14' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="font-mono text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: '#A78BFA', fontFamily: 'JetBrains Mono, monospace' }}
          >
            TRANSPARENT PRICING · ZAMBIAN KWACHA
          </p>
          <h2
            className="font-display font-bold mb-4"
            style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(36px, 5vw, 72px)', color: '#EEF2FF', lineHeight: 1 }}
          >
            Premium Quality.<br />
            <span className="gradient-text">Local Prices.</span>
          </h2>
        </motion.div>

        {/* Garment toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-3 mb-12"
        >
          {garmentOptions.map(g => (
            <button
              key={g.id}
              onClick={() => setGarment(g.id)}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer"
              style={{
                background: garment === g.id ? 'linear-gradient(135deg, #3B82F6, #A78BFA)' : 'rgba(99,102,241,0.1)',
                color: garment === g.id ? 'white' : 'rgba(238,242,255,0.6)',
                border: garment === g.id ? 'none' : '1px solid rgba(99,102,241,0.2)',
                boxShadow: garment === g.id ? '0 0 20px rgba(99,102,241,0.4)' : 'none',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              {g.label}
              {g.mult > 1 && (
                <span className="ml-1.5 text-xs opacity-70">
                  +{Math.round((g.mult - 1) * 100)}%
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Pricing tiers */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {quantityTiers.map((tier, i) => {
            const price = Math.round(basePrice * mult * (1 - tier.discount));
            const isPopular = tier.badge === 'MOST POPULAR';
            return (
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i + 0.4 }}
                className="relative card-dark p-6 flex flex-col"
                style={{
                  border: isPopular ? '2px solid #3B82F6' : '1px solid rgba(99,102,241,0.15)',
                  boxShadow: isPopular ? '0 0 40px rgba(59,130,246,0.2)' : 'none',
                }}
              >
                {tier.badge && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                    style={{
                      background: isPopular ? 'linear-gradient(90deg, #3B82F6, #A78BFA)' : 'rgba(167,139,250,0.2)',
                      color: 'white',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {tier.badge}
                  </div>
                )}

                <p
                  className="font-mono text-xs tracking-wider mb-2"
                  style={{ color: '#6366F1', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {tier.min === 100 ? '100+ units' : `${tier.min}–${tier.max} units`}
                </p>
                <h3
                  className="font-display font-bold text-lg mb-4"
                  style={{ fontFamily: 'Syne, sans-serif', color: '#EEF2FF' }}
                >
                  {tier.label}
                </h3>

                <div className="flex-1">
                  <div
                    className="font-display font-black mb-1"
                    style={{ fontFamily: 'Syne, sans-serif', fontSize: '42px', color: '#EEF2FF', lineHeight: 1 }}
                  >
                    {tier.min === 100 ? (
                      <span className="gradient-text text-2xl">Custom</span>
                    ) : (
                      <>
                        <span className="gradient-text">K{price}</span>
                        <span className="text-base font-normal opacity-50">/unit</span>
                      </>
                    )}
                  </div>

                  {tier.discount > 0 && (
                    <p className="text-xs mb-4" style={{ color: '#A78BFA', fontFamily: 'JetBrains Mono, monospace' }}>
                      Save {Math.round(tier.discount * 100)}% vs single
                    </p>
                  )}

                  <div
                    className="text-xs py-2 px-3 rounded-lg mb-3"
                    style={{
                      background: tier.delivery === 0 ? 'rgba(59,130,246,0.1)' : 'rgba(99,102,241,0.08)',
                      color: tier.delivery === 0 ? '#93C5FD' : 'rgba(238,242,255,0.5)',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {tier.delivery === 0 ? '🚀 FREE Delivery' : `K${tier.delivery} delivery`}
                  </div>
                </div>

                <button
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer"
                  style={{
                    background: isPopular ? 'linear-gradient(135deg, #3B82F6, #A78BFA)' : 'rgba(99,102,241,0.12)',
                    color: 'white',
                    border: isPopular ? 'none' : '1px solid rgba(99,102,241,0.25)',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                >
                  {tier.min === 100 ? 'Get a Quote' : 'Order Now'}
                </button>
              </motion.div>
            );
          })}
        </div>

        <p
          className="text-center text-xs mb-24"
          style={{ color: 'rgba(238,242,255,0.4)', fontFamily: 'JetBrains Mono, monospace' }}
        >
          All prices in Zambian Kwacha (ZMW). VAT inclusive. Prices may vary based on design complexity.
        </p>

        {/* Payment methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <p
              className="font-mono text-xs tracking-[0.25em] uppercase mb-4"
              style={{ color: '#A78BFA', fontFamily: 'JetBrains Mono, monospace' }}
            >
              FLEXIBLE PAYMENT OPTIONS
            </p>
            <h3
              className="font-display font-bold text-3xl"
              style={{ fontFamily: 'Syne, sans-serif', color: '#EEF2FF' }}
            >
              Pay Your Way
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {paymentMethods.map((pm, i) => (
              <motion.div
                key={pm.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.07 }}
                className="card-dark p-5 group cursor-default"
              >
                <div className="text-3xl mb-3">{pm.icon}</div>
                <p
                  className="font-display font-bold text-base mb-2"
                  style={{ fontFamily: 'Syne, sans-serif', color: '#EEF2FF' }}
                >
                  {pm.name}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'rgba(238,242,255,0.5)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {pm.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div
            className="text-center py-4 px-6 rounded-xl"
            style={{
              background: 'rgba(167,139,250,0.08)',
              border: '1px solid rgba(167,139,250,0.2)',
            }}
          >
            <p
              className="text-sm"
              style={{ color: '#C4B5FD', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              💜 Invoices provided for all orders. Business Purchase Orders (LPOs) accepted for corporate &amp; government clients.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
