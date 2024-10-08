import Image from 'next/image';
import { useState } from 'react';
import { useAtom } from 'jotai';

import { Popover, Transition } from '@headlessui/react';
import { contextAtom } from '@/stores/canvas';

import LinkButtonOffIcon from '@/assets/icon/menubar/menu_btn_link_01_off.svg';
import LinkButtonOnIcon from '@/assets/icon/menubar/menu_btn_link_01_on.svg';
import CheckButtonIcon from '@/assets/icon/menubar/menu_btn_ok_01_off.svg';
import CloseButtonIcon from '@/assets/icon/menubar/menu_btn_cancel_01_off.svg';

export default function LinkButton() {
  const [ctx] = useAtom(contextAtom);
  const [link, setLink] = useState('');

  const handleInitial = () => {
    const nodes = ctx.getSelectedNodes();
    if (nodes.length === 1) {
      const link = ctx.getNodeProperty(nodes[0], '_link');
      if (link) {
        setLink(link);
      } else {
        setLink('');
      }
    }
  };

  return (
    <Popover className="relative flex h-[45px] w-[75px] items-center justify-center">
      {({ open }) => (
        <>
          <Popover.Button
            className="relative h-[45px] w-[75px]"
            onClick={handleInitial}
          >
            {open ? (
              // <LinkButtonOnIcon className="h-full w-full" />
              <Image src={LinkButtonOnIcon} fill alt="" />
            ) : (
              // <LinkButtonOffIcon className="h-full w-full" />
              <Image src={LinkButtonOffIcon} fill alt="" />
            )}
          </Popover.Button>

          <Transition
            // enter="transition duration-150 ease-out"
            // enterFrom="transform translate-y-full opacity-0"
            // enterTo="transform translate-y-0 opacity-100"
            // leave="transition duration-75 ease-out"
            // leaveFrom="transform translate-y-0 opacity-100"
            // leaveTo="transform translate-y-full opacity-0"
            className="absolute bottom-full right-0 z-10 mb-0.5 h-fit w-fit min-w-min translate-x-1/3"
          >
            <Popover.Panel>
              {({ close }) => (
                <div className="relative rounded-full border border-destructive bg-background px-4 shadow-md">
                  <div className="flex items-center">
                    <input
                      className="h-12 w-48 rounded-l-md px-2 text-lg"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                    <div className="grid grid-cols-2 place-items-center gap-10 px-4">
                      <button
                        className="relative h-8 w-8"
                        onClick={() => {
                          ctx.setProperty('_link', link);
                          close();
                        }}
                      >
                        {/* <CheckButtonIcon /> */}
                        <Image src={CheckButtonIcon} fill alt="" />
                      </button>
                      <button
                        className="relative h-8 w-8"
                        onClick={() => {
                          ctx.setProperty('_link', null);
                          close();
                        }}
                      >
                        {/* <CloseButtonIcon /> */}
                        <Image src={CloseButtonIcon} fill alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
