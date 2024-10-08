import Image from 'next/image';
import { useAtom } from 'jotai';
import { contextAtom, stickyToolAtom } from '@/stores/canvas';
import { PathCommands } from '@/libs/zwibbler/customPaths/PathCommands';
import StickyPath from '@/libs/zwibbler/customPaths/StickyPath';
import { cn } from '@/libs/utils';
import {
  FONT_NAME,
  STICKY_COLOR,
  WIDTH,
  WRITING_MODE,
} from '@/constants/canvas';
import { Separator } from '@/components/ui/separator';

import OrangeStickyHorizontalIcon from '@/assets/icon/toolbar/sticky/fusen_btn_orange.svg';
import OrangeStickyVerticalIcon from '@/assets/icon/toolbar/sticky/fusen_btn_orange_tate.svg';
import YellowStickyHorizontalIcon from '@/assets/icon/toolbar/sticky/fusen_btn_yellow.svg';
import YellowStickyVerticalIcon from '@/assets/icon/toolbar/sticky/fusen_btn_yellow_tate.svg';
import GreenStickyHorizontalIcon from '@/assets/icon/toolbar/sticky/fusen_btn_green.svg';
import GreenStickyVerticalIcon from '@/assets/icon/toolbar/sticky/fusen_btn_green_tate.svg';
import BlueStickyHorizontalIcon from '@/assets/icon/toolbar/sticky/fusen_btn_blue.svg';
import BlueStickyVerticalIcon from '@/assets/icon/toolbar/sticky/fusen_btn_blue_tate.svg';
import PurpleStickyHorizontalIcon from '@/assets/icon/toolbar/sticky/fusen_btn_purple.svg';
import PurpleStickyVerticalIcon from '@/assets/icon/toolbar/sticky/fusen_btn_purple_tate.svg';
import WhiteStickyHorizontalIcon from '@/assets/icon/toolbar/sticky/fusen_btn_white.svg';
import WhiteStickyVerticalIcon from '@/assets/icon/toolbar/sticky/fusen_btn_white_tate.svg';

import HorizontalIcon from '@/assets/icon/toolbar/common/btn_muki_yoko.svg';
import VerticalIcon from '@/assets/icon/toolbar/common/btn_muki_tate.svg';

