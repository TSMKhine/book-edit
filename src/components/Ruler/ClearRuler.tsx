import Image from 'next/image';
import { PointerEvent, useEffect, useRef, useState } from 'react';
import Moveable from 'react-moveable';
import { useAtom, useAtomValue } from 'jotai';
import { contextAtom } from '@/stores/canvas';
import clearRulerImg from '@/assets/compass/ruler_ruler-clear.png';
import { cn } from '@/libs/utils';
import { TRulerProps } from '@/types/ui';
import useOutsideRuler from '@/hooks/useOutsideRuler';
import { RULER_KIND } from '@/constants/canvas';
import { RULER } from '@/constants/value';
import { focusedRulerAtom, isMagnetRulerAtom } from '@/stores/ui';
import { CustomButtons } from './Common';

const RULER_WIDTH = 430;

export default function ClearRuler(props: TRulerProps) {
  const { className, transform, rulerTool, handler, bringToFront } = props;

  const ctx = useAtomValue(contextAtom);
  const focusedRuler = useAtomValue(focusedRulerAtom);
  const [isMagnetRuler, setIsMagnetRuler] = useAtom(isMagnetRulerAtom);

  const [displayAngle, setDisplayAngle] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  const baseLineRef = useRef<HTMLDivElement>(null);
  const arcLineRef = useRef<HTMLDivElement>(null);

  const moveableRef = useRef<Moveable>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const dragTargetRef = useRef<HTMLDivElement>(null);

  const { wrapperRef, handlePointerDownInside } = useOutsideRuler();

  useEffect(() => {
    const arcLine = arcLineRef.current;
    if (arcLine) {
      arcLine.style.clipPath = calculateArcClipPath(displayAngle);
    }
  }, [displayAngle]);

  useEffect(() => {
    return () => {
      setIsMagnetRuler(true);
    };
  }, []);

  const handleOnDown = (e: PointerEvent<HTMLDivElement>, area: string) => {
    // e.stopPropagation();
    ctx.useCustomTool(rulerTool);

    // movable
    const moveable = moveableRef.current?.moveable!;
    // get rect position (pos1, pos2, pos3, pos4)
    const { pos1, pos2, pos3, pos4 } = moveable.getRect();

    // get point on Line
    // point A on Line (top area)
    let pointA = { x: pos1[0], y: pos1[1] };
    if (area === 'bottom') {
      // point A on Line (bottom area)
      pointA = { x: pos3[0], y: pos3[1] };
    }
    // point B on Line (top area)
    let pointB = { x: pos2[0], y: pos2[1] };
    if (area === 'bottom') {
      // point B on Line (bottom area)
      pointB = { x: pos4[0], y: pos4[1] };
    }

    handler.handleDown(e, pointA, pointB);
  };

  return (
    <div
      className={cn(className, 'pointer-events-auto relative h-0')}
      onPointerDown={(e) => {
        e.stopPropagation();
        bringToFront();
        handlePointerDownInside(RULER_KIND.CLEAR_RULER);
      }}
      ref={wrapperRef}
    >
      <div
        ref={targetRef}
        className="relative h-fit w-fit origin-top-left"
        style={{ transform }}
      >
        {/* degree area */}
        <div
          ref={baseLineRef}
          className={cn(
            'absolute top-0 origin-top-left',
            // angle < 15 || angle > 345 ? 'hidden' : 'block'
            isDrawing ? 'block' : 'hidden',
            focusedRuler === RULER_KIND.CLEAR_RULER ? 'visible' : 'invisible'
          )}
        >
          {/* baseline */}
          <div className="w-20">
            <hr
              className={cn(
                'h-[1px] border-0 bg-gray-400',
                displayAngle > 180 && '-translate-x-20'
              )}
            ></hr>
          </div>
          {/* arc line */}
          <div
            ref={arcLineRef}
            className="absolute h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100 opacity-50"
          ></div>
          {/* angle */}
          <div
            className={cn(
              'absolute',
              displayAngle > 180 && 'bottom-0',
              displayAngle > 0 && 'translate-x-8',
              displayAngle > 180 && '-translate-x-16'
            )}
          >
            <div className={cn('pb-2 pt-1.5 text-xl font-bold opacity-100')}>
              {displayAngle > 180 ? displayAngle - 180 : displayAngle}°
            </div>
          </div>
        </div>

        {/* image */}
        <div style={{ width: RULER_WIDTH }}>
          <Image src={clearRulerImg} alt="" />
        </div>

        {/* drag-area */}
        <div ref={dragTargetRef} className="absolute top-0 h-full w-full"></div>

        {/* top-area */}
        <div
          className="absolute -top-[10px] h-[20px] w-full"
          onPointerDown={(e) => handleOnDown(e, 'top')}
        ></div>

        {/* bottom-area */}
        <div
          className="absolute -bottom-[10px] h-[20px] w-full"
          onPointerDown={(e) => handleOnDown(e, 'bottom')}
        ></div>
      </div>
      <Moveable
        ref={moveableRef}
        target={targetRef}
        dragTarget={dragTargetRef}
        ables={[CustomButtons]}
        props={{ customButtons: focusedRuler === RULER_KIND.CLEAR_RULER }}
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
        snapRotationThreshold={isMagnetRuler ? RULER.THRESHOLD : 1}
        snapRotationDegrees={RULER.DEGREES}
        useAccuratePosition={true}
        onDrag={(e) => {
          e.target.style.transform = e.transform;
        }}
        onScale={(e) => {
          e.target.style.transform = e.drag.transform;
        }}
        onRotateStart={() => {
          setIsDrawing(true);
        }}
        onRotate={(e) => {
          e.target.style.transform = e.drag.transform;
          const angle = extractRotateValue(e.drag.transform);
          if (angle !== null) {
            setDisplayAngle(Math.round(angle));
            baseLineRef.current!.style.transform = `rotate(${-angle}deg)`;
          }
        }}
        onRotateEnd={() => {
          setIsDrawing(false);
        }}
      />
    </div>
  );
}

function extractRotateValue(transform: string) {
  const rotateRegex = /rotate\((-?\d+\.?\d*deg)\)/;

  const match = rotateRegex.exec(transform);

  let angle = match ? parseFloat(match[1]) : null;

  if (angle) {
    let normalizedAngle = angle % 360;

    if (normalizedAngle < 0) {
      normalizedAngle += 360;
    }

    return normalizedAngle;
  }

  return angle;
}

function calculateArcClipPath(displayAngle: number) {
  const radian = displayAngle * (Math.PI / 180);

  const x = 50 + 50 * Math.cos(radian);
  const y = 50 + 50 * Math.sin(radian);

  let clipPath = `polygon(50% 50%, 100% 50%, 100% 100%, ${x}% ${y}%)`;
  if (displayAngle > 90) {
    clipPath = `polygon(50% 50%, 100% 50%, 100% 100%, 0% 100%, ${x}% ${y}%)`;
  }
  if (displayAngle > 180) {
    clipPath = `polygon(50% 50%, 0% 50%, 0% 0%, ${x}% ${y}%)`;
    // clipPath = `polygon(50% 50%, 100% 50%, 100% 100%, 0% 100%, 0% 0%, ${x}% ${y}%)`;
  }
  if (displayAngle > 270) {
    clipPath = `polygon(50% 50%, 0% 50%, 0% 0%, 100% 0%, ${x}% ${y}%)`;
    // clipPath = `polygon(50% 50%, 100% 50%, 100% 100%, 0% 100%, 0% 0%, 100% 0%, ${x}% ${y}%)`;
  }
  return clipPath;
}
