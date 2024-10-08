import Image from 'next/image';
import { cn } from '@/libs/utils';

import LoadPageButton from './LoadPageButton';
import AddPageButton from './AddPageButton';

import CloseButton from '@/assets/icon/toolbar/page/btn_close.svg';
import ChangeBgButton from '@/assets/icon/toolbar/page/page_btn_01_off.svg';

interface PageListProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  isShow: Boolean;
  handleToggle: Function;
}

export default function PageList(props: PageListProps) {
  const { isShow, handleToggle } = props;

  return (
    <div className={cn('flex', isShow ? 'h-full gap-4 p-2' : 'invisible h-0')}>
      {/* buttons */}
      <div className="flex w-1/4 flex-col gap-2 overflow-y-scroll p-2">
        {/* 背景を選ぶ */}
        <button onClick={() => handleToggle()}>
          {/* <ChangeBgButton /> */}
          <Image src={ChangeBgButton} width={384} height={80} alt="" />
        </button>

        {/* 背景を読み込む */}
        <LoadPageButton />
      </div>

      {/* page number */}
      <div className="absolute right-4 top-4 z-10 flex w-20 justify-evenly rounded-full border border-secondary bg-white px-4 py-0.5 font-semibold shadow">
        <span z-text="ctx.getCurrentPage()+1" />
        <span className="px-2">/</span>
        <span z-text="ctx.getPageCount()" />
      </div>

      {/* page list */}
      <div className="relative flex-1 overflow-y-scroll border border-secondary bg-[#ecf1ff]">
        <div
          z-sort="ctx.movePage($from,$to)"
          className="inline-flex gap-6 overflow-x-scroll p-4"
        >
          <div
            className="relative my-auto"
            z-for="pageNumber in ctx.getPageCount()"
            z-sortable="true"
            draggable="true"
          >
            {/* close button */}
            <button
              z-if="ctx.getCurrentPage()===pageNumber & ctx.getPageCount() !==1"
              z-click="ctx.deletePage(ctx.getCurrentPage())"
              className="absolute -right-2 -top-2 h-6 w-6"
            >
              {/* <CloseButton /> */}
              <Image src={CloseButton} width={176} height={44} alt="" />
            </button>

            {/* page preview */}
            <div
              className="h-40 shadow-lg outline outline-1 outline-secondary"
              z-page="pageNumber"
              z-class="{'page-selected': ctx.getCurrentPage()===pageNumber}"
              z-click="ctx.setCurrentPage(pageNumber)"
            ></div>
          </div>

          <AddPageButton />
        </div>
      </div>
    </div>
  );
}
