'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AddNewButton from '@/components/Common/AddNoteButton';
import { useState } from 'react';
import Loading from '@/components/Loading';

import LogoIcon from '@/assets/icon/home/logo.svg';
import NewButtonIcon from '@/assets/icon/home/new_btn.svg';
import ListButtonIcon from '@/assets/icon/home/list_btn.svg';
import BackgroundIcon from '@/assets/icon/home/background.svg';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    router.push('/list');
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex h-full w-full flex-col items-center gap-20 bg-primary">
      {/* logo */}
      <header className="sm: w-[300px] pt-10 sm:w-[500px] sm:pt-36">
        {/* <LogoIcon /> */}
        <Image src={LogoIcon} width={500} height={144} alt="" priority />
      </header>

      {/* buttons */}
      <section className="z-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <AddNewButton
          className="w-[200px] sm:w-[260px] "
          setIsLoading={setIsLoading}
        >
          {/* <NewButtonIcon /> */}
          <Image src={NewButtonIcon} width={260} height={220} alt="" priority />
        </AddNewButton>
        <button className="w-[200px] sm:w-[260px]" onClick={handleContinue}>
          {/* <ListButtonIcon /> */}
          <Image
            src={ListButtonIcon}
            width={260}
            height={220}
            alt=""
            priority
          />
        </button>
      </section>

      {/* background icon */}
      <section className="pointer-events-none absolute bottom-0 right-0 w-1/2 max-w-[500px]">
        {/* <BackgroundIcon className="" /> */}
        <Image src={BackgroundIcon} width={848} height={928} alt="" priority />
      </section>
    </div>
  );
}
