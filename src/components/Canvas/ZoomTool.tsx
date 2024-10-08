import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { contextAtom } from '@/stores/canvas';
import { Popover } from '@headlessui/react';
import { Input } from '@/components/ui/input';
import { ZOOM } from '@/constants/canvas';

import ZoomOutIcon from '@/assets/icon/common/menu_btn_scale_down.svg';
import ZoomInIcon from '@/assets/icon/common/menu_btn_scale_up.svg';

export default function ZoomTool() {
  const [ctx] = useAtom(contextAtom);

  const [inputScale, setInputScale] = useState<string>();
  const displayedZoomRef = useRef<HTMLSpanElement>(null);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    const scaleNumber = inputText.replace(/[^0-9]/g, '');
    setInputScale(scaleNumber);

    if (scaleNumber) {
      const scale = Number(scaleNumber) / 100;

      if (scale < ZOOM.MIN) {
        ctx.setZoom(ZOOM.MIN);
      } else if (scale > ZOOM.MAX) {
        ctx.setZoom(ZOOM.MAX);
      } else {
        ctx.setZoom(scale);
      }
    }
  };

  return (
    <div className="pointer-events-auto inline-flex gap-1 rounded-full border border-destructive bg-white shadow-md">
      {/* zoom out */}
      <button className="h-11 w-11" onClick={() => ctx.zoomOut()}>
        {/* <ZoomOutIcon /> */}
        <Image src={ZoomOutIcon} width={44} height={44} alt="" />
      </button>

      {/* scale */}
      <div className="relative grid w-14 place-items-center">
        <Popover className="">
          <Popover.Button
            as={`div`}
            className="cursor-pointer"
            onClick={() => {
              const innerText = displayedZoomRef.current?.innerText;
              const scaleNumber = innerText?.replace(/[^0-9]/g, '');
              setInputScale(scaleNumber);
            }}
          >
            <span
              className="text-lg"
              ref={displayedZoomRef}
              z-text="getDisplayedZoom()"
            ></span>
          </Popover.Button>

          <Popover.Panel
            className="bg- absolute bottom-full left-0 z-10 w-24 -translate-x-1/4 -translate-y-1.5"
            focus
          >
            <Input
              type="number"
              max={ZOOM.MAX * 100}
              min={ZOOM.MIN * 100}
              value={inputScale}
              className="h-8 pr-0 text-base outline outline-1 outline-destructive focus-visible:ring-destructive"
              onChange={handleChangeInput}
              onFocus={(e) => e.target.select()}
            />
          </Popover.Panel>
        </Popover>
      </div>

      {/* zoom in */}
      <button className="h-11 w-11" onClick={() => ctx.zoomIn()}>
        {/* <ZoomInIcon /> */}
        <Image src={ZoomInIcon} width={44} height={44} alt="" />
      </button>
    </div>
  );
}