export default function StickyMenu() {
  const [ctx] = useAtom(contextAtom);
  const [stickyTool, setStickyTool] = useAtom(stickyToolAtom);

  const handleSticky = (color: string) => {
    ctx.begin();

    const node = ctx.createNode('PathNode', {
      commands: StickyPath(new PathCommands(), stickyTool.writingMode),
      lineWidth: WIDTH.THIN,
      fillStyle: color,
      shadow: '4px 8px 10px #4b556360',
      // textAlign: 'left',
      // verticalAlign: 'top',
      strokeStyle: color,
      fontName: FONT_NAME.GOTHIC,
      fontSize: 20,
      writingMode: stickyTool.writingMode,
      lockRotation: true,
      lockEditMode: true,
      _isSticky: true,
      _isOpened: false,
    });

    const viewPoint = ctx.getViewRectangle();
    ctx.translateNode(
      node,
      viewPoint.width / 2 + viewPoint.x,
      viewPoint.height / 2 + viewPoint.y
    );

    ctx.commit();
  };

  const handleDirection = (writingMode: string) => {
    setStickyTool((prev) => ({ ...prev, writingMode }));
  };

  return (
    <div className="h-fit w-fit rounded-lg bg-neutral-200 p-2">
      <div className="h-full bg-white">
        <div className="flex h-full flex-col">
          {/* 色 */}
          <div className="grid w-72 grid-cols-3 grid-rows-2 items-center justify-items-center gap-6 p-4">
            <button
              className="w-16"
              style={{ backgroundColor: STICKY_COLOR.ORANGE }}
              onClick={() => {
                handleSticky(STICKY_COLOR.ORANGE);
              }}
            >
              {stickyTool.writingMode === WRITING_MODE.VERTICAL ? (
                // <OrangeStickyVerticalIcon />
                <Image
                  src={OrangeStickyVerticalIcon}
                  width={60}
                  height={60}
                  alt=""
                />
              ) : (
                // <OrangeStickyHorizontalIcon />
                <Image
                  src={OrangeStickyHorizontalIcon}
                  width={60}
                  height={60}
                  alt=""
                />
              )}
            </button>
            <button
              className="w-16"
              style={{ backgroundColor: STICKY_COLOR.YELLOW }}
              onClick={() => {
                handleSticky(STICKY_COLOR.YELLOW);
              }}
            >
              {stickyTool.writingMode === WRITING_MODE.VERTICAL ? (
                // <YellowStickyVerticalIcon />
                <Image
                  src={YellowStickyVerticalIcon}
                  width={60}
                  height={60}
                  alt=""
                />
              ) : (
                // <YellowStickyHorizontalIcon />
                <Image
                  src={YellowStickyHorizontalIcon}
                  width={60}
                  height={60}
                  alt=""
                />
              )}
            </button>
            <button
              className="w-16"
              style={{ backgroundColor: STICKY_COLOR.GREEN }}
              onClick={() => {
                handleSticky(STICKY_COLOR.GREEN);
              }}
            >
              {stickyTool.writingMode === WRITING_MODE.VERTICAL ? (
                // <GreenStickyVerticalIcon />
                <Image
                  src={GreenStickyVerticalIcon}
                  width={60}
                  height={60}
                  alt=""
                />
              ) : (
                // <GreenStickyHorizontalIcon />
                <Image
                  src={GreenStickyHorizontalIcon}
                  width={60}
                  height={60}
                  alt=""
                />
              )}
            </button>
            <button
              className="w-16"
              style={{ backgroundColor: STICKY_COLOR.BLUE }}
              onClick={() => {
                handleSticky(STICKY_COLOR.BLUE);
              }}
            >
              {stickyTool.writingMode === WRITING_MODE.VERTICAL ? (
                // <BlueStickyVerticalIcon />
                <Image
                  src={BlueStickyVerticalIcon}
                  width={60}
                  height={60}
                  alt=""
                />
              ) : (
                // <BlueStickyHorizontalIcon />
                <Image
                  src={BlueStickyHorizontalIcon}
                  width={60}
                  height={60}
                  alt=""
                />
              )}
            </button>
            <button
              className="w-16"
              style={{ backgroundColor: STICKY_COLOR.PURPLE }}
              onClick={() => {
                handleSticky(STICKY_COLOR.PURPLE);
              }}
            >
              {stickyTool.writingMode === WRITING_MODE.VERTICAL ? (
                // <PurpleStickyVerticalIcon />
                <Image
                  src={PurpleStickyVerticalIcon}
                  width={60}
                  height={60}
                  alt=""
                />
              ) : (
                // <PurpleStickyHorizontalIcon />
                <Image
                  src={PurpleStickyHorizontalIcon}
                  width={60}
                  height={60}
                  alt=""
                />
              )}
            </button>
            <button
              className="w-16"
              style={{ backgroundColor: STICKY_COLOR.WHITE }}
              onClick={() => {
                handleSticky(STICKY_COLOR.WHITE);
              }}
            >
              {stickyTool.writingMode === WRITING_MODE.VERTICAL ? (
                // <WhiteStickyVerticalIcon />
                <Image
                  src={WhiteStickyVerticalIcon}
                  width={60}
                  height={60}
                  alt=""
                />
              ) : (
                // <WhiteStickyHorizontalIcon />
                <Image
                  src={WhiteStickyHorizontalIcon}
                  width={60}
                  height={60}
                  alt=""
                />
              )}
            </button>
          </div>

          <Separator orientation="horizontal" />

          {/* 方向 */}
          <div className="flex items-center justify-center gap-10 py-3">
            <button
              className={cn(
                'h-11 w-16 rounded-sm',
                stickyTool.writingMode === WRITING_MODE.HORIZONTAL &&
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
                stickyTool.writingMode === WRITING_MODE.VERTICAL &&
                  'outline outline-4 -outline-offset-1 outline-destructive'
              )}
              onClick={() => handleDirection(WRITING_MODE.VERTICAL)}
            >
              {/* <VerticalIcon /> */}
              <Image src={VerticalIcon} width={64} height={44} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
