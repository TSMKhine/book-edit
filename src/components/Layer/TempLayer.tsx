import { tempContextAtom } from '@/stores/canvas';
import { useSetAtom } from 'jotai';
import { CANVAS_SIZE } from '@/constants/canvas';
import { useEffect, useRef } from 'react';

export default function TempLayer() {
  const setTempCtx = useSetAtom(tempContextAtom);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    canvasEl && setTempCtx(canvasEl.getContext('2d'));
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="temp-canvas"
      width={CANVAS_SIZE.WIDTH}
      height={CANVAS_SIZE.HEIGHT}
    ></canvas>
  );
}
