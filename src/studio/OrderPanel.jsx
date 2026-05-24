import { useState } from 'react';
import { Link } from 'react-router-dom';
import { calcTotal } from './pricingLogic';

export default function OrderPanel({ method, garment, shirtColor, size, onExport }) {
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState('');

  const garmentKey = garment === 'T-Shirt' ? 'tshirt' : garment === 'Hoodie' ? 'hoodie' : 'polo';
  const { unitPrice, subtotal, delivery, total } = calcTotal(method, garmentKey, qty);

  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      style={{ background: '#0A0D1A', borderLeft: '1px solid rgba(99,102,241,0.15)' }}
    >
      <div className="p-5 space-y-5">
        {/* Design info */}
        <div>
          <Label>Your Design</Label>
          <div
            className="mt-2 p-3 rounded-xl"
            style={{ background: '#111827', border: '1px solid rgba(99,102,241,0.15)' }}
          >
            <div className="flex gap-3 items-start">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: shirtColor, border: '1px solid rgba(99,102,241,0.2)' }}
              >
                👕
              </div>
              <div>
                <p className="text-xs font-bold mb-0.5" style={{ color: '#EEF2FF', fontFamily: 'Syne, sans-serif' }}>
                  {garment}
                </p>
                <p className="text-xs" style={{ color: 'rgba(238,242,255,0.5)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Size: {size} · {method.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quantity */}
        <div>
          <Label>Quantity</Label>
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-full text-lg font-bold cursor-pointer transition-all hover:bg-[rgba(99,102,241,0.2)] flex items-center justify-center"
              style={{ background: 'rgba(99,102,241,0.1)', color: '#EEF2FF', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              −
            </button>
            <input
              type="number"
              min={1}
              max={500}
              value={qty}
              onChange={e => setQty(Math.max(1, +e.target.value))}
              className="flex-1 text-center py-2 rounded-lg text-sm font-bold outline-none"
              style={{ background: '#111827', border: '1px solid rgba(99,102,241,0.2)', color: '#EEF2FF', fontFamily: 'Syne, sans-serif' }}
            />
            <button
              onClick={() => setQty(q => Math.min(500, q + 1))}
              className="w-9 h-9 rounded-full text-lg font-bold cursor-pointer transition-all hover:bg-[rgba(99,102,241,0.2)] flex items-center justify-center"
              style={{ background: 'rgba(99,102,241,0.1)', color: '#EEF2FF', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              +
            </button>
          </div>
          {qty >= 20 && (
            <p className="text-xs mt-1 text-center" style={{ color: '#A78BFA', fontFamily: 'JetBrains Mono, monospace' }}>
              🎉 Free delivery unlocked!
            </p>
          )}
        </div>

        {/* Price breakdown */}
        <div>
          <Label>Price Breakdown</Label>
          <div
            className="mt-2 rounded-xl p-4 space-y-2.5"
            style={{ background: '#111827', border: '1px solid rgba(99,102,241,0.15)' }}
          >
            {[
              { label: 'Base + print cost', value: `K${unitPrice} × ${qty}` },
              { label: 'Subtotal', value: `K${subtotal}` },
              { label: 'Delivery', value: delivery === 0 ? 'FREE 🚀' : `K${delivery}` },
            ].map(row => (
              <div key={row.label} className="flex justify-between">
                <span className="text-xs" style={{ color: 'rgba(238,242,255,0.5)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {row.label}
                </span>
                <span className="text-xs font-semibold" style={{ color: '#EEF2FF', fontFamily: 'JetBrains Mono, monospace' }}>
                  {row.value}
                </span>
              </div>
            ))}

            <div
              className="pt-2.5 mt-2.5 flex justify-between items-center"
              style={{ borderTop: '1px solid rgba(99,102,241,0.15)' }}
            >
              <span className="text-sm font-bold" style={{ color: '#EEF2FF', fontFamily: 'Syne, sans-serif' }}>
                TOTAL
              </span>
              <span
                className="font-display font-black gradient-text text-xl"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                K{total}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <Label>Special Instructions</Label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            placeholder="Any special instructions for our team..."
            className="w-full mt-2 px-3 py-2.5 rounded-lg text-sm resize-none outline-none"
            style={{
              background: '#111827',
              border: '1px solid rgba(99,102,241,0.2)',
              color: '#EEF2FF',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          />
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <a
            href={`https://wa.me/260970000000?text=Hi%20CUSTO!%20I'd%20like%20to%20order%20${qty}x%20${garment}%20with%20${method}%20printing.%20Total%3A%20K${total}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full justify-center text-sm py-4"
            style={{ display: 'flex', animation: 'pulse-glow 2.5s ease-in-out infinite' }}
          >
            PLACE ORDER →
          </a>
          <a
            href="https://wa.me/260970000000?text=Hi%20CUSTO!%20I'd%20like%20to%20request%20a%20bulk%20quote."
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-xs py-2 transition-colors"
            style={{ color: '#6366F1', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Request a Quote for bulk orders
          </a>

          <button
            onClick={onExport}
            className="w-full py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all hover:opacity-80"
            style={{
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.2)',
              color: '#A78BFA',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            💾 Save Design (PNG)
          </button>
        </div>

        {/* Payment icons */}
        <div className="flex flex-wrap gap-2 justify-center py-2">
          {['📱 Airtel', '📲 MTN', '📡 Zamtel', '🏦 Bank', '💳 Visa'].map(p => (
            <span
              key={p}
              className="text-[10px] px-2 py-1 rounded"
              style={{
                background: 'rgba(99,102,241,0.06)',
                color: 'rgba(238,242,255,0.35)',
                border: '1px solid rgba(99,102,241,0.1)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {p}
            </span>
          ))}
        </div>

        {/* Social proof */}
        <p
          className="text-center text-xs"
          style={{ color: 'rgba(238,242,255,0.3)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          🇿🇲 Crafted in Lusaka · 5–7 day delivery · 200+ happy customers
        </p>
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <p className="text-xs font-bold tracking-wider" style={{ color: 'rgba(238,242,255,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
      {children}
    </p>
  );
}
