'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import NoteList from '@/components/NoteList';
import AddNewButton from '@/components/Common/AddNoteButton';
import { cn } from '@/libs/utils';

import BackButtonIcon from '@/assets/icon/header/main_btn_back_off.svg';
import NewButtonIcon from '@/assets/icon/list/btn_new.svg';

export default function List() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="relative h-full w-full">
      {/* header */}
      <div className="fixed left-0 z-50 h-12 w-full border-b border-gray-300 bg-lightcoral shadow-lg sm:h-16">
        <div className="flex h-full items-center justify-between">
          <div className="relative flex pl-2 pr-6 sm:pl-6">
            <button
              className={cn(
                'h-[42px] w-10 cursor-pointer rounded-full bg-white shadow-md active:opacity-80 sm:w-[66px]'
              )}
              onClick={() => router.push('/')}
            >
              {/* <BackButtonIcon /> */}
              <Image
                src={BackButtonIcon}
                width={66}
                height={42}
                alt=""
                priority
              />
            </button>
          </div>
          <div className="pr-2 sm:pr-6">
            <AddNewButton
              setIsLoading={setIsLoading}
              className=" w-[169px] rounded-full shadow-md"
            >
              {/* <NewButtonIcon /> */}
              <Image
                src={NewButtonIcon}
                width={169}
                height={42}
                alt=""
                priority
              />
            </AddNewButton>
          </div>
        </div>
      </div>

      {/* list */}
      <div className="h-full overflow-y-auto bg-honeydew pt-12 sm:pt-16">
        <NoteList isLoading={isLoading} />
      </div>
    </div>
  );
}
