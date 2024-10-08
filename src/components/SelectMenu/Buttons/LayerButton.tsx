import Image from 'next/image';
import { useAtom } from 'jotai';
import { contextAtom } from '@/stores/canvas';
import { Popover, Transition } from '@headlessui/react';

import LayerButtonOffIcon from '@/assets/icon/menubar/menu_btn_layer_01_off.svg';
import LayerButtonOnIcon from '@/assets/icon/menubar/menu_btn_layer_01_on.svg';
import BringToFrontButtonOffIcon from '@/assets/icon/menubar/menu_btn_layer_02_off.svg';
import SendToBackButtonOffIcon from '@/assets/icon/menubar/menu_btn_layer_03_off.svg';
import BringForwardButtonOffIcon from '@/assets/icon/menubar/menu_btn_layer_04_off.svg';
import SendBackwardButtonOffIcon from '@/assets/icon/menubar/menu_btn_layer_05_off.svg';

export default function LayerButton() {
  const [ctx] = useAtom(contextAtom);

  return (
    <Popover className="relative flex h-[45px] w-[75px] items-center justify-center">
      {({ open }) => (
        <>
          <Popover.Button className="relative h-[45px] w-[75px]">
            {open ? (
              // <LayerButtonOnIcon className="h-full w-full" />
              <Image src={LayerButtonOnIcon} fill alt="" />
            ) : (
              // <LayerButtonOffIcon className="h-full w-full" />
              <Image src={LayerButtonOffIcon} fill alt="" />
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
              <div className="relative rounded-full border border-destructive bg-background p-2 shadow-md">
                <div className="flex items-center">
                  <button
                    className="relative h-[45px] w-[75px] items-center justify-center"
                    onClick={() => ctx.bringToFront()}
                  >
                    {/* <BringToFrontButtonOffIcon className="h-full w-full" /> */}
                    <Image src={BringToFrontButtonOffIcon} fill alt="" />
                  </button>

                  <button
                    className="relative h-[45px] w-[75px] items-center justify-center"
                    onClick={() => ctx.sendToBack()}
                  >
                    {/* <SendToBackButtonOffIcon className="h-full w-full" /> */}
                    <Image src={SendToBackButtonOffIcon} fill alt="" />
                  </button>

                  <button
                    className="relative h-[45px] w-[75px] items-center justify-center"
                    onClick={() => ctx.moveUp()}
                  >
                    {/* <BringForwardButtonOffIcon className="h-full w-full" /> */}
                    <Image src={BringForwardButtonOffIcon} fill alt="" />
                  </button>

                  <button
                    className="relative h-[45px] w-[75px] items-center justify-center"
                    onClick={() => ctx.moveDown()}
                  >
                    {/* <SendBackwardButtonOffIcon className="h-full w-full" /> */}
                    <Image src={SendBackwardButtonOffIcon} fill alt="" />
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
