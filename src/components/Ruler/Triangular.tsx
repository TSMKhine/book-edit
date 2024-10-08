import Image from 'next/image';
import { useAtomValue } from 'jotai';
import { PointerEvent, useRef } from 'react';
import Moveable from 'react-moveable';
import { contextAtom } from '@/stores/canvas';
import trianglularImg from '@/assets/compass/ruler_triangular.png';
import { cn } from '@/libs/utils';
import { TRulerProps } from '@/types/ui';
import useOutsideRuler from '@/hooks/useOutsideRuler';
import { RULER_KIND } from '@/constants/canvas';
import { RULER } from '@/constants/value';
import { focusedRulerAtom } from '@/stores/ui';
import { CustomButtons } from './Common';

const RULER_WIDTH = 338;

export default function Triangular(props: TRulerProps) {
  const { className, transform, rulerTool, handler, bringToFront } = props;

  const ctx = useAtomValue(contextAtom);
  const focusedRuler = useAtomValue(focusedRulerAtom);

  const moveableRef = useRef<Moveable>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const dragTargetRef = useRef<HTMLDivElement>(null);

  const { wrapperRef, handlePointerDownInside } = useOutsideRuler();

  const handleOnDown = (e: PointerEvent<HTMLDivElement>, area: string) => {
    // e.stopPropagation();
    ctx.useCustomTool(rulerTool);

    // movable
    const moveable = moveableRef.current?.moveable!;

    // get rect position
    const { pos1, pos3, pos4 } = moveable.getRect();

    // get point on Line

    // point A on Line (height area)
    let pointA = { x: pos1[0], y: pos1[1] };
    if (area === 'bottom') {
      // point A on Line (bottom area)
      pointA = { x: pos3[0], y: pos3[1] };
    } else if (area === 'slide') {
      // point A on Line (side area)
      pointA = { x: pos1[0], y: pos1[1] };
    }
    // point B on Line (top area)
    let pointB = { x: pos3[0], y: pos3[1] };
    if (area === 'bottom') {
      // point B on Line (bottom area)
      pointB = { x: pos4[0], y: pos4[1] };
    } else if (area === 'slide') {
      // point B on Line (side area)
      pointB = { x: pos4[0], y: pos4[1] };
    }

    handler.handleDown(e, pointA, pointB);
  };

  return (
    <div
      className={cn(className, 'pointer-events-auto relative h-0')}
      onPointerDown={() => {
        bringToFront();
        handlePointerDownInside(RULER_KIND.TRIANGULAR);
      }}
      ref={wrapperRef}
    >
      <div
        ref={targetRef}
        className="relative h-fit w-fit origin-top-left"
        style={{
          transform,
          clipPath:
            'polygon(-10px 0px, 10px 0px, 100% calc(100% - 10px), 100% calc(100% + 10px), -10px calc(100% + 10px))',
        }}
      >
        {/* image */}
        <div
          style={{
            width: RULER_WIDTH,
            clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
          }}
        >
          <Image src={trianglularImg} alt="" />
        </div>
        {/* drag-area */}
        <div
          ref={dragTargetRef}
          className="absolute left-0 top-0 h-full w-full"
          style={{
            clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
          }}
        ></div>

        {/* height-area */}
        <div
          className="absolute -left-[10px] top-[16%] h-[81%] w-[20px]"
          onPointerDown={(e) => handleOnDown(e, 'height')}
        ></div>

        {/* slide-area */}
        <div
          className="absolute origin-top-left rotate-[60deg]"
          style={{
            top: '-6px',
            left: '10px',
            height: '20px',
            width: '200%',
          }}
          onPointerDown={(e) => handleOnDown(e, 'slide')}
        ></div>

        {/* bottom-area */}
        <div
          className="absolute -bottom-[10px] left-0 h-[20px] w-full"
          onPointerDown={(e) => handleOnDown(e, 'bottom')}
        ></div>
      </div>
      <Moveable
        ref={moveableRef}
        target={targetRef}
        dragTarget={dragTargetRef}
        ables={[CustomButtons]}
        props={{ customButtons: focusedRuler === RULER_KIND.TRIANGULAR }}
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
