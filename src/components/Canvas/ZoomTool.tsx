import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { contextAtom } from '@/stores/canvas';
import { Popover } from '@headlessui/react';
import { Input } from '@/components/ui/input';
import { ZOOM } from '@/constants/canvas';

import ZoomOutIcon from '@/assets/icon/common/menu_btn_scale_down.svg';
import ZoomInIcon from '@/assets/icon/common/menu_btn_scale_up.svg';
import ZoomFitIcon from '@/assets/icon/common/100-6.svg';

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

  const handleZoomFit = () => {
    ctx.setZoom('page');
  };

  return (
    <div className="pointer-events-auto inline-flex gap-1 rounded-full border border-destructive bg-white shadow-md">
      {/* zoom out */}
      <button className="h-11 w-11" onClick={() => ctx.zoomOut()}>
        {/* <ZoomOutIcon /> */}
        <Image src={ZoomOutIcon} width={44} height={44} alt="" />
      </button>

      {/* scale */}
      <button className="h-8 w-8 pt-1" onClick={handleZoomFit}>
        {/* <ZoomOutIcon /> */}
        <Image src={ZoomFitIcon} width={44} height={44} alt="" />
      </button>

      {/* zoom in */}
      <button className="h-11 w-11" onClick={() => ctx.zoomIn()}>
        {/* <ZoomInIcon /> */}
        <Image src={ZoomInIcon} width={44} height={44} alt="" />
      </button>
    </div>
  );
}
