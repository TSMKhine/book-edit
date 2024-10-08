import Image from 'next/image';
import { Popover, Transition } from '@headlessui/react';
import { cn, getFillColor, getTextColor } from '@/libs/utils';
import { contextAtom } from '@/stores/canvas';
import { useAtom } from 'jotai';
import { FILL_TYPE } from '@/constants/canvas';

import FillButtonOffIcon from '@/assets/icon/menubar/menu_btn_nuri_01_off.svg';
import FillButtonOnIcon from '@/assets/icon/menubar/menu_btn_nuri_01_on.svg';
import FillIcon from '@/assets/icon/toolbar/figure/figure_btn_nuri.svg';
import FillLineIcon from '@/assets/icon/toolbar/figure/figure_btn_sen.svg';
import FillOffIcon from '@/assets/icon/toolbar/figure/figure_btn_nurinashi.svg';
import FillIcon_Off from '@/assets/icon/toolbar/figure/figure_btn_nuri_off.svg';
import FillLineIcon_Off from '@/assets/icon/toolbar/figure/figure_btn_sen_off.svg';
import FillOffIcon_Off from '@/assets/icon/toolbar/figure/figure_btn_nurinashi_off.svg';

export default function FigureFillButton() {
  const [ctx] = useAtom(contextAtom);
  const { _fillType } = ctx.summary.properties;

  const handleFillType = (fillType: string) => {
    const nodes = ctx.getSelectedNodes();
    nodes.map((node) => {
      const strokeColor = ctx.getNodeProperty(node, 'strokeStyle');
      const fillColor = getFillColor(fillType, strokeColor);
      const textFillColor = getTextColor(fillType, strokeColor);
      ctx.setNodeProperties(node, {
        fillStyle: fillColor,
        strokeStyle: strokeColor,
        textFillStyle: textFillColor,
        _fillType: fillType,
      });
    });
  };

  return (
    <Popover className="relative flex h-[45px] w-[75px] items-center justify-center">
      {({ open }) => (
        <>
          <Popover.Button className="relative h-[45px] w-[75px]">
            {open ? (
              // <FillButtonOnIcon className="h-full w-full" />
              <Image src={FillButtonOnIcon} fill alt="" />
            ) : (
              // <FillButtonOffIcon className="h-full w-full" />
              <Image src={FillButtonOffIcon} fill alt="" />
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
              <div className="flex grow items-center justify-center gap-9 rounded-full border border-destructive bg-background px-6 py-2 shadow-md">
                <button
                  className={cn(
                    'relative h-10 w-8 fill-secondary'
                    // _fillType === FILL_TYPE.FILL && '*:fill-destructive'
                  )}
                  onClick={() => handleFillType(FILL_TYPE.FILL)}
                >
                  {/* <FillIcon /> */}
                  {_fillType === FILL_TYPE.FILL ? (
                    <Image src={FillIcon} fill alt="" />
                  ) : (
                    <Image src={FillIcon_Off} fill alt="" />
                  )}
                </button>
                <button
                  className={cn(
                    'relative h-10 w-8 fill-secondary'
                    // _fillType === FILL_TYPE.WHITE && '*:fill-destructive'
                  )}
                  onClick={() => handleFillType(FILL_TYPE.WHITE)}
                >
                  {/* <FillLineIcon /> */}
                  {_fillType === FILL_TYPE.WHITE ? (
                    <Image src={FillLineIcon} fill alt="" />
                  ) : (
                    <Image src={FillLineIcon_Off} fill alt="" />
                  )}
                </button>
                <button
                  className={cn(
                    'relative h-10 w-8 fill-secondary'
                    // _fillType === FILL_TYPE.NONE && '*:fill-destructive'
                  )}
                  onClick={() => handleFillType(FILL_TYPE.NONE)}
                >
                  {/* <FillOffIcon /> */}
                  {_fillType === FILL_TYPE.NONE ? (
                    <Image src={FillOffIcon} fill alt="" />
                  ) : (
                    <Image src={FillOffIcon_Off} fill alt="" />
                  )}
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
