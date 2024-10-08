import Image from 'next/image';
import { contextAtom, penToolAtom } from '@/stores/canvas';
import { useAtom } from 'jotai';
import { COLOR, WIDTH, BRUSH_TYPE } from '@/constants/canvas';
import { cn, getLineWidth } from '@/libs/utils';
import { LineBrushTool } from '@/libs/zwibbler/customTools/LineBrushTool';
import { Separator } from '@/components/ui/separator';

import PenIcon from '@/assets/icon/toolbar/pen/pen_btn_pen.svg';
import MarkerIcon from '@/assets/icon/toolbar/pen/pen_btn_marker.svg';
import LineIcon from '@/assets/icon/toolbar/pen/pen_btn_line.svg';
import ThinIcon from '@/assets/icon/toolbar/common/btn_thickness_01.svg';
import NormalIcon from '@/assets/icon/toolbar/common/btn_thickness_02.svg';
import ThickIcon from '@/assets/icon/toolbar/common/btn_thickness_03.svg';

export default function PenMenu() {
  const [ctx] = useAtom(contextAtom);
  const [penTool, setPenTool] = useAtom(penToolAtom);

  const handleType = (type: string) => {
    if (type === BRUSH_TYPE.LINE) {
      ctx.useCustomTool(new LineBrushTool(ctx, penTool.width, penTool.color));
    } else {
      ctx.useBrushTool({
        lineWidth: getLineWidth(penTool.width, type),
        strokeStyle: penTool.color,
        ...(type === BRUSH_TYPE.MARKER && { opacity: 0.3 }),
        lockPosition: true,
        lockSize: true,
        lockRotation: true,
        _brushType: type,
        _lineWidth: penTool.width,
        // lockRotation: true,
        lockEditMode: true,
        _lockCopy: true,
      });
    }

    setPenTool((prev) => ({ ...prev, type }));
  };

  const handleWidth = (width: number) => {
    if (penTool.type === BRUSH_TYPE.LINE) {
      ctx.useCustomTool(new LineBrushTool(ctx, width, penTool.color));
    } else {
      ctx.useBrushTool({
        lineWidth: getLineWidth(width, penTool.type),
        strokeStyle: penTool.color,
        ...(penTool.type === BRUSH_TYPE.MARKER && { opacity: 0.3 }),
        lockPosition: true,
        lockSize: true,
        lockRotation: true,
        _brushType: penTool.type,
        _lineWidth: width,
        // lockRotation: true,
        lockEditMode: true,
        _lockCopy: true,
      });
    }

    setPenTool((prev) => ({ ...prev, width }));
  };

  const handleColor = (color: string) => {
    if (penTool.type === BRUSH_TYPE.LINE) {
      ctx.useCustomTool(new LineBrushTool(ctx, penTool.width, color));
    } else {
      ctx.useBrushTool({
        lineWidth: getLineWidth(penTool.width, penTool.type),
        ...(penTool.type === BRUSH_TYPE.MARKER && { opacity: 0.3 }),
        strokeStyle: color,
        lockPosition: true,
        lockSize: true,
        lockRotation: true,
        _brushType: penTool.type,
        _lineWidth: penTool.width,
        // lockRotation: true,
        lockEditMode: true,
        _lockCopy: true,
      });
    }

    setPenTool((prev) => ({ ...prev, color }));
  };

  return (
    <div className="h-fit w-fit rounded-lg bg-neutral-200 p-2">
      <div className="h-full bg-white">
        <div className="flex h-full flex-col">
          {/* 種類 */}
          <div className="flex grow items-center justify-center gap-4 py-3">
            {/* ペン */}
            <button
              className={cn(
                'h-[60px] w-[60px] rounded-full',
                penTool.type === BRUSH_TYPE.PEN &&
                  'outline outline-4 -outline-offset-1 outline-destructive'
              )}
              onClick={() => handleType(BRUSH_TYPE.PEN)}
            >
              {/* <PenIcon /> */}
              <Image src={PenIcon} width={60} height={60} alt="" />
            </button>

            {/* マーカー */}
            <button
              className={cn(
                'h-[60px] w-[60px] rounded-full',
                penTool.type === BRUSH_TYPE.MARKER &&
                  'outline outline-4 -outline-offset-1 outline-destructive'
              )}
              onClick={() => handleType(BRUSH_TYPE.MARKER)}
            >
              {/* <MarkerIcon /> */}
              <Image src={MarkerIcon} width={60} height={60} alt="" />
            </button>

            {/* 直線 */}
            <button
              className={cn(
                'h-[60px] w-[60px] rounded-full',
                penTool.type === BRUSH_TYPE.LINE &&
                  'outline outline-4 -outline-offset-1 outline-destructive'
              )}
              onClick={() => handleType(BRUSH_TYPE.LINE)}
            >
              {/* <LineIcon /> */}
              <Image src={LineIcon} width={60} height={60} alt="" />
            </button>
          </div>

          <Separator orientation="horizontal" />

          {/* 太さ */}
          <div className="flex grow items-center justify-center gap-4 py-3">
            <button
              className={cn(
                'h-[60px] w-[60px] rounded-full',
                penTool.width === WIDTH.THIN &&
                  'outline outline-4 -outline-offset-1 outline-destructive'
              )}
              onClick={() => handleWidth(WIDTH.THIN)}
            >
              {/* <ThinIcon /> */}
              <Image src={ThinIcon} width={60} height={60} alt="" />
            </button>
            <button
              className={cn(
                'h-[60px] w-[60px] rounded-full',
                penTool.width === WIDTH.NORMAL &&
                  'outline outline-4 -outline-offset-1 outline-destructive'
              )}
              onClick={() => handleWidth(WIDTH.NORMAL)}
            >
              {/* <NormalIcon /> */}
              <Image src={NormalIcon} width={60} height={60} alt="" />
            </button>
            <button
              className={cn(
                'h-[60px] w-[60px] rounded-full',
                penTool.width === WIDTH.THICK &&
                  'outline outline-4 -outline-offset-1 outline-destructive'
              )}
              onClick={() => handleWidth(WIDTH.THICK)}
            >
              {/* <ThickIcon /> */}
              <Image src={ThickIcon} width={60} height={60} alt="" />
            </button>
          </div>

          <Separator orientation="horizontal" />

          {/* 色 */}
          <div className="flex grow items-center justify-center gap-3 px-4 py-3">
            <button
              className={cn(
                'h-9 w-9 rounded-full bg-black',
                penTool.color === COLOR.BLACK &&
                  'outline outline-4 outline-offset-4 outline-destructive'
              )}
              onClick={() => handleColor(COLOR.BLACK)}
            ></button>
            <button
              className={cn(
                'h-9 w-9 rounded-full border border-neutral-200 bg-white',
                penTool.color === COLOR.WHITE &&
                  'outline outline-4 outline-offset-4 outline-destructive'
              )}
              onClick={() => handleColor(COLOR.WHITE)}
            ></button>
            <button
              className={cn(
                'h-9 w-9 rounded-full bg-cyan-400',
                penTool.color === COLOR.BLUE &&
                  'outline outline-4 outline-offset-4 outline-destructive'
              )}
              onClick={() => handleColor(COLOR.BLUE)}
            ></button>
            <button
              className={cn(
                'h-9 w-9 rounded-full bg-lime-400',
                penTool.color === COLOR.GREEN &&
                  'outline outline-4 outline-offset-4 outline-destructive'
              )}
              onClick={() => handleColor(COLOR.GREEN)}
            ></button>
            <button
              className={cn(
                'h-9 w-9 rounded-full bg-amber-400',
                penTool.color === COLOR.YELLOW &&
                  'outline outline-4 outline-offset-4 outline-destructive'
              )}
              onClick={() => handleColor(COLOR.YELLOW)}
            ></button>
            <button
              className={cn(
                'h-9 w-9 rounded-full bg-rose-400',
                penTool.color === COLOR.RED &&
                  'outline outline-4 outline-offset-4 outline-destructive'
              )}
              onClick={() => handleColor(COLOR.RED)}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
