import Image from 'next/image';
import { useAtom } from 'jotai';
import { cn, getFillColor, getTextColor } from '@/libs/utils';
import {
  COLOR,
  FIGURE_KIND,
  FILL_TYPE,
  WIDTH,
  WRITING_MODE,
} from '@/constants/canvas';
import { contextAtom, figureToolAtom } from '@/stores/canvas';
import { PathCommands } from '@/libs/zwibbler/customPaths/PathCommands';
import {
  RectanglePath,
  TrianglePath,
  CirclePath,
  ArrowPath,
  ChatBubblePath,
} from '@/libs/zwibbler/customPaths';
import { Separator } from '@/components/ui/separator';

import SquareIcon from '@/assets/icon/toolbar/figure/figure_btn_square.svg';
import TriangleIcon from '@/assets/icon/toolbar/figure/figure_btn_triangle.svg';
import CircleIcon from '@/assets/icon/toolbar/figure/figure_btn_circle.svg';
import ArrowIcon from '@/assets/icon/toolbar/figure/figure_btn_arrow.svg';
import ChatButtleIcon from '@/assets/icon/toolbar/figure/figure_btn_fukidashi.svg';
import FillIcon from '@/assets/icon/toolbar/figure/figure_btn_nuri.svg';
import FillLineIcon from '@/assets/icon/toolbar/figure/figure_btn_sen.svg';
import FillOffIcon from '@/assets/icon/toolbar/figure/figure_btn_nurinashi.svg';
import FillIcon_Off from '@/assets/icon/toolbar/figure/figure_btn_nuri_off.svg';
import FillLineIcon_Off from '@/assets/icon/toolbar/figure/figure_btn_sen_off.svg';
import FillOffIcon_Off from '@/assets/icon/toolbar/figure/figure_btn_nurinashi_off.svg';
import ThinIcon from '@/assets/icon/toolbar/common/btn_thickness_01.svg';
import NormalIcon from '@/assets/icon/toolbar/common/btn_thickness_02.svg';
import HorizontalIcon from '@/assets/icon/toolbar/common/btn_muki_yoko.svg';
import VerticalIcon from '@/assets/icon/toolbar/common/btn_muki_tate.svg';

