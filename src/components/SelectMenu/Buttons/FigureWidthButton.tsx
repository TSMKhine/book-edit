import Image from 'next/image';
import { Popover, Transition } from '@headlessui/react';
import { cn } from '@/libs/utils';
import { useAtom } from 'jotai';
import { WIDTH } from '@/constants/canvas';
import { contextAtom } from '@/stores/canvas';

import ThicknessButtonOffIcon from '@/assets/icon/menubar/menu_btn_thickness_01_off.svg';
import ThicknessButtonOnIcon from '@/assets/icon/menubar/menu_btn_thickness_01_on.svg';

import ThinIcon from '@/assets/icon/toolbar/common/btn_thickness_01.svg';
import NormalIcon from '@/assets/icon/toolbar/common/btn_thickness_02.svg';

export default function FigureWidthButton() {
  const [ctx] = useAtom(contextAtom);
  const { lineWidth } = ctx.summary.properties;

  const handleWidth = (width: number) => {
    ctx.setNodeProperties(ctx.getSelectedNodes(), {
      lineWidth: width,
    });
  };
  return (
    <Popover className="relative flex h-[45px] w-[75px] items-center justify-center">
      {({ open }) => (
        <>
          <Popover.Button className="relative h-[45px] w-[75px]">
            {open ? (
              // <ThicknessButtonOnIcon className="h-full w-full" />
              <Image src={ThicknessButtonOnIcon} fill alt="" />
            ) : (
              // <ThicknessButtonOffIcon className="h-full w-full" />
              <Image src={ThicknessButtonOffIcon} fill alt="" />
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
              <div className="flex grow items-center justify-center gap-8 rounded-full border border-destructive bg-background px-8 py-2 shadow-md">
                <button
                  className={cn(
                    'h-12 w-12 rounded-full',
                    lineWidth === WIDTH.THIN &&
                      'outline outline-4 -outline-offset-1 outline-destructive'
                  )}
                  onClick={() => handleWidth(WIDTH.THIN)}
                >
                  {/* <ThinIcon /> */}
                  <Image src={ThinIcon} width={60} height={36} alt="" />
                </button>
                <button
                  className={cn(
                    'h-12 w-12 rounded-full',
                    lineWidth === WIDTH.NORMAL &&
                      'outline outline-4 -outline-offset-1 outline-destructive'
                  )}
                  onClick={() => handleWidth(WIDTH.NORMAL)}
                >
                  {/* <NormalIcon /> */}
                  <Image src={NormalIcon} width={60} height={36} alt="" />
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
