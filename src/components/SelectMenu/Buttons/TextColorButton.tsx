import Image from 'next/image';
import { Popover, Transition } from '@headlessui/react';
import { cn } from '@/libs/utils';
import { contextAtom } from '@/stores/canvas';
import { useAtom } from 'jotai';
import { COLOR } from '@/constants/canvas';

import ColorButtonOffIcon from '@/assets/icon/menubar/menu_btn_text_04_off.svg';
import ColorButtonOnIcon from '@/assets/icon/menubar/menu_btn_text_04_on.svg';

export default function TextColorButton() {
  const [ctx] = useAtom(contextAtom);
  const { textFillStyle } = ctx.summary.properties;

  const handleColor = (color: string) => {
    ctx.setNodeProperties(ctx.getSelectedNodes(), {
      textFillStyle: color,
    });
  };
  return (
    <Popover className="relative flex h-[45px] w-[75px] items-center justify-center">
      {({ open }) => (
        <>
          <Popover.Button className="relative h-[45px] w-[75px]">
            {open ? (
              // <ColorButtonOnIcon className="h-full w-full" />
              <Image src={ColorButtonOnIcon} fill alt="" />
            ) : (
              // <ColorButtonOffIcon className="h-full w-full" />
              <Image src={ColorButtonOffIcon} fill alt="" />
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
              <div className="flex grow items-center justify-center gap-3 rounded-full border border-destructive bg-background px-6 py-3 shadow-md">
                <button
                  className={cn(
                    'h-9 w-9 rounded-full bg-black',
                    textFillStyle === COLOR.BLACK &&
                      'outline outline-4 outline-offset-4 outline-destructive'
                  )}
                  onClick={() => handleColor(COLOR.BLACK)}
                ></button>
                <button
                  className={cn(
                    'h-9 w-9 rounded-full border border-neutral-200 bg-white',
                    textFillStyle === COLOR.WHITE &&
                      'outline outline-4 outline-offset-4 outline-destructive'
                  )}
                  onClick={() => handleColor(COLOR.WHITE)}
                ></button>
                <button
                  className={cn(
                    'h-9 w-9 rounded-full bg-cyan-400',
                    textFillStyle === COLOR.BLUE &&
                      'outline outline-4 outline-offset-4 outline-destructive'
                  )}
                  onClick={() => handleColor(COLOR.BLUE)}
                ></button>
                <button
                  className={cn(
                    'h-9 w-9 rounded-full bg-lime-400',
                    textFillStyle === COLOR.GREEN &&
                      'outline outline-4 outline-offset-4 outline-destructive'
                  )}
                  onClick={() => handleColor(COLOR.GREEN)}
                ></button>
                <button
                  className={cn(
                    'h-9 w-9 rounded-full bg-amber-400',
                    textFillStyle === COLOR.YELLOW &&
                      'outline outline-4 outline-offset-4 outline-destructive'
                  )}
                  onClick={() => handleColor(COLOR.YELLOW)}
                ></button>
                <button
                  className={cn(
                    'h-9 w-9 rounded-full bg-rose-400',
                    textFillStyle === COLOR.RED &&
                      'outline outline-4 outline-offset-4 outline-destructive'
                  )}
                  onClick={() => handleColor(COLOR.RED)}
                ></button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
