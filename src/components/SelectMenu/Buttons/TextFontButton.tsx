import Image from 'next/image';
import { Popover, Transition } from '@headlessui/react';
import { cn } from '@/libs/utils';
import { FONT_NAME } from '@/constants/canvas';
import { useAtom } from 'jotai';
import { contextAtom } from '@/stores/canvas';

import FontButtonOffIcon from '@/assets/icon/menubar/menu_btn_text_02_off.svg';
import FontButtonOnIcon from '@/assets/icon/menubar/menu_btn_text_02_on.svg';
import FontSerifIcon from '@/assets/icon/toolbar/text/text_font_01.svg';
import FontSansIcon from '@/assets/icon/toolbar/text/text_font_02.svg';

export default function TextFontButton() {
  const [ctx] = useAtom(contextAtom);
  const { fontName } = ctx.summary.properties;

  const handleFontName = (name: string) => {
    ctx.setNodeProperties(ctx.getSelectedNodes(), {
      fontName: name,
    });
  };
  return (
    <Popover className="relative flex h-[45px] w-[75px] items-center justify-center">
      {({ open }) => (
        <>
          <Popover.Button className="relative h-[45px] w-[75px]">
            {open ? (
              // <FontButtonOnIcon className="h-full w-full" />
              <Image src={FontButtonOnIcon} fill alt="" />
            ) : (
              // <FontButtonOffIcon className="h-full w-full" />
              <Image src={FontButtonOffIcon} fill alt="" />
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
              <div className="flex grow items-center justify-center rounded-full border border-destructive bg-background px-4 py-1 shadow-md">
                <div className="flex items-center justify-center gap-3 py-3 text-lg">
                  <button
                    className={cn(
                      'w-[140px] rounded-full',
                      fontName === FONT_NAME.GOTHIC &&
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
                      fontName === FONT_NAME.MINCHO &&
                        'outline outline-4 -outline-offset-1 outline-destructive'
                    )}
                    style={{ fontFamily: FONT_NAME.MINCHO }}
                    onClick={() => handleFontName(FONT_NAME.MINCHO)}
                  >
                    {/* <FontSansIcon /> */}
                    <Image src={FontSansIcon} width={140} height={28} alt="" />
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
