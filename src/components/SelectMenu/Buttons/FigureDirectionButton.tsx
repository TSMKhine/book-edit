import Image from 'next/image';
import { Popover, Transition } from '@headlessui/react';
import { cn } from '@/libs/utils';
import { useAtom } from 'jotai';
import { contextAtom } from '@/stores/canvas';
import { WRITING_MODE } from '@/constants/canvas';

import DirectionButtonOffIcon from '@/assets/icon/menubar/menu_btn_text_01_off.svg';
import DirectionButtonOnIcon from '@/assets/icon/menubar/menu_btn_text_01_on.svg';
import HorizontalIcon from '@/assets/icon/toolbar/common/btn_muki_yoko.svg';
import VerticalIcon from '@/assets/icon/toolbar/common/btn_muki_tate.svg';

export default function FigureDirectionButton() {
  const [ctx] = useAtom(contextAtom);
  const { writingMode } = ctx.summary.properties;

  const handleTextDirection = (writingDirection: string) => {
    ctx.setNodeProperties(ctx.getSelectedNodes(), {
      writingMode: writingDirection,
    });
  };

  return (
    <Popover className="relative flex h-[45px] w-[75px] items-center justify-center">
      {({ open }) => (
        <>
          <Popover.Button className="relative h-[45px] w-[75px]">
            {open ? (
              // <DirectionButtonOnIcon className="h-full w-full" />
              <Image src={DirectionButtonOnIcon} fill alt="" />
            ) : (
              // <DirectionButtonOffIcon className="h-full w-full" />
              <Image src={DirectionButtonOffIcon} fill alt="" />
            )}
          </Popover.Button>

          <Transition
            // enter="transition duration-150 ease-out"
            // enterFrom="transform translate-y-full opacity-0"
            // enterTo="transform translate-y-0 opacity-100"
            // leave="transition duration-75 ease-out"
            // leaveFrom="transform translate-y-0 opacity-100"
            // leaveTo="transform translate-y-full opacity-0"
            className="absolute bottom-full z-10 mb-0.5 h-fit w-fit min-w-min"
          >
            <Popover.Panel>
              <div className="relative flex items-center justify-center gap-8 rounded-full border border-destructive bg-background px-8 py-2 shadow-md">
                <button
                  className={cn(
                    'h-11 w-16 rounded-sm',
                    writingMode === WRITING_MODE.HORIZONTAL &&
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
                    writingMode === WRITING_MODE.VERTICAL &&
                      'outline outline-4 -outline-offset-1 outline-destructive'
                  )}
                  onClick={() => handleTextDirection(WRITING_MODE.VERTICAL)}
                >
                  {/* <VerticalIcon /> */}
                  <Image src={VerticalIcon} width={64} height={44} alt="" />
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
