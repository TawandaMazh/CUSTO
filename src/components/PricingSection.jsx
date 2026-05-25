import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { quantityTiers, paymentMethods, garmentMultipliers } from '../data/pricing';

const garmentOptions = [
  { id: 'tshirt', label: 'T-Shirt', mult: 1 },
  { id: 'hoodie', label: 'Hoodie', mult: 1.4 },
  { id: 'polo',   label: 'Polo',   mult: 1.2 },
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
      style={{ background: '#F2EFE8' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '10px',
              letterSpacing: '0.28em',
              color: '#C9A96E',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            Transparent Pricing · Zambian Kwacha
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
            PREMIUM QUALITY.<br />
            <span className="gradient-text">LOCAL PRICES.</span>
          </h2>
        </motion.div>

        {/* Garment toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-12"
        >
          {garmentOptions.map(g => (
            <button
              key={g.id}
              onClick={() => setGarment(g.id)}
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                padding: '9px 22px',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: garment === g.id ? '#0C0C0A' : '#FFFFFF',
                color: garment === g.id ? '#FAFAF7' : 'rgba(12,12,10,0.5)',
                border: garment === g.id ? '1.5px solid #0C0C0A' : '1.5px solid #E5E0D5',
              }}
            >
              {g.label}
              {g.mult > 1 && (
                <span style={{ marginLeft: '6px', fontSize: '11px', opacity: 0.6 }}>
                  +{Math.round((g.mult - 1) * 100)}%
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Pricing tiers */}
        <div className="grid md:grid-cols-4 gap-4 mb-14">
          {quantityTiers.map((tier, i) => {
            const price = Math.round(basePrice * mult * (1 - tier.discount));
            const isPopular = tier.badge === 'MOST POPULAR';
            return (
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i + 0.3 }}
                className="relative flex flex-col"
                style={{
                  background: isPopular ? '#0C0C0A' : '#FFFFFF',
                  border: isPopular ? '1.5px solid #0C0C0A' : '1.5px solid #E5E0D5',
                  borderRadius: '16px',
                  padding: '28px 24px',
                }}
              >
                {tier.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-13px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      padding: '4px 14px',
                      borderRadius: '50px',
                      background: isPopular ? '#C9A96E' : '#F2EFE8',
                      color: isPopular ? '#0C0C0A' : '#A07840',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '9.5px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tier.badge}
                  </div>
                )}

                <p
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '9px',
                    letterSpacing: '0.16em',
                    color: isPopular ? 'rgba(250,250,247,0.45)' : '#C9A96E',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
                  {tier.min === 100 ? '100+ units' : `${tier.min}–${tier.max} units`}
                </p>

                <h3
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '16px',
                    color: isPopular ? '#FAFAF7' : '#0C0C0A',
                    marginBottom: '18px',
                  }}
                >
                  {tier.label}
                </h3>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      fontSize: '40px',
                      lineHeight: 1,
                      marginBottom: '4px',
                      color: isPopular ? '#C9A96E' : '#0C0C0A',
                    }}
                  >
                    {tier.min === 100 ? (
                      <span style={{ fontSize: '24px' }}>Custom</span>
                    ) : (
                      <>
                        K{price}
                        <span style={{ fontSize: '14px', fontWeight: 400, opacity: 0.4, marginLeft: '2px' }}>/unit</span>
                      </>
                    )}
                  </div>

                  {tier.discount > 0 && (
                    <p
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '10px',
                        color: isPopular ? '#C9A96E' : '#A07840',
                        marginBottom: '14px',
                      }}
                    >
                      Save {Math.round(tier.discount * 100)}%
                    </p>
                  )}

                  <div
                    style={{
                      fontSize: '11px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      marginBottom: '16px',
                      fontFamily: 'JetBrains Mono, monospace',
                      background: isPopular ? 'rgba(250,250,247,0.06)' : '#F2EFE8',
                      color: isPopular ? 'rgba(250,250,247,0.5)' : 'rgba(12,12,10,0.45)',
                    }}
                  >
                    {tier.delivery === 0 ? '✦ Free Delivery' : `K${tier.delivery} delivery`}
                  </div>
                </div>

                <button
                  style={{
                    width: '100%',
                    padding: '11px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    transition: 'all 0.2s',
                    background: isPopular ? '#C9A96E' : '#0C0C0A',
                    color: '#FAFAF7',
                    border: 'none',
                  }}
                >
                  {tier.min === 100 ? 'Get a Quote' : 'Order Now'}
                </button>
              </motion.div>
            );
          })}
        </div>

        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            color: 'rgba(12,12,10,0.35)',
            marginBottom: '64px',
            letterSpacing: '0.04em',
          }}
        >
          All prices in Zambian Kwacha (ZMW). VAT inclusive. Prices may vary based on design complexity.
        </p>

        {/* Payment methods */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          <p
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '10px',
              letterSpacing: '0.28em',
              color: '#C9A96E',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            Payment Options
          </p>
          <h3
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '28px',
              color: '#0C0C0A',
              marginBottom: '28px',
            }}
          >
            Pay Your Way
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {paymentMethods.map((pm, i) => (
              <motion.div
                key={pm.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.07 }}
                className="card-clean p-5"
              >
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{pm.icon}</div>
                <p
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '15px',
                    color: '#0C0C0A',
                    marginBottom: '6px',
                  }}
                >
                  {pm.name}
                </p>
                <p
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '12px',
                    lineHeight: 1.6,
                    color: 'rgba(12,12,10,0.45)',
                  }}
                >
                  {pm.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div
            style={{
              padding: '14px 20px',
              borderRadius: '12px',
              background: '#FFFFFF',
              border: '1px solid #E5E0D5',
            }}
          >
            <p
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '13px',
                color: 'rgba(12,12,10,0.5)',
              }}
            >
              Invoices provided for all orders. Business Purchase Orders (LPOs) accepted for corporate &amp; government clients.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
