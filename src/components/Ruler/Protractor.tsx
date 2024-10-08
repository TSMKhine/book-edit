import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { PointerEvent, useRef } from 'react';
import Moveable from 'react-moveable';
import { contextAtom } from '@/stores/canvas';
import protractorImg from '@/assets/compass/ruler_protractor.png';
import { cn } from '@/libs/utils';
import { TRulerProps } from '@/types/ui';
import useOutsideRuler from '@/hooks/useOutsideRuler';
import {
  BRUSH_TYPE,
  COLOR,
  NODE_TYPE,
  RULER_KIND,
  WIDTH,
} from '@/constants/canvas';
import { RULER } from '@/constants/value';
import { focusedRulerAtom } from '@/stores/ui';
import { CustomButtons } from './Common';

const RULER_WIDTH = 300;

export default function Protractor(props: TRulerProps) {
  const { className, transform, bringToFront } = props;

  const ctx = useAtomValue(contextAtom);
  const focusedRuler = useAtomValue(focusedRulerAtom);

  const moveableRef = useRef<Moveable>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const dragTargetRef = useRef<HTMLDivElement>(null);
  const drawAreaRef = useRef<HTMLDivElement>(null);

  const { wrapperRef, handlePointerDownInside } = useOutsideRuler();

  const handleOnDown = (e: PointerEvent<HTMLDivElement>) => {
    // movable
    const moveable = moveableRef.current?.moveable!;
    // get rect origin
    const { origin } = moveable.getRect();

    const { x, y } = ctx.getDocumentCoordinates(e.pageX, e.pageY);
    const p = getPoint(origin[0], origin[1], x, y, RULER_WIDTH / 2);

    ctx.createNode(NODE_TYPE.BRUSH, {
      points: [p.x, p.y, p.x + 0.001, p.y + 0.001],
      lineWidth: WIDTH.NORMAL,
      strokeStyle: COLOR.BLACK,
      _brushType: BRUSH_TYPE.LINE,
      _lineWidth: WIDTH.NORMAL,
      lockEditMode: true,
      lockPosition: true,
      lockSize: true,
      lockRotation: true,
      _lockCopy: true,
    });

    ctx.commit();
    ctx.clearSelection();
    ctx.usePickTool();
  };

  return (
    <div
      className={cn(className, 'pointer-events-auto relative h-0')}
      onPointerDown={(e) => {
        e.stopPropagation();
        bringToFront();
        handlePointerDownInside(RULER_KIND.PROTRACTOR);
      }}
      ref={wrapperRef}
    >
      <div
        ref={targetRef}
        className="relative h-fit w-fit"
        style={{
          transform,
          transformOrigin: '50% 92%',
          clipPath: 'circle(67% at 50% 100%)',
        }}
      >
        {/* image */}
        <div style={{ width: RULER_WIDTH }}>
          <Image src={protractorImg} alt="" />
        </div>

        {/* draw-area */}
        <div
          ref={drawAreaRef}
          className="absolute w-full"
          style={{
            left: '-5%',
            bottom: '7%',
            height: '100%',
            width: '110%',
            borderRadius: '1000px 1000px 0 0',
          }}
          onPointerDown={handleOnDown}
        ></div>

        {/* drag-area */}
        <div
          ref={dragTargetRef}
          className="absolute bottom-0 left-1/2 h-full w-full -translate-x-1/2"
          style={{
            width: 'calc(100% - 10%)',
            height: 'calc(100% - 9%)',
            borderRadius: '1000px 1000px 0 0',
          }}
        ></div>
      </div>
      <Moveable
        ref={moveableRef}
        target={targetRef}
        dragTarget={dragTargetRef}
        ables={[CustomButtons]}
        props={{ customButtons: focusedRuler === RULER_KIND.PROTRACTOR }}
        rotationTarget={'.moveable-custom-rotation'}
        hideDefaultLines={true}
        origin={false}
        // renderDirections={false}
        // renderDirections={['se']}
        // transformOrigin={'top-left'}

        useResizeObserver={true}
        useMutationObserver={true}
        draggable={true}
        throttleDrag={1}
        scalable={false}
        throttleScale={0.01}
        keepRatio={true}
        throttleResize={1}
        rotatable={true}
        // rotationPosition={'bottom-right'}
        rotationPosition={'none'}
        throttleRotate={1}
        // rotateAroundControls={true}
        // displayAroundControls={true}
        snapRotationThreshold={RULER.THRESHOLD}
        snapRotationDegrees={RULER.DEGREES}
        useAccuratePosition={true}
        onDrag={(e) => {
          e.target.style.transform = e.transform;
        }}
        onScale={(e) => {
          e.target.style.transform = e.drag.transform;
        }}
        onRotate={(e) => {
          e.target.style.transform = e.drag.transform;
        }}
      />
    </div>
  );
}

/**
 *
 * @param x1 中心点x
 * @param y1 中心点y
 * @param x2 選択点x
 * @param y2 選択点y
 * @param l 距離 RULER_WIDTH/2
 * @returns 分度器の座標
 */
function getPoint(x1: number, y1: number, x2: number, y2: number, l: number) {
  const p = { x: 0, y: 0 };

  // 2点間の距離を計算する
  const d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  // 単位ベクトルを計算する
  const unitVectorX = (x2 - x1) / d;
  const unitVectorY = (y2 - y1) / d;

  // 点Aから距離lだけ離れた点Pの座標を計算する
  const x3 = x1 + l * unitVectorX;
  const y3 = y1 + l * unitVectorY;

  // 点Pの座標をオブジェクトとして返す
  return { x: x3, y: y3 };
}
