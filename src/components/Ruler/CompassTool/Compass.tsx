import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Moveable from 'react-moveable';

import { IPoint } from '@/libs/zwibbler/zwibbler-def';
import headImg from '@/assets/compass/compass_head.png';
import needleImg from '@/assets/compass/compass_needle.png';
import pencilImg from '@/assets/compass/compass_pencil.png';
import rulerImg from '@/assets/compass/compass_ruler.png';

import { TRulerProps } from '@/types/ui';
import { clearTempLayer, cn } from '@/libs/utils';
import { compassPointsAtom, compassStepAtom } from '@/stores/ui';
import { contextAtom, tempContextAtom } from '@/stores/canvas';
import { COLOR, WIDTH } from '@/constants/canvas';

const COMPASS_WIDTH = 430;
const COMPASS_HEIGHT = 350;
const COMPASS_SCALE = 0.7;

let dragPoints: number[] = [];
let dragAngles: number[] = [];
let betweenDegree = 0;
let betweenAngle = Math.PI;

export default function Compass(props: TRulerProps) {
  const { className, transform, bringToFront } = props;

  const ctx = useAtomValue(contextAtom);
  const tempCtx = useAtomValue(tempContextAtom);
  const compassStep = useAtomValue(compassStepAtom);
  const [compassPoints, setCompassPoints] = useAtom(compassPointsAtom);

  const moveablePencilRef = useRef<Moveable>(null);
  const targetCompassRef = useRef<HTMLDivElement>(null);
  const targetPencilRef = useRef<HTMLDivElement>(null);
  const targetHeadRef = useRef<HTMLDivElement>(null);
  const targetNeedleRef = useRef<HTMLDivElement>(null);

  const [beforeDragAngle, setBeforeDragAngle] = useState<number>(0);
  const [compassTranslate, setCompassTranslate] = useState<IPoint>();
  const [compassRotate, setCompassRotate] = useState<number>(0);
  const [centerPos, setCenterPos] = useState<IPoint>();

  const getDragAngle = (
    centerX: number,
    centerY: number,
    clientX: number,
    clientY: number
  ) => {
    const { x, y } = ctx.getDocumentCoordinates(clientX, clientY);
    let angle = Math.atan2(centerY - y, centerX - x);

    if (angle < 0) {
      angle += 2 * Math.PI;
    }

    return angle;
  };

  useEffect(() => {
    return () => {
      // reset
      setCompassPoints({
        center: { x: 0, y: 0 },
        points: [],
      });
      clearTempLayer();
      dragPoints = [];
      dragAngles = [];
      betweenDegree = 0;
      betweenAngle = Math.PI;
    };
  }, []);

  return (
    <div
      // ref={originRef}
      className={cn(className, 'relative h-0')}
      onPointerDown={() => {
        bringToFront();
      }}
    >
      <div
        className="relative h-fit w-fit"
        style={{
          transform,
        }}
      >
        <div
          ref={targetCompassRef}
          className=""
          style={{
            width: COMPASS_WIDTH * 2,
            height: COMPASS_HEIGHT * 2,
          }}
        >
          {/* compass */}
          <div
            // className=" bg-slate-200/50"
            style={{
              width: COMPASS_WIDTH,
              height: COMPASS_HEIGHT,
            }}
          >
            {/* pencil */}
            <div
              ref={targetPencilRef}
              className={cn(
                'pointer-events-auto absolute origin-top-right',
                (compassStep === 1 || compassStep === 2) && 'cursor-pointer',
                'bottom-1/2 right-1/2'
              )}
              style={{
                clipPath:
                  'polygon(57% 0%, 57% 30%, 30% 30%, 0% 45%, 0% 67%, 74% 100%, 100% 100%, 100% 0.0%)',
              }}
            >
              <Image
                src={pencilImg}
                alt=""
                // className="opacity-90"
                width={pencilImg.width * COMPASS_SCALE}
                height={pencilImg.height * COMPASS_SCALE}
              />
            </div>
            {compassStep === 1 && (
              <Moveable
                ref={moveablePencilRef}
                target={targetPencilRef}
                hideDefaultLines={true}
                origin={false}
                useResizeObserver={true}
                useMutationObserver={true}
                draggable={true}
                throttleDrag={1}
                scalable={false}
                useAccuratePosition={true}
                stopPropagation={true}
                preventDefault={true}
                onDrag={(e) => {
                  const { deltaX, deltaY, theta } = getTransform(
                    e.height,
                    0,
                    e.translate[0]
                  );

                  if (deltaX <= 0) {
                    // targetPencilRef.current!.style.transform = `translate(0, ${deltaY}px) rotate(${-theta}deg)`;
                    targetPencilRef.current!.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${-theta}rad)`;
                    // targetNeedleRef.current!.style.transform = `translate(${-deltaX}px, 0) rotate(${theta}deg)`;
                    targetNeedleRef.current!.style.transform = `rotate(${theta}rad)`;
                    // targetHeadRef.current!.style.transform = `translate(0,${deltaY}px)`;
                    targetHeadRef.current!.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                  }
                }}
              />
            )}

            {/* needle */}
            <div
              ref={targetNeedleRef}
              className={cn(
                'pointer-events-auto absolute origin-bottom-left',
                compassStep === 2 && 'cursor-pointer',
                'bottom-1/2 left-1/2'
              )}
              style={{
                clipPath: 'polygon(0% 0%, 0% 100%, 35% 100%, 61% 0%)',
              }}
            >
              <Image
                src={needleImg}
                alt=""
                // className="opacity-90"
                width={needleImg.width * COMPASS_SCALE}
                height={needleImg.height * COMPASS_SCALE}
              />
            </div>

            {/* head */}
            <div
              ref={targetHeadRef}
              className={cn(
                'pointer-events-auto absolute',
                (compassStep === 2 || compassStep === 3) && 'cursor-pointer'
              )}
              style={{
                top: '4%',
                left: '47%',
                clipPath:
                  'polygon(0% 0%, 0% 85%, 40% 100%, 60% 100%, 100% 85%, 100% 0%)',
              }}
            >
              <Image
                src={headImg}
                alt=""
                // className="opacity-90"
                width={headImg.width * COMPASS_SCALE}
                height={headImg.height * COMPASS_SCALE}
              />
            </div>
            {compassStep === 3 && (
              <Moveable
                target={targetHeadRef}
                hideDefaultLines={true}
                origin={false}
                useResizeObserver={true}
                useMutationObserver={true}
                draggable={true}
                throttleDrag={1}
                scalable={false}
                useAccuratePosition={true}
                stopPropagation={true}
                preventDefault={true}
                onDragStart={(e) => {
                  const targetCompass = targetCompassRef.current!;
                  const compassRect = targetCompass.getBoundingClientRect();
                  // get current translate x, y
                  const compassTranslate = extractTranslate(
                    targetCompass.style.transform
                  );
                  setCompassTranslate({
                    x: compassTranslate.x,
                    y: compassTranslate.y,
                  });
                  // set origin x, y
                  const { x: centerX, y: centerY } = ctx.getDocumentCoordinates(
                    compassRect.left + compassRect.width / 2,
                    compassRect.top + compassRect.height / 2
                  );
                  compassPoints.center = { x: centerX, y: centerY };
                  setCenterPos({ x: centerX, y: centerY });

                  // get current rotate angle
                  const compassRotate = extractRotateValue(
                    targetCompass.style.transform
                  );
                  setCompassRotate(compassRotate);

                  // get before dragAngle
                  const dragAngle = getDragAngle(
                    centerX,
                    centerY,
                    e.clientX,
                    e.clientY
                  );

                  setBeforeDragAngle(dragAngle);
                }}
                onDrag={(e) => {
                  if (!centerPos || !tempCtx) return;

                  // get current dragAngle
                  const dragAngle = getDragAngle(
                    centerPos.x,
                    centerPos.y,
                    e.clientX,
                    e.clientY
                  );
                  // diff drag angle
                  const theta = dragAngle - beforeDragAngle;

                  const targetCompass = targetCompassRef.current!;
                  // set compass translate
                  targetCompass.style.transform = `translate(${
                    compassTranslate!.x
                  }px, ${compassTranslate!.y}px) rotate(${
                    compassRotate + theta
                  }rad)`;

                  const targetPencil = targetPencilRef.current!;
                  const pencilTranslate = extractTranslate(
                    targetPencil.style.transform
                  );

                  // get radius
                  const radius = Math.abs(pencilTranslate!.x) * 2;

                  // get pencil point
                  const pencilPos = {
                    x: centerPos.x - radius * Math.cos(compassRotate + theta),
                    y: centerPos.y - radius * Math.sin(compassRotate + theta),
                  };

                  // add pencil points
                  dragPoints.push(pencilPos.x, pencilPos.y);
                  // get before points  & current points
                  let p = dragPoints.slice(-4);
                  const beforePos = { x: p[0], y: p[1] };
                  p = dragPoints.slice(-2);
                  const currentPos = { x: p[0], y: p[1] };

                  // // get angle between two points on move
                  const dTheta = calculateAngle(
                    centerPos,
                    beforePos,
                    currentPos
                  );
                  betweenDegree += dTheta;
                  betweenAngle += dTheta;

                  // add pencil angles
                  if (dragAngles.slice(-1)[0] !== betweenAngle) {
                    dragAngles.push(betweenAngle);
                  }

                  // get drawing points
                  const [beforeAngle, currentAngle] = dragAngles.slice(-2);
                  const drwawingPoints = calculatePoints(
                    centerPos,
                    radius,
                    beforeAngle,
                    currentAngle
                  );

                  // all drawing points
                  compassPoints.points.push(...drwawingPoints);

                  // draw temporary
                  tempCtx.beginPath();
                  tempCtx.arc(
                    centerPos.x,
                    centerPos.y,
                    WIDTH.THIN,
                    0,
                    Math.PI * 2
                  );
                  tempCtx.fill();
                  tempCtx.fillStyle = COLOR.BLACK;

                  tempCtx.beginPath();
                  tempCtx.arc(
                    centerPos.x,
                    centerPos.y,
                    radius,
                    beforeAngle,
                    currentAngle,
                    dTheta < 0
                  );
                  tempCtx.stroke();
                  tempCtx.lineWidth = WIDTH.THIN;
                  tempCtx.strokeStyle = COLOR.BLACK;
                }}
                onDragEnd={(e) => {
                  // initialize
                  dragPoints = [];
                  dragAngles = [];
                  betweenDegree = 0;
                }}
              />
            )}
          </div>
          {/* ruler */}
          {compassStep === 1 && (
            <div className="pointer-events-auto absolute right-1/2 top-1/2">
              <Image src={rulerImg} alt="" className="" />
            </div>
          )}
        </div>
        <Moveable
          target={targetCompassRef}
          hideDefaultLines={true}
          origin={false}
          useResizeObserver={true}
          useMutationObserver={true}
          draggable={true}
          throttleDrag={1}
          scalable={false}
          useAccuratePosition={true}
          stopPropagation={true}
          preventDefault={true}
          onDrag={(e) => {
            if (compassStep === 2) {
              e.target.style.transform = e.transform;
            }
          }}
        />
      </div>
    </div>
  );
}

const getTransform = (height: number, initX: number, deltaX: number) => {
  // 移動後高さ
  const newHeight = Math.sqrt(
    Math.pow(height, 2) - Math.pow(initX + deltaX, 2)
  );
  // 垂直移動距離
  const deltaY = height - newHeight;
  // 回転角度
  const theta = Math.atan2(initX + deltaX, newHeight);

  return { deltaX, deltaY, theta };
};

const extractTranslate = (transformString: string) => {
  const regex = /translate\((-?\d+\.?\d*)px,\s*(-?\d+\.?\d*)px\)/;
  const match = transformString.match(regex);
  return match
    ? { x: parseFloat(match[1]), y: parseFloat(match[2]) }
    : { x: 0, y: 0 };
};

const extractRotateValue = (transformString: string) => {
  const regex = /rotate\((-?\d+\.?\d*)rad\)/;
  const match = transformString.match(regex);
  return match ? parseFloat(match[1]) : 0;
};

const calculateAngle = (C: IPoint, P: IPoint, Q: IPoint) => {
  // check equal point
  if (P.x === Q.x && P.y === Q.y) {
    return 0;
  }

  // vector CP and CQ
  const CP = [P.x - C.x, P.y - C.y];
  const CQ = [Q.x - C.x, Q.y - C.y];

  // Calculate dot product and magnitudes
  const dotProduct = CP[0] * CQ[0] + CP[1] * CQ[1];
  const magnitudeCP = Math.sqrt(CP[0] * CP[0] + CP[1] * CP[1]);
  const magnitudeCQ = Math.sqrt(CQ[0] * CQ[0] + CQ[1] * CQ[1]);

  // Calculate the angle in radians
  const cosTheta = dotProduct / (magnitudeCP * magnitudeCQ);
  let angle = Math.acos(cosTheta);

  const crossProduct = CP[0] * CQ[1] - CP[1] * CQ[0];

  if (crossProduct < 0) {
    angle = -angle;
  }

  return angle;
};

const calculatePoints = (
  center: IPoint,
  radius: number,
  startAngle: number,
  endAngle: number
  // step: number
): number[] => {
  const STEP = 2;
  const points: number[] = [];
  const TWO_PI = 2 * Math.PI;

  let angleDifference = endAngle - startAngle;
  if (angleDifference > TWO_PI) {
    endAngle = startAngle + TWO_PI;
  } else if (angleDifference < -TWO_PI) {
    endAngle = startAngle - TWO_PI;
  }

  if (endAngle >= startAngle) {
    // rotate clockwise
    let angle: number = startAngle;
    while (angle <= endAngle) {
      let x: number = center.x + radius * Math.cos(angle);
      let y: number = center.y + radius * Math.sin(angle);
      points.push(x, y);
      angle += STEP / radius;
    }
  } else {
    // rotate counterclockwise
    let angle: number = startAngle;
    while (angle >= endAngle) {
      let x: number = center.x + radius * Math.cos(angle);
      let y: number = center.y + radius * Math.sin(angle);
      points.push(x, y);
      angle -= STEP / radius;
    }
  }

  return points;
};
