import Image from 'next/image';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { contextAtom, toolNameAtom } from '@/stores/canvas';
import { TOOL } from '@/constants/canvas';

import PickButtonOffIcon from '@/assets/icon/common/menu_btn_pick_off.svg';
import PickButtonOnIcon from '@/assets/icon/common/menu_btn_pick_on.svg';
import MultiPickButtonOffIcon from '@/assets/icon/common/menu_btn_multipick_off.svg';
import MultiPickButtonOnIcon from '@/assets/icon/common/menu_btn_multipick_on.svg';

export default function PickTool() {
  const [ctx] = useAtom(contextAtom);
  const [toolName] = useAtom(toolNameAtom);

  const [isMultiPick, setMultiPick] = useState(false);

  const handlePickTool = () => {
    ctx.clearSelection();

    if (toolName !== TOOL.PICK) {
      ctx.setConfig('multiPick', isMultiPick);
      ctx.usePickTool();
    } else {
      ctx.setConfig('multiPick', !isMultiPick);
      ctx.usePickTool();
      setMultiPick(!isMultiPick);
    }
  };

  return (
    <div className="relative h-full">
      <button
        className="pointer-events-auto absolute bottom-0 left-0 h-14 w-14 rounded-full shadow-md"
        onClick={handlePickTool}
      >
        {isMultiPick ? (
          toolName === TOOL.PICK ? (
            // <MultiPickButtonOnIcon />
            <Image src={MultiPickButtonOnIcon} width={56} height={56} alt="" />
          ) : (
            // <MultiPickButtonOffIcon />
            <Image src={MultiPickButtonOffIcon} width={56} height={56} alt="" />
          )
        ) : toolName === TOOL.PICK ? (
          // <PickButtonOnIcon />
          <Image src={PickButtonOnIcon} width={56} height={56} alt="" />
        ) : (
          // <PickButtonOffIcon />
          <Image src={PickButtonOffIcon} width={56} height={56} alt="" />
        )}
      </button>
    </div>
  );
}
