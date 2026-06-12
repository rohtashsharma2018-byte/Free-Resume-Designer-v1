import React, { useState } from 'react';
import { useTransformEffect, useControls } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut } from 'lucide-react';

export const ZoomControls: React.FC = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  const [scale, setScale] = useState(1);

  useTransformEffect(({ state }) => {
    setScale(state.scale);
  });

  return (
    <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg py-1.5 px-1 gap-0.5 shrink-0">
      <button
        onClick={() => zoomOut(0.1)}
        className="p-1 hover:bg-slate-700 rounded transition cursor-pointer text-slate-300 hover:text-white"
        title="Zoom Out"
      >
        <ZoomOut className="w-4 h-4" />
      </button>
      <span className="text-xs font-mono text-slate-300 w-11 text-center">
        {Math.round(scale * 100)}%
      </span>
      <button
        onClick={() => zoomIn(0.1)}
        className="p-1 hover:bg-slate-700 rounded transition cursor-pointer text-slate-300 hover:text-white"
        title="Zoom In"
      >
        <ZoomIn className="w-4 h-4" />
      </button>
      <button
        onClick={() => resetTransform()}
        className="p-1 ml-0.5 text-xs font-semibold hover:bg-slate-700 rounded transition cursor-pointer text-slate-300 hover:text-white border-l border-slate-700 pl-2"
        title="Reset Zoom"
      >
        Reset
      </button>
    </div>
  );
};
