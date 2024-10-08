import Image from 'next/image';
import { useAtom } from 'jotai';
import { contextAtom } from '@/stores/canvas';
import { cn, getFillColor, getTextColor } from '@/libs/utils';
import { COLOR } from '@/constants/canvas';
import { Popover, Transition } from '@headlessui/react';

import ColorButtonOffIcon from '@/assets/icon/menubar/menu_btn_color_01_off.svg';
import ColorButtonOnIcon from '@/assets/icon/menubar/menu_btn_color_01_on.svg';

export default function FigureColorButton() {
  const [ctx] = useAtom(contextAtom);
  const { strokeStyle } = ctx.summary.properties;

  const handleColor = (color: string) => {
    const nodes = ctx.getSelectedNodes();
    nodes.map((node) => {
      const fillType = ctx.getNodeProperty(node, '_fillType');
      const fillColor = getFillColor(fillType, color);
      const textFillColor = getTextColor(fillType, color);
      ctx.setNodeProperties(node, {
        fillStyle: fillColor,
        strokeStyle: color,
        textFillStyle: textFillColor,
      });
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
                    strokeStyle === COLOR.BLACK &&
                      'outline outline-4 outline-offset-4 outline-destructive'
                  )}
                  onClick={() => handleColor(COLOR.BLACK)}
                ></button>
                <button
                  className={cn(
                    'h-9 w-9 rounded-full border border-neutral-200 bg-white',
                    strokeStyle === COLOR.WHITE &&
                      'outline outline-4 outline-offset-4 outline-destructive'
                  )}
                  onClick={() => handleColor(COLOR.WHITE)}
                ></button>
                <button
                  className={cn(
                    'h-9 w-9 rounded-full bg-cyan-400',
                    strokeStyle === COLOR.BLUE &&
                      'outline outline-4 outline-offset-4 outline-destructive'
                  )}
                  onClick={() => handleColor(COLOR.BLUE)}
                ></button>
                <button
                  className={cn(
                    'h-9 w-9 rounded-full bg-lime-400',
                    strokeStyle === COLOR.GREEN &&
                      'outline outline-4 outline-offset-4 outline-destructive'
                  )}
                  onClick={() => handleColor(COLOR.GREEN)}
                ></button>
                <button
                  className={cn(
                    'h-9 w-9 rounded-full bg-amber-400',
                    strokeStyle === COLOR.YELLOW &&
                      'outline outline-4 outline-offset-4 outline-destructive'
                  )}
                  onClick={() => handleColor(COLOR.YELLOW)}
                ></button>
                <button
                  className={cn(
                    'h-9 w-9 rounded-full bg-rose-400',
                    strokeStyle === COLOR.RED &&
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
