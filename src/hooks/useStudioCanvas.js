import { useEffect, useRef, useCallback } from 'react';

export function useStudioCanvas(canvasRef) {
  const fabricRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || fabricRef.current) return;

    import('fabric').then(({ fabric }) => {
      const fc = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 600,
        backgroundColor: 'transparent',
        selection: true,
        preserveObjectStacking: true,
      });

      fabricRef.current = fc;

      fc.on('object:modified', saveState);
      fc.on('object:added', saveState);
      fc.on('object:removed', saveState);

      // Load saved state
      const saved = localStorage.getItem('custo_canvas');
      if (saved) {
        fc.loadFromJSON(JSON.parse(saved), () => fc.renderAll());
      }
    });

    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = null;
      }
    };
  }, [canvasRef]);

  const saveState = useCallback(() => {
    if (!fabricRef.current) return;
    const json = fabricRef.current.toJSON();
    localStorage.setItem('custo_canvas', JSON.stringify(json));
  }, []);

  const addText = useCallback((text, options = {}) => {
    if (!fabricRef.current) return;
    import('fabric').then(({ fabric }) => {
      const t = new fabric.IText(text, {
        left: 150,
        top: 200,
        fontFamily: options.fontFamily ?? 'Plus Jakarta Sans',
        fontSize: options.fontSize ?? 48,
        fill: options.color ?? '#ffffff',
        fontWeight: options.bold ? 'bold' : 'normal',
        fontStyle: options.italic ? 'italic' : 'normal',
        charSpacing: (options.letterSpacing ?? 0) * 10,
        textTransform: options.uppercase ? 'uppercase' : 'none',
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
        const scale = Math.min(300 / img.width, 300 / img.height);
        img.set({
          left: 100,
          top: 150,
          scaleX: scale,
          scaleY: scale,
          selectable: true,
          hasControls: true,
        });
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
        group.set({ left: 180, top: 200, scaleX: 0.5, scaleY: 0.5, fill: '#A78BFA' });
        fabricRef.current.add(group);
        fabricRef.current.setActiveObject(group);
        fabricRef.current.renderAll();
      });
    });
  }, []);

  const deleteSelected = useCallback(() => {
    if (!fabricRef.current) return;
    const obj = fabricRef.current.getActiveObject();
    if (obj) {
      fabricRef.current.remove(obj);
      fabricRef.current.renderAll();
    }
  }, []);

  const bringForward = useCallback(() => {
    if (!fabricRef.current) return;
    const obj = fabricRef.current.getActiveObject();
    if (obj) {
      fabricRef.current.bringForward(obj);
      fabricRef.current.renderAll();
    }
  }, []);

  const sendBackward = useCallback(() => {
    if (!fabricRef.current) return;
    const obj = fabricRef.current.getActiveObject();
    if (obj) {
      fabricRef.current.sendBackwards(obj);
      fabricRef.current.renderAll();
    }
  }, []);

  const centreObject = useCallback(() => {
    if (!fabricRef.current) return;
    const obj = fabricRef.current.getActiveObject();
    if (obj) {
      obj.center();
      fabricRef.current.renderAll();
    }
  }, []);

  const undo = useCallback(() => {
    // Simple undo: load previous state
    const history = JSON.parse(localStorage.getItem('custo_history') ?? '[]');
    if (history.length > 1) {
      history.pop();
      const prev = history[history.length - 1];
      if (fabricRef.current && prev) {
        fabricRef.current.loadFromJSON(prev, () => fabricRef.current.renderAll());
      }
      localStorage.setItem('custo_history', JSON.stringify(history));
    }
  }, []);

  const exportPNG = useCallback((name = 'custo-design') => {
    if (!fabricRef.current) return;
    const dataURL = fabricRef.current.toDataURL({ format: 'png', multiplier: 2 });
    const link = document.createElement('a');
    link.download = `${name}.png`;
    link.href = dataURL;
    link.click();
  }, []);

  const clearCanvas = useCallback(() => {
    if (!fabricRef.current) return;
    fabricRef.current.clear();
    fabricRef.current.renderAll();
    localStorage.removeItem('custo_canvas');
  }, []);

  return {
    fabricRef,
    addText,
    addImage,
    addShape,
    deleteSelected,
    bringForward,
    sendBackward,
    centreObject,
    undo,
    exportPNG,
    clearCanvas,
  };
}
