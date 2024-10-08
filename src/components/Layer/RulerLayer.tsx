import { PointerEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { contextAtom } from '@/stores/canvas';
import { showRulerAtom } from '@/stores/ui';
import {
  ClearRuler,
  Protractor,
  Triangular,
  TriangularBi,
  Compass,
} from '@/components/Ruler';
import { RulerTool } from '@/libs/zwibbler/customTools/RulerTool';
import { IPoint } from '@/libs/zwibbler/zwibbler-def';
import { RULER_KIND } from '@/constants/canvas';
import { TRulerKind, TShowRuler } from '@/types/ui';

const CompassLayer = forwardRef(function CompassLayer(props, ref) {
  const ctx = useAtomValue(contextAtom);
  const showRuler = useAtomValue(showRulerAtom);

  // for screen center
  const [transform, setTransform] = useState({
    clearRuler: '',
    protractor: '',
    triangularBi: '',
    triangular: '',
    compass: '',
  });

  const prevShowRulerRef = useRef<TShowRuler>(showRuler);

  const rulerTool = new RulerTool(ctx);

  const componentMap = {
    clearRuler: (bringToFront: any) =>
      showRuler.clearRuler && (
        <ClearRuler
          transform={transform.clearRuler}
          rulerTool={rulerTool}
          handler={handler}
          bringToFront={bringToFront}
        />
      ),
    protractor: (bringToFront: any) =>
      showRuler.protractor && (
        <Protractor
          transform={transform.protractor}
          bringToFront={bringToFront}
        />
      ),
    triangular: (bringToFront: any) =>
      showRuler.triangular && (
        <Triangular
          transform={transform.triangular}
          rulerTool={rulerTool}
          handler={handler}
          bringToFront={bringToFront}
        />
      ),
    triangularBi: (bringToFront: any) =>
      showRuler.triangularBi && (
        <TriangularBi
          transform={transform.triangularBi}
          rulerTool={rulerTool}
          handler={handler}
          bringToFront={bringToFront}
        />
      ),
    compass: (bringToFront: any) =>
      showRuler.compass && (
        <Compass transform={transform.compass} bringToFront={bringToFront} />
      ),
  };
  // for rendering order
  const [order, setOrder] = useState(Object.values(RULER_KIND));
  const bringToFront = (key: TRulerKind) => {
    setOrder((prevElements) => [...prevElements.filter((e) => e !== key), key]);
  };

  const rulerMove = (e: any) => {
    const { x, y } = ctx.getDocumentCoordinates(e.pageX, e.pageY);
    rulerTool.onMouseMove(x, y);
  };

  const rulerUp = (e: any) => {
    const { x, y } = ctx.getDocumentCoordinates(e.pageX, e.pageY);
    rulerTool.onMouseUp(x, y);
    document.removeEventListener('pointermove', rulerMove, true);
    document.removeEventListener('pointerup', rulerUp, true);
  };

  const handleDown = (
    e: PointerEvent<HTMLDivElement>,
    pointA: IPoint,
    pointB: IPoint
  ) => {
    const { x, y } = ctx.getDocumentCoordinates(e.pageX, e.pageY);
    rulerTool.onMouseDown(x, y, pointA, pointB);

    document.addEventListener('pointermove', rulerMove, true);
    document.addEventListener('pointerup', rulerUp, true);
  };

  const handler = {
    handleDown,
  };

  useEffect(() => {
    const prevShowRuler = prevShowRulerRef.current;
    prevShowRulerRef.current = showRuler;

    for (const key in showRuler) {
      if (showRuler[key as TRulerKind] !== prevShowRuler[key as TRulerKind]) {
        const viewPoint = ctx.getViewRectangle();

        let transform = `translate(${viewPoint.width / 2 + viewPoint.x}px, ${
          viewPoint.height / 2 + viewPoint.y
        }px)`;

        if (key === RULER_KIND.COMPASS) {
          transform = transform + ' translate(-25%, -25%)';
        } else {
          transform = transform + ' translate(-50%, -50%)';
        }

        setTransform((prev) => ({
          ...prev,
          [key]: transform,
        }));
      }
    }
  }, [showRuler]);

  return (
    <div>
      {order.map((key) => (
        <div key={key}>{componentMap[key](() => bringToFront(key))}</div>
      ))}
    </div>
  );
});

export default CompassLayer;
