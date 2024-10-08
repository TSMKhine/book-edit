import Image from 'next/image';
import { useState } from 'react';

import { Separator } from '@/components/ui/separator';
import STAMP_MAP from './StampMap';
import StampWrapper from './StampWrapper';

export default function StampMenu() {
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <div className="h-72 w-screen max-w-screen-md rounded-lg bg-neutral-200 p-2">
      <div className="h-full bg-white">
        <div className="relative flex h-full">
          <div className="flex w-1/4 flex-col gap-2 overflow-y-scroll p-3">
            {STAMP_MAP.map((stampItem, index) => (
              <button key={index} onClick={() => setTabIndex(index)}>
                {tabIndex === index ? (
                  // stampItem.buttonOn
                  <Image
                    src={stampItem.buttonOn}
                    width={300}
                    height={300}
                    alt=""
                  />
                ) : (
                  // stampItem.buttonOff
                  <Image
                    src={stampItem.buttonOff}
                    width={300}
                    height={300}
                    alt=""
                  />
                )}
              </button>
            ))}
          </div>

          <Separator orientation="vertical" className="h-full" />

          <div className="m-3 flex-1 overflow-y-scroll bg-[#ECF1FF]">
            <StampWrapper tabIndex={tabIndex} />
          </div>
        </div>
      </div>
    </div>
  );
}
