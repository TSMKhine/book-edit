import Image from 'next/image';
import { Popover, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { contextAtom } from '@/stores/canvas';

import { Slider } from '@/components/ui/slider';

import SizeButtonOffIcon from '@/assets/icon/menubar/menu_btn_text_03_off.svg';
import SizeButtonOnIcon from '@/assets/icon/menubar/menu_btn_text_03_on.svg';

export default function TextSizeButton() {
  const [ctx] = useAtom(contextAtom);
  const { fontSize } = ctx.summary.properties;

  const handleSize = (size: number) => {
    ctx.setNodeProperties(ctx.getSelectedNodes(), {
      fontSize: size,
    });
  };
  return (
    <Popover className="relative flex h-[45px] w-[75px] items-center justify-center">
      {({ open }) => (
        <>
          <Popover.Button className="relative h-[45px] w-[75px]">
            {open ? (
              // <SizeButtonOnIcon className="h-full w-full" />
              <Image src={SizeButtonOnIcon} fill alt="" />
            ) : (
              // <SizeButtonOffIcon className="h-full w-full" />
              <Image src={SizeButtonOffIcon} fill alt="" />
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
              <div className="relative rounded-full border border-destructive bg-background shadow-md">
                {/* <div className="flex items-center">
                  <input
                    className="mx-2 my-2 h-7 w-72"
                    type="range"
                    min="10"
                    max="40"
                    value={fontSize ?? 0}
                    onChange={(e) => handleSize(Number(e.target.value))}
                    step="3"
                  />
                </div> */}

                <div className="flex w-full flex-col pb-1 pt-3">
                  <div className="flex items-center justify-center gap-4 px-2">
                    <span className="w-10 text-center text-xs">あ</span>
                    <Slider
                      className="h-8 w-48"
                      min={10}
                      max={40}
                      step={3}
                      value={[fontSize]}
                      onValueChange={(value) => {
                        handleSize(value[0]);
                      }}
                    />
                    <span className="w-10 text-center text-2xl">あ</span>
                  </div>
                  <div className="text-center">{fontSize}</div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
