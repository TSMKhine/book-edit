import Image from 'next/image';
import { useAtom } from 'jotai';
import { contextAtom, textToolAtom } from '@/stores/canvas';
import { cn } from '@/libs/utils';
import { COLOR, FONT_NAME, WRITING_MODE } from '@/constants/canvas';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

import FontSerifIcon from '@/assets/icon/toolbar/text/text_font_01.svg';
import FontSansIcon from '@/assets/icon/toolbar/text/text_font_02.svg';
import HorizontalIcon from '@/assets/icon/toolbar/common/btn_muki_yoko.svg';
import VerticalIcon from '@/assets/icon/toolbar/common/btn_muki_tate.svg';

export default function TextMenu() {
  const [ctx] = useAtom(contextAtom);
  const [textTool, setTextTool] = useAtom(textToolAtom);

  const handleFontName = (fontName: string) => {
    ctx.useTextTool({
      fontName,
      fontSize: textTool.size,
      textFillStyle: textTool.color,
      writingMode: textTool.writingMode,
      // lockRotation: true,
    });

    setTextTool({ ...textTool, fontName });
  };

  const handleSize = (size: number) => {
    ctx.useTextTool({
      fontName: textTool.fontName,
      fontSize: size,
      textFillStyle: textTool.color,
      writingMode: textTool.writingMode,
      // lockRotation: true,
    });

    setTextTool({ ...textTool, size });
  };

  const handleColor = (color: string) => {
    ctx.useTextTool({
      fontName: textTool.fontName,
      fontSize: textTool.size,
      textFillStyle: color,
      writingMode: textTool.writingMode,
      // lockRotation: true,
    });

    setTextTool({ ...textTool, color });
  };

  const handleDirection = (writingMode: string) => {
    ctx.useTextTool({
      fontName: textTool.fontName,
      fontSize: textTool.size,
      textFillStyle: textTool.color,
      writingMode,
      // lockRotation: true,
    });
    setTextTool({ ...textTool, writingMode });
  };

  return (
    <div className="h-fit w-fit rounded-lg bg-neutral-200 p-2">
      <div className="h-full bg-white">
        <div className="flex h-full flex-col">
          {/* フォント */}
          <div className="flex flex-col items-center justify-center gap-3 py-3 text-lg">
            <button
              className={cn(
                'w-[140px] rounded-full',
                textTool.fontName === FONT_NAME.GOTHIC &&
                  'outline outline-4 -outline-offset-1 outline-destructive'
              )}
              style={{ fontFamily: FONT_NAME.GOTHIC }}
              onClick={() => handleFontName(FONT_NAME.GOTHIC)}
            >
              {/* <FontSerifIcon /> */}
              <Image src={FontSerifIcon} width={140} height={28} alt="" />
            </button>
            <button
              className={cn(
                'w-[140px] rounded-full',
                textTool.fontName === FONT_NAME.MINCHO &&
                  'outline outline-4 -outline-offset-1 outline-destructive'
              )}
              style={{ fontFamily: FONT_NAME.MINCHO }}
              onClick={() => handleFontName(FONT_NAME.MINCHO)}
            >
              {/* <FontSansIcon /> */}
              <Image src={FontSansIcon} width={140} height={28} alt="" />
            </button>
          </div>

          <Separator orientation="horizontal" />

          {/* 文字サイズ */}
          <div className="flex grow flex-col items-center justify-center">
            <div className="flex w-full flex-col py-3">
              <div className="flex items-center justify-center gap-4 px-2">
                <span className="w-10 text-center text-xs">あ</span>
                <Slider
                  className="h-8 w-48"
                  min={10}
                  max={40}
                  step={3}
                  value={[textTool.size]}
                  onValueChange={(value) => {
                    handleSize(value[0]);
                  }}
                />
                <span className="w-10 text-center text-2xl">あ</span>
              </div>
              <div className="text-center">{textTool.size}</div>
            </div>
          </div>

          <Separator orientation="horizontal" />

          {/* 方向 */}
          <div className="flex items-center justify-center gap-10 py-3">
            <button
              className={cn(
                'h-11 w-16 rounded-sm',
                textTool.writingMode === WRITING_MODE.HORIZONTAL &&
                  'outline outline-4 -outline-offset-1 outline-destructive'
              )}
              onClick={() => handleDirection(WRITING_MODE.HORIZONTAL)}
            >
              {/* <HorizontalIcon /> */}
              <Image src={HorizontalIcon} width={64} height={44} alt="" />
            </button>
            <button
              className={cn(
                'h-11 w-16 rounded-sm',
                textTool.writingMode === WRITING_MODE.VERTICAL &&
                  'outline outline-4 -outline-offset-1 outline-destructive'
              )}
              onClick={() => handleDirection(WRITING_MODE.VERTICAL)}
            >
              {/* <VerticalIcon /> */}
              <Image src={VerticalIcon} width={64} height={44} alt="" />
            </button>
          </div>

          <Separator orientation="horizontal" />

          {/* 色 */}
          <div className="flex grow items-center justify-center gap-3 px-4 py-3">
            <button
              className={cn(
                'h-9 w-9 rounded-full bg-black',
                textTool.color === COLOR.BLACK &&
                  'outline outline-4 outline-offset-4 outline-destructive'
              )}
              onClick={() => handleColor(COLOR.BLACK)}
            ></button>
            <button
              className={cn(
                'h-9 w-9 rounded-full border border-neutral-200 bg-white',
                textTool.color === COLOR.WHITE &&
                  'outline outline-4 outline-offset-4 outline-destructive'
              )}
              onClick={() => handleColor(COLOR.WHITE)}
            ></button>
            <button
              className={cn(
                'h-9 w-9 rounded-full bg-cyan-400',
                textTool.color === COLOR.BLUE &&
                  'outline outline-4 outline-offset-4 outline-destructive'
              )}
              onClick={() => handleColor(COLOR.BLUE)}
            ></button>
            <button
              className={cn(
                'h-9 w-9 rounded-full bg-lime-400',
                textTool.color === COLOR.GREEN &&
                  'outline outline-4 outline-offset-4 outline-destructive'
              )}
              onClick={() => handleColor(COLOR.GREEN)}
            ></button>
            <button
              className={cn(
                'h-9 w-9 rounded-full bg-amber-400',
                textTool.color === COLOR.YELLOW &&
                  'outline outline-4 outline-offset-4 outline-destructive'
              )}
              onClick={() => handleColor(COLOR.YELLOW)}
            ></button>
            <button
              className={cn(
                'h-9 w-9 rounded-full bg-rose-400',
                textTool.color === COLOR.RED &&
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
