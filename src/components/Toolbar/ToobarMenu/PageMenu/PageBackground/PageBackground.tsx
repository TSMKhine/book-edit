import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/libs/utils';

import BACKGROUND_MAP from './BackgroundMap';
import BackgroundWrapper from './BackgroundWrapper';

import TemplateButtonOff from '@/assets/icon/toolbar/page/page_btn_03_off.svg';
import TemplateButtonOn from '@/assets/icon/toolbar/page/page_btn_03_on.svg';
import ContentButtonOff from '@/assets/icon/toolbar/page/page_btn_04_off.svg';
import ContentButtonOn from '@/assets/icon/toolbar/page/page_btn_04_on.svg';
import BackButton from '@/assets/icon/toolbar/page/btn_back.svg';

interface PageBackgroundProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  isShow: Boolean;
  handleToggle: Function;
}

export default function PageBackground(props: PageBackgroundProps) {
  const { isShow, handleToggle } = props;
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <div className={cn('flex', isShow ? 'h-full gap-4 p-2' : 'invisible h-0')}>
      {/* buttons */}
      <div className="flex w-1/4 flex-col gap-2 p-2">
        <button className="h-8 w-[66px]" onClick={() => handleToggle()}>
          {/* <BackButton /> */}
          <Image src={BackButton} width={66} height={32} alt="" />
        </button>
        <button onClick={() => setTabIndex(0)}>
          {tabIndex === 0 ? (
            // <TemplateButtonOn />
            <Image src={TemplateButtonOn} width={176} height={44} alt="" />
          ) : (
            //  <TemplateButtonOff />
            <Image src={TemplateButtonOff} width={176} height={44} alt="" />
          )}
        </button>
        <button onClick={() => setTabIndex(1)}>
          {tabIndex === 1 ? (
            // <ContentButtonOn />
            <Image src={ContentButtonOn} width={176} height={44} alt="" />
          ) : (
            //  <ContentButtonOff />
            <Image src={ContentButtonOff} width={176} height={44} alt="" />
          )}
        </button>
      </div>

      <div className="border-secondar relative flex-1 overflow-y-scroll border">
        <div className="grid h-48 w-full grid-cols-2 place-items-center gap-y-10 p-2 text-base sm:grid-cols-3 md:grid-cols-4">
          {BACKGROUND_MAP[tabIndex].images.map((image, index) => {
            return (
              <BackgroundWrapper key={index} imageData={image.data}>
                {image.ruby}
              </BackgroundWrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}
