import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const FONTS = [
  'Syne', 'Plus Jakarta Sans', 'JetBrains Mono', 'Bebas Neue',
  'Oswald', 'Pacifico', 'Dancing Script', 'Roboto Condensed',
];

const SHIRT_COLOURS = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#1A1A1A' },
  { name: 'Navy', hex: '#1E3A5F' },
  { name: 'Charcoal', hex: '#4B5563' },
  { name: 'Lilac', hex: '#C4B5FD' },
  { name: 'Sky Blue', hex: '#93C5FD' },
  { name: 'Forest', hex: '#166534' },
  { name: 'Burgundy', hex: '#7F1D1D' },
  { name: 'Yellow', hex: '#FDE68A' },
];

const SHAPES = [
  { name: 'Star', svg: '<svg viewBox="0 0 100 100"><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#A78BFA"/></svg>' },
  { name: 'Lightning', svg: '<svg viewBox="0 0 100 100"><polygon points="60,5 25,55 50,55 40,95 75,45 50,45" fill="#3B82F6"/></svg>' },
  { name: 'Crown', svg: '<svg viewBox="0 0 100 80"><polygon points="10,70 10,20 30,40 50,10 70,40 90,20 90,70" fill="#A78BFA"/></svg>' },
  { name: 'Flame', svg: '<svg viewBox="0 0 100 120"><path d="M50 5 C80 30 85 60 70 80 C65 70 60 65 58 58 C55 70 50 80 40 90 C20 80 15 60 25 40 C30 50 35 55 38 52 C30 35 40 15 50 5Z" fill="#EF4444"/></svg>' },
  { name: 'Shield', svg: '<svg viewBox="0 0 100 120"><path d="M50 5 L90 20 L90 60 Q90 100 50 115 Q10 100 10 60 L10 20 Z" fill="none" stroke="#6366F1" stroke-width="6"/></svg>' },
  { name: 'Diamond', svg: '<svg viewBox="0 0 100 100"><polygon points="50,5 95,50 50,95 5,50" fill="#A78BFA"/></svg>' },
  { name: 'Circle', svg: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="#3B82F6" stroke-width="6"/></svg>' },
  { name: 'Arrow', svg: '<svg viewBox="0 0 100 100"><path d="M10 50 L70 50 M50 20 L80 50 L50 80" stroke="#A78BFA" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>' },
  { name: 'Wave', svg: '<svg viewBox="0 0 120 60"><path d="M0 30 Q20 5 40 30 T80 30 T120 30" stroke="#6366F1" stroke-width="6" fill="none" stroke-linecap="round"/></svg>' },
  { name: 'Eagle', svg: '<svg viewBox="0 0 120 100"><path d="M60 20 C40 20 10 30 5 50 L30 45 C25 55 20 65 25 80 C35 65 45 58 60 55 C75 58 85 65 95 80 C100 65 95 55 90 45 L115 50 C110 30 80 20 60 20Z" fill="#EF6C00"/><circle cx="60" cy="18" r="8" fill="#EF6C00"/></svg>' },
  { name: 'Logo Mark', svg: '<svg viewBox="0 0 100 100"><text x="50" y="65" text-anchor="middle" font-size="40" font-family="Syne,sans-serif" font-weight="800" fill="url(#g)">C</text><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3B82F6"/><stop offset="100%" stop-color="#A78BFA"/></linearGradient></defs></svg>' },
];

const GARMENTS = ['T-Shirt', 'Hoodie', 'Polo'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const PRINT_METHODS = [
  { id: 'screen', label: 'Screen Printing', desc: 'Sharp vectors & logos, best for bulk' },
  { id: 'embroidery', label: 'Embroidery', desc: 'Premium stitched finish, luxury look' },
  { id: 'dtg', label: 'DTG Printing', desc: 'Photo quality, no minimums' },
  { id: 'vinyl', label: 'Heat Transfer Vinyl', desc: 'Clean edges, names & numbers' },
];

export default function ToolPanel({
  onAddText,
  onAddImage,
  onAddShape,
  onColourChange,
  onGarmentChange,
  onSizeChange,
  onMethodChange,
  onOversizedToggle,
  shirtColor,
  garment,
  size,
  method,
  oversized,
}) {
  const [activeTab, setActiveTab] = useState('text');
  const fileRef = useRef();

  // Text tool state
  const [textInput, setTextInput] = useState('YOUR TEXT');
  const [font, setFont] = useState(FONTS[0]);
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [letterSpacing, setLetterSpacing] = useState(0);

  const handleAddText = () => {
    onAddText(uppercase ? textInput.toUpperCase() : textInput, {
      fontFamily: font,
      fontSize,
      color: textColor,
      bold,
      italic,
      uppercase,
      letterSpacing,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onAddImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const tabs = [
    { id: 'text', label: 'Text', icon: 'T' },
    { id: 'upload', label: 'Upload', icon: '↑' },
    { id: 'shapes', label: 'Shapes', icon: '◆' },
    { id: 'shirt', label: 'Shirt', icon: '👕' },
  ];

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ background: '#0A0D1A', borderRight: '1px solid rgba(99,102,241,0.15)' }}
    >
      {/* Tab bar */}
      <div
        className="flex border-b"
        style={{ borderColor: 'rgba(99,102,241,0.15)' }}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-3 text-xs font-bold transition-all cursor-pointer"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              color: activeTab === tab.id ? '#A78BFA' : 'rgba(238,242,255,0.4)',
              background: activeTab === tab.id ? 'rgba(167,139,250,0.08)' : 'transparent',
              borderBottom: activeTab === tab.id ? '2px solid #A78BFA' : '2px solid transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {/* TEXT TAB */}
        {activeTab === 'text' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <Label>Type Your Text</Label>
            <input
              value={textInput}
              onChange={e => setTextInput(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
              style={{
                background: '#111827',
                border: '1px solid rgba(99,102,241,0.2)',
                color: '#EEF2FF',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
              placeholder="Your text..."
            />

            <Label>Font</Label>
            <select
              value={font}
              onChange={e => setFont(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg text-sm cursor-pointer outline-none"
              style={{
                background: '#111827',
                border: '1px solid rgba(99,102,241,0.2)',
                color: '#EEF2FF',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>

            <Label>Size: {fontSize}px</Label>
            <input
              type="range" min={12} max={120} value={fontSize}
              onChange={e => setFontSize(+e.target.value)}
              className="w-full cursor-pointer"
              style={{ accentColor: '#A78BFA' }}
            />

            <Label>Colour</Label>
            <div className="flex items-center gap-3">
              <input
                type="color" value={textColor}
                onChange={e => setTextColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent"
              />
              <span className="font-mono text-xs" style={{ color: '#A78BFA', fontFamily: 'JetBrains Mono, monospace' }}>
                {textColor}
              </span>
            </div>

            <Label>Style</Label>
            <div className="flex gap-2">
              {[
                { label: 'B', active: bold, toggle: () => setBold(v => !v), style: { fontWeight: 'bold' } },
                { label: 'I', active: italic, toggle: () => setItalic(v => !v), style: { fontStyle: 'italic' } },
                { label: 'AA', active: uppercase, toggle: () => setUppercase(v => !v), style: { fontSize: '10px' } },
              ].map(s => (
                <button
                  key={s.label}
                  onClick={s.toggle}
                  className="px-3 py-1.5 rounded text-xs cursor-pointer transition-all"
                  style={{
                    ...s.style,
                    background: s.active ? 'rgba(167,139,250,0.2)' : 'rgba(99,102,241,0.08)',
                    border: `1px solid ${s.active ? '#A78BFA' : 'rgba(99,102,241,0.2)'}`,
                    color: s.active ? '#A78BFA' : 'rgba(238,242,255,0.5)',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <Label>Letter Spacing: {letterSpacing}</Label>
            <input
              type="range" min={-5} max={20} value={letterSpacing}
              onChange={e => setLetterSpacing(+e.target.value)}
              className="w-full cursor-pointer"
              style={{ accentColor: '#3B82F6' }}
            />

            <button onClick={handleAddText} className="btn-primary w-full justify-center">
              Add to Shirt →
            </button>
          </motion.div>
        )}

        {/* UPLOAD TAB */}
        {activeTab === 'upload' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <Label>Upload Your Design</Label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all hover:border-[#A78BFA]"
              style={{ borderColor: 'rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.04)' }}
            >
              <div className="text-4xl mb-3">☁️</div>
              <p className="font-semibold text-sm mb-1" style={{ color: '#EEF2FF', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Drop your image here
              </p>
              <p className="text-xs" style={{ color: 'rgba(238,242,255,0.4)' }}>
                PNG, JPG, SVG, PDF
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,.svg,.pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
            <p className="text-xs text-center" style={{ color: 'rgba(238,242,255,0.3)', fontFamily: 'JetBrains Mono, monospace' }}>
              Your design will appear on the shirt canvas
            </p>
          </motion.div>
        )}

        {/* SHAPES TAB */}
        {activeTab === 'shapes' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <Label>Design Elements</Label>
            <div className="grid grid-cols-3 gap-2">
              {SHAPES.map(shape => (
                <button
                  key={shape.name}
                  onClick={() => onAddShape(shape.svg)}
                  className="aspect-square rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:scale-105"
                  style={{
                    background: 'rgba(99,102,241,0.08)',
                    border: '1px solid rgba(99,102,241,0.15)',
                  }}
                  title={shape.name}
                >
                  <div
                    className="w-8 h-8"
                    dangerouslySetInnerHTML={{ __html: shape.svg }}
                  />
                  <span className="text-[9px]" style={{ color: 'rgba(238,242,255,0.4)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {shape.name}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* SHIRT TAB */}
        {activeTab === 'shirt' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div>
              <Label>Shirt Colour</Label>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {SHIRT_COLOURS.map(c => (
                  <button
                    key={c.hex}
                    onClick={() => onColourChange(c.hex)}
                    className="relative w-10 h-10 rounded-full cursor-pointer transition-all hover:scale-110"
                    style={{
                      background: c.hex,
                      border: shirtColor === c.hex ? '3px solid #A78BFA' : '2px solid rgba(99,102,241,0.2)',
                      boxShadow: shirtColor === c.hex ? '0 0 12px rgba(167,139,250,0.5)' : 'none',
                    }}
                    title={c.name}
                  >
                    {shirtColor === c.hex && (
                      <span className="absolute inset-0 flex items-center justify-center text-xs">
                        {c.hex === '#FFFFFF' || c.hex === '#FDE68A' ? '✓' : <span style={{ color: 'white' }}>✓</span>}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label>Garment Type</Label>
              <div className="flex gap-2 mt-2">
                {GARMENTS.map(g => (
                  <button
                    key={g}
                    onClick={() => onGarmentChange(g)}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all"
                    style={{
                      background: garment === g ? 'rgba(167,139,250,0.2)' : 'rgba(99,102,241,0.08)',
                      border: `1px solid ${garment === g ? '#A78BFA' : 'rgba(99,102,241,0.15)'}`,
                      color: garment === g ? '#A78BFA' : 'rgba(238,242,255,0.5)',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label>Size</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {SIZES.map(s => (
                  <button
                    key={s}
                    onClick={() => onSizeChange(s)}
                    className="px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-all"
                    style={{
                      background: size === s ? 'linear-gradient(135deg, #3B82F6, #A78BFA)' : 'rgba(99,102,241,0.08)',
                      border: `1px solid ${size === s ? 'transparent' : 'rgba(99,102,241,0.15)'}`,
                      color: 'white',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label>Oversized Fit</Label>
              <button
                onClick={onOversizedToggle}
                className="mt-2 flex items-center gap-3 cursor-pointer"
              >
                <div
                  className="w-10 h-5 rounded-full transition-all relative"
                  style={{ background: oversized ? '#A78BFA' : 'rgba(99,102,241,0.2)' }}
                >
                  <div
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                    style={{ left: oversized ? '22px' : '2px' }}
                  />
                </div>
                <span className="text-xs" style={{ color: 'rgba(238,242,255,0.6)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {oversized ? 'Oversized On' : 'Regular Fit'}
                </span>
              </button>
            </div>

            <div>
              <Label>Print Method</Label>
              <div className="space-y-2 mt-2">
                {PRINT_METHODS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => onMethodChange(m.id)}
                    className="w-full text-left p-3 rounded-lg cursor-pointer transition-all"
                    style={{
                      background: method === m.id ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.05)',
                      border: `1px solid ${method === m.id ? 'rgba(99,102,241,0.5)' : 'rgba(99,102,241,0.1)'}`,
                    }}
                  >
                    <p className="text-xs font-bold mb-0.5" style={{ color: method === m.id ? '#A78BFA' : '#EEF2FF', fontFamily: 'Syne, sans-serif' }}>
                      {m.label}
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(238,242,255,0.4)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      {m.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
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