export default function FigureMenu() {
  const [ctx] = useAtom(contextAtom);
  const [figureTool, setFigureTool] = useAtom(figureToolAtom);

  const handleFigureClick = (kind: string) => {
    ctx.begin();

    const path = new PathCommands();

    let pathArray;
    if (kind === FIGURE_KIND.RECTANGLE) {
      // 四角
      pathArray = RectanglePath(path);
    } else if (kind === FIGURE_KIND.TRIANGLE) {
      // 三角
      pathArray = TrianglePath(path);
    } else if (kind === FIGURE_KIND.CIRCLE) {
      // 丸
      pathArray = CirclePath(path);
    } else if (kind === FIGURE_KIND.ARROW) {
      // 矢印
      pathArray = ArrowPath(path);
    } else if (kind === FIGURE_KIND.CHAT_BUBBLE) {
      // 吹き出し
      pathArray = ChatBubblePath(path);
    } else {
      return;
    }

    const node = ctx.createNode('PathNode', {
      commands: pathArray,
      roundRadius: 0,
      lineWidth: figureTool.width,
      fillStyle: getFillColor(figureTool.fillType, figureTool.color),
      strokeStyle: figureTool.color,
      textFillStyle: getTextColor(figureTool.fillType, figureTool.color),
      fontSize: 20,
      writingMode: figureTool.writingMode,
      // lockRotation: true,
      lockEditMode: true,
      _fillType: figureTool.fillType,
      _isSticky: false,

      // HACK:
      ...(kind === FIGURE_KIND.CHAT_BUBBLE && { verticalAlign: 'top' }),
    });

    const viewPoint = ctx.getViewRectangle();
    ctx.translateNode(
      node,
      viewPoint.width / 2 + viewPoint.x,
      viewPoint.height / 2 + viewPoint.y
    );
    ctx.commit();
  };

  const handleFillType = (fillType: string) => {
    setFigureTool((prev) => ({ ...prev, fillType }));
  };

  const handleWidth = (width: number) => {
    setFigureTool((prev) => ({ ...prev, width }));
  };

  const handleColor = (color: string) => {
    setFigureTool((prev) => ({ ...prev, color }));
  };

  const handleTextDirection = (writingMode: string) => {
    setFigureTool((prev) => ({ ...prev, writingMode }));
  };

  return (
    <div className="h-fit w-fit rounded-lg bg-neutral-200 p-2">
      <div className="h-full bg-white">
        {/* 図形 */}
        <div className="flex h-full items-center justify-center gap-6 px-10 py-3">
          <button
            className="relative h-[60px] w-[60px]"
            onClick={() => handleFigureClick(FIGURE_KIND.RECTANGLE)}
          >
            {/* <SquareIcon className="*:fill-sky-500" /> */}
            <Image src={SquareIcon} fill alt="" />
          </button>
          <button
            className="relative h-[60px] w-[60px]"
            onClick={() => handleFigureClick(FIGURE_KIND.TRIANGLE)}
          >
            {/* <TriangleIcon className="*:fill-sky-500" /> */}
            <Image src={TriangleIcon} fill alt="" />
          </button>
          <button
            className="relative h-[60px] w-[60px]"
            onClick={() => handleFigureClick(FIGURE_KIND.CIRCLE)}
          >
            {/* <CircleIcon className="*:fill-sky-500" /> */}
            <Image src={CircleIcon} fill alt="" />
          </button>
          <button
            className="relative h-[60px] w-[60px]"
            onClick={() => handleFigureClick(FIGURE_KIND.ARROW)}
          >
            {/* <ArrowIcon className="*:fill-sky-500" /> */}
            <Image src={ArrowIcon} fill alt="" />
          </button>
          <button
            className="relative h-[60px] w-[60px]"
            onClick={() => handleFigureClick(FIGURE_KIND.CHAT_BUBBLE)}
          >
            {/* <ChatButtleIcon className="*:fill-sky-500" /> */}
            <Image src={ChatButtleIcon} fill alt="" />
          </button>
        </div>

        <Separator orientation="horizontal" />

        {/* 塗りつぶし */}
        <div className="flex justify-center gap-12 py-3">
          <button
            className={cn(
              'relative h-10 w-8 fill-secondary'
              // figureTool.fillType === FILL_TYPE.FILL && '*:fill-destructive'
            )}
            onClick={() => handleFillType(FILL_TYPE.FILL)}
          >
            {/* <FillIcon /> */}
            {figureTool.fillType === FILL_TYPE.FILL ? (
              <Image src={FillIcon} fill alt="" />
            ) : (
              <Image src={FillIcon_Off} fill alt="" />
            )}
          </button>
          <button
            className={cn(
              'relative h-10 w-8 fill-secondary'
              // figureTool.fillType === FILL_TYPE.WHITE && '*:fill-destructive'
            )}
            onClick={() => handleFillType(FILL_TYPE.WHITE)}
          >
            {/* <FillLineIcon /> */}
            {figureTool.fillType === FILL_TYPE.WHITE ? (
              <Image src={FillLineIcon} fill alt="" />
            ) : (
              <Image src={FillLineIcon_Off} fill alt="" />
            )}
          </button>
          <button
            className={cn(
              'relative h-10 w-8 fill-secondary'
              // figureTool.fillType === FILL_TYPE.NONE && '*:fill-destructive'
            )}
            onClick={() => handleFillType(FILL_TYPE.NONE)}
          >
            {/* <FillOffIcon /> */}
            {figureTool.fillType === FILL_TYPE.NONE ? (
              <Image src={FillOffIcon} fill alt="" />
            ) : (
              <Image src={FillOffIcon_Off} fill alt="" />
            )}
          </button>
        </div>

        <Separator orientation="horizontal" />

        {/* 線の太さ */}
        <div className="flex grow items-center justify-center gap-4 py-3">
          <button
            className={cn(
              'h-[60px] w-[60px] rounded-full',
              figureTool.width === WIDTH.THIN &&
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
              figureTool.width === WIDTH.NORMAL &&
                'outline outline-4 -outline-offset-1 outline-destructive'
            )}
            onClick={() => handleWidth(WIDTH.NORMAL)}
          >
            {/* <NormalIcon /> */}
            <Image src={NormalIcon} width={60} height={60} alt="" />
          </button>
        </div>

        <Separator orientation="horizontal" />

        {/* 色 */}
        <div className="flex grow items-center justify-center gap-3 px-4 py-3">
          <button
            className={cn(
              'h-9 w-9 rounded-full bg-black',
              figureTool.color === COLOR.BLACK &&
                'outline outline-4 outline-offset-4 outline-destructive'
            )}
            onClick={() => handleColor(COLOR.BLACK)}
          ></button>
          <button
            className={cn(
              'h-9 w-9 rounded-full border border-neutral-200 bg-white',
              figureTool.color === COLOR.WHITE &&
                'outline outline-4 outline-offset-4 outline-destructive'
            )}
            onClick={() => handleColor(COLOR.WHITE)}
          ></button>
          <button
            className={cn(
              'h-9 w-9 rounded-full bg-cyan-400',
              figureTool.color === COLOR.BLUE &&
                'outline outline-4 outline-offset-4 outline-destructive'
            )}
            onClick={() => handleColor(COLOR.BLUE)}
          ></button>
          <button
            className={cn(
              'h-9 w-9 rounded-full bg-lime-400',
              figureTool.color === COLOR.GREEN &&
                'outline outline-4 outline-offset-4 outline-destructive'
            )}
            onClick={() => handleColor(COLOR.GREEN)}
          ></button>
          <button
            className={cn(
              'h-9 w-9 rounded-full bg-amber-400',
              figureTool.color === COLOR.YELLOW &&
                'outline outline-4 outline-offset-4 outline-destructive'
            )}
            onClick={() => handleColor(COLOR.YELLOW)}
          ></button>
          <button
            className={cn(
              'h-9 w-9 rounded-full bg-rose-400',
              figureTool.color === COLOR.RED &&
                'outline outline-4 outline-offset-4 outline-destructive'
            )}
            onClick={() => handleColor(COLOR.RED)}
          ></button>
        </div>

        <Separator orientation="horizontal" />

        {/* 方向 */}
        <div className="flex items-center justify-center gap-10 py-3">
          <button
            className={cn(
              'h-11 w-16 rounded-sm',
              figureTool.writingMode === WRITING_MODE.HORIZONTAL &&
                'outline outline-4 -outline-offset-1 outline-destructive'
            )}
            onClick={() => handleTextDirection(WRITING_MODE.HORIZONTAL)}
          >
            {/* <HorizontalIcon /> */}
            <Image src={HorizontalIcon} width={64} height={44} alt="" />
          </button>
          <button
            className={cn(
              'h-11 w-16 rounded-sm',
              figureTool.writingMode === WRITING_MODE.VERTICAL &&
                'outline outline-4 -outline-offset-1 outline-destructive'
            )}
            onClick={() => handleTextDirection(WRITING_MODE.VERTICAL)}
          >
            {/* <VerticalIcon /> */}
            <Image src={VerticalIcon} width={64} height={44} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
