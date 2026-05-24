import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ToolPanel from '../studio/ToolPanel';
import OrderPanel from '../studio/OrderPanel';
import DesignCanvas from '../studio/DesignCanvas';

export default function Studio() {
  const fabricRef = useRef(null);
  const canvasExportRef = useRef(null);

  // Studio state
  const [shirtColor, setShirtColor] = useState('#FFFFFF');
  const [garment, setGarment] = useState('T-Shirt');
  const [size, setSize] = useState('M');
  const [method, setMethod] = useState('screen');
  const [oversized, setOversized] = useState(true);
  const [side, setSide] = useState('front');
  const [previewModal, setPreviewModal] = useState(false);

  // Canvas actions passed down to ToolPanel
  const addText = useCallback((text, options) => {
    if (!fabricRef.current) return;
    import('fabric').then(({ fabric }) => {
      const t = new fabric.IText(text, {
        left: 80,
        top: 100,
        fontFamily: options.fontFamily ?? 'Syne',
        fontSize: options.fontSize ?? 48,
        fill: options.color ?? '#ffffff',
        fontWeight: options.bold ? 'bold' : 'normal',
        fontStyle: options.italic ? 'italic' : 'normal',
        charSpacing: (options.letterSpacing ?? 0) * 10,
        selectable: true,
        hasControls: true,
      });
      fabricRef.current.add(t);
      fabricRef.current.setActiveObject(t);
      fabricRef.current.renderAll();
    });
  }, []);

  const addImage = useCallback((src) => {
    if (!fabricRef.current) return;
    import('fabric').then(({ fabric }) => {
      fabric.Image.fromURL(src, (img) => {
        const maxSize = 200;
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        img.set({ left: 60, top: 80, scaleX: scale, scaleY: scale });
        fabricRef.current.add(img);
        fabricRef.current.setActiveObject(img);
        fabricRef.current.renderAll();
      }, { crossOrigin: 'anonymous' });
    });
  }, []);

  const addShape = useCallback((svgStr) => {
    if (!fabricRef.current) return;
    import('fabric').then(({ fabric }) => {
      fabric.loadSVGFromString(svgStr, (objects, options) => {
        const group = fabric.util.groupSVGElements(objects, options);
        group.set({ left: 80, top: 100, scaleX: 0.8, scaleY: 0.8 });
        fabricRef.current.add(group);
        fabricRef.current.setActiveObject(group);
        fabricRef.current.renderAll();
      });
    });
  }, []);

  const handleExport = useCallback(() => {
    if (!fabricRef.current) return;
    const name = prompt('Name your design:', 'my-custo-design') ?? 'custo-design';
    const url = fabricRef.current.toDataURL({ format: 'png', multiplier: 2 });
    const a = document.createElement('a');
    a.download = `${name}.png`;
    a.href = url;
    a.click();
  }, []);

  const handleClear = useCallback(() => {
    if (!fabricRef.current) return;
    if (confirm('Clear all design elements?')) {
      fabricRef.current.clear();
      fabricRef.current.renderAll();
      localStorage.removeItem('custo_canvas');
    }
  }, []);

  const deleteSelected = useCallback(() => {
    if (!fabricRef.current) return;
    const obj = fabricRef.current.getActiveObject();
    if (obj) { fabricRef.current.remove(obj); fabricRef.current.renderAll(); }
  }, []);

  const centreSelected = useCallback(() => {
    if (!fabricRef.current) return;
    const obj = fabricRef.current.getActiveObject();
    if (obj) { obj.center(); fabricRef.current.renderAll(); }
  }, []);

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: '#080B14', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
    >
      {/* Studio Toolbar */}
      <div
        className="flex items-center justify-between px-6 py-3 flex-shrink-0"
        style={{
          background: 'rgba(10,13,26,0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(99,102,241,0.15)',
          height: '56px',
        }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 no-underline text-sm transition-colors hover:text-[#A78BFA]"
          style={{ color: 'rgba(238,242,255,0.5)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          ← Back to Home
        </Link>

        <h1
          className="font-display font-bold gradient-text"
          style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px' }}
        >
          CUSTO DESIGN STUDIO
        </h1>

        <div className="flex items-center gap-2">
          <ToolbarBtn onClick={handleClear} label="Clear" />
          <ToolbarBtn onClick={handleExport} label="💾 Save PNG" primary />
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-72 flex-shrink-0 overflow-hidden hidden md:block">
          <ToolPanel
            onAddText={addText}
            onAddImage={addImage}
            onAddShape={addShape}
            onColourChange={setShirtColor}
            onGarmentChange={setGarment}
            onSizeChange={setSize}
            onMethodChange={setMethod}
            onOversizedToggle={() => setOversized(v => !v)}
            shirtColor={shirtColor}
            garment={garment}
            size={size}
            method={method}
            oversized={oversized}
          />
        </div>

        {/* Centre — Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Canvas toolbar */}
          <div
            className="flex items-center justify-between px-4 py-2 gap-2 flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(99,102,241,0.1)', background: 'rgba(10,13,26,0.5)' }}
          >
            {/* Front/back toggle */}
            <div className="flex gap-1.5">
              {['front', 'back'].map(s => (
                <button
                  key={s}
                  onClick={() => setSide(s)}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all"
                  style={{
                    background: side === s ? 'rgba(99,102,241,0.2)' : 'transparent',
                    border: `1px solid ${side === s ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.15)'}`,
                    color: side === s ? '#A78BFA' : 'rgba(238,242,255,0.4)',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <CanvasBtn onClick={deleteSelected} label="🗑️ Delete" />
              <CanvasBtn onClick={centreSelected} label="⊙ Centre" />
              <CanvasBtn onClick={() => {
                const obj = fabricRef.current?.getActiveObject();
                if (obj) { fabricRef.current.bringForward(obj); fabricRef.current.renderAll(); }
              }} label="↑ Layer" />
              <CanvasBtn onClick={() => {
                const obj = fabricRef.current?.getActiveObject();
                if (obj) { fabricRef.current.sendBackwards(obj); fabricRef.current.renderAll(); }
              }} label="↓ Layer" />
            </div>
          </div>

          {/* Canvas area */}
          <div className="flex-1 overflow-hidden p-4">
            <DesignCanvas
              ref={canvasExportRef}
              shirtColor={shirtColor}
              side={side}
              fabricRef={fabricRef}
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-72 flex-shrink-0 overflow-hidden hidden lg:block">
          <OrderPanel
            method={method}
            garment={garment}
            shirtColor={shirtColor}
            size={size}
            onExport={handleExport}
          />
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div
        className="md:hidden flex items-center justify-between px-4 py-3"
        style={{ background: 'rgba(10,13,26,0.95)', borderTop: '1px solid rgba(99,102,241,0.15)' }}
      >
        <button
          className="btn-ghost text-xs py-2 px-4 cursor-pointer"
          onClick={handleExport}
        >
          💾 Save
        </button>
        <a
          href="https://wa.me/260970000000?text=I'd%20like%20to%20place%20a%20CUSTO%20order!"
          className="btn-primary text-xs py-2 px-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Order via WhatsApp →
        </a>
      </div>
    </div>
  );
}

function ToolbarBtn({ onClick, label, primary }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all"
      style={{
        background: primary ? 'linear-gradient(135deg, #3B82F6, #A78BFA)' : 'rgba(99,102,241,0.1)',
        border: primary ? 'none' : '1px solid rgba(99,102,241,0.2)',
        color: 'white',
        fontFamily: 'JetBrains Mono, monospace',
        boxShadow: primary ? '0 0 12px rgba(99,102,241,0.3)' : 'none',
      }}
    >
      {label}
    </button>
  );
}

function CanvasBtn({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 rounded text-xs cursor-pointer transition-all hover:bg-[rgba(99,102,241,0.15)]"
      style={{
        background: 'rgba(99,102,241,0.06)',
        border: '1px solid rgba(99,102,241,0.12)',
        color: 'rgba(238,242,255,0.5)',
        fontFamily: 'JetBrains Mono, monospace',
      }}
    >
      {label}
    </button>
  );
}
