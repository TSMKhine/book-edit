import { useAtomValue } from 'jotai';
import {
  canvasScaleAtom,
  canvasTranslateXAtom,
  canvasTranslateYAtom,
} from '@/stores/ui';
import { CANVAS_SIZE } from '@/constants/canvas';

import RulerLayer from './RulerLayer';
import TempLayer from './TempLayer';

export default function RootLayer() {
  const canvasTranslateX = useAtomValue(canvasTranslateXAtom);
  const canvasTranslateY = useAtomValue(canvasTranslateYAtom);
  const canvasScale = useAtomValue(canvasScaleAtom);

  return (
    <div
      className="pointer-events-none absolute left-0 top-16 origin-top-left"
      style={{
        height: CANVAS_SIZE.HEIGHT,
        width: CANVAS_SIZE.WIDTH,
        transform: `translate(${canvasTranslateX}px, ${canvasTranslateY}px) scale(${canvasScale})`,
      }}
    >
      <RulerLayer />
      <TempLayer />
    </div>
  );
}
