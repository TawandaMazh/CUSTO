import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const SHIRT_IMAGES = {
  front: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80&fit=crop&crop=center',
  back: 'https://images.unsplash.com/photo-1503341338985-95ad05769881?w=600&q=80&fit=crop&crop=center',
};

const DesignCanvas = forwardRef(function DesignCanvas(
  { shirtColor, side = 'front', fabricRef },
  ref
) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const initialized = useRef(false);

  useImperativeHandle(ref, () => ({
    exportPNG(name = 'custo-design') {
      if (!fabricRef?.current) return;
      const url = fabricRef.current.toDataURL({ format: 'png', multiplier: 2 });
      const a = document.createElement('a');
      a.download = `${name}.png`;
      a.href = url;
      a.click();
    },
  }));

  useEffect(() => {
    if (initialized.current || !canvasRef.current) return;
    initialized.current = true;

    let fc;
    import('fabric').then(({ fabric }) => {
      if (!canvasRef.current) return;

      const W = canvasRef.current.parentElement?.offsetWidth || 500;
      const H = Math.round(W * 1.2);

      fc = new fabric.Canvas(canvasRef.current, {
        width: W,
        height: H,
        backgroundColor: 'transparent',
        selection: true,
        preserveObjectStacking: true,
      });

      fabricRef.current = fc;

      // Keyboard delete
      const onKey = (e) => {
        if ((e.key === 'Delete' || e.key === 'Backspace') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
          const obj = fc.getActiveObject();
          if (obj) { fc.remove(obj); fc.renderAll(); }
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
          // Simple undo via saved JSON
          const saved = localStorage.getItem('custo_canvas_prev');
          if (saved) {
            fc.loadFromJSON(JSON.parse(saved), () => fc.renderAll());
          }
        }
      };

      document.addEventListener('keydown', onKey);

      // Persist on change
      fc.on('object:modified', () => {
        const json = fc.toJSON();
        localStorage.setItem('custo_canvas_prev', localStorage.getItem('custo_canvas') || '{}');
        localStorage.setItem('custo_canvas', JSON.stringify(json));
      });
      fc.on('object:added', () => {
        const json = fc.toJSON();
        localStorage.setItem('custo_canvas', JSON.stringify(json));
      });

      // Load saved
      const saved = localStorage.getItem('custo_canvas');
      if (saved) {
        fc.loadFromJSON(JSON.parse(saved), () => fc.renderAll());
      }

      return () => {
        document.removeEventListener('keydown', onKey);
      };
    });

    return () => {
      if (fc) { fc.dispose(); fc = null; fabricRef.current = null; initialized.current = false; }
    };
  }, []);

  // Draw print area guide
  const printAreaStyle = {
    position: 'absolute',
    top: '22%',
    left: '25%',
    width: '50%',
    height: '42%',
    border: '1.5px dashed rgba(167,139,250,0.4)',
    borderRadius: '4px',
    pointerEvents: 'none',
    zIndex: 5,
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ background: '#080B14' }}
    >
      {/* Shirt background image */}
      <div
        className="absolute inset-8 rounded-2xl overflow-hidden"
        style={{
          background: shirtColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Shirt silhouette using CSS */}
        <div
          style={{
            width: '80%',
            height: '90%',
            background: shirtColor,
            clipPath: 'polygon(20% 0%, 80% 0%, 95% 12%, 100% 12%, 100% 100%, 0% 100%, 0% 12%, 5% 12%)',
            position: 'relative',
            border: `1px solid ${shirtColor === '#FFFFFF' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          {/* Collar */}
          <div
            style={{
              position: 'absolute',
              top: '-2%',
              left: '30%',
              width: '40%',
              height: '14%',
              borderRadius: '0 0 50% 50%',
              background: `color-mix(in srgb, ${shirtColor} 90%, black 10%)`,
              border: `1px solid ${shirtColor === '#FFFFFF' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
            }}
          />

          {/* Print area dashed border */}
          <div style={{
            position: 'absolute',
            top: '18%',
            left: '15%',
            width: '70%',
            height: '52%',
            border: '1.5px dashed rgba(167,139,250,0.35)',
            borderRadius: '4px',
            pointerEvents: 'none',
          }} />

          {/* Fabric.js canvas */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
});

export default DesignCanvas;
