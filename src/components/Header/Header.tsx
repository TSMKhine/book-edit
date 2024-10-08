import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { contextAtom } from '@/stores/canvas';
import { isSavingAtom } from '@/stores/ui';

import BackButton from '@/assets/icon/header/main_btn_back_off.svg';
import UndoButton from '@/assets/icon/header/main_btn_undo_off.svg';
import RedoButton from '@/assets/icon/header/main_btn_redo_off.svg';

import Title from '@/components/Header/Title';
import { cn } from '@/libs/utils';

export default function Header() {
  const router = useRouter();
  const [ctx] = useAtom(contextAtom);
  const [isSaving] = useAtom(isSavingAtom);

  const handleBackButton = () => {
    router.push('/');
  };

  return (
    <div className="relative flex h-full items-center bg-lightcoral shadow-lg">
      <div className="relative flex pl-2 pr-6 sm:pl-6">
        <button
          className={cn(
            'h-[42px] w-10 rounded-full bg-white shadow-md active:opacity-80 sm:w-[66px]',
            isSaving ? 'cursor-progress' : 'cursor-pointer'
          )}
          onClick={() => handleBackButton()}
          disabled={isSaving}
        >
          {/* <BackButton /> */}
          <Image src={BackButton} width={66} height={42} alt="" priority />
        </button>
      </div>

      <div className="grid grow place-items-center">
        <Title />
      </div>

      <div className="flex gap-2 pr-2 sm:pr-6">
        <button
          className="w-10 cursor-pointer rounded-l-full bg-white shadow-md active:opacity-80 sm:w-[68px]"
          onClick={() => ctx.undo()}
        >
          {/* <UndoButton /> */}
          <Image src={UndoButton} width={68} height={42} alt="" priority />
        </button>

        <button
          className="w-10 cursor-pointer rounded-r-full bg-white shadow-md active:opacity-80 sm:w-[68px]"
          onClick={() => ctx.redo()}
        >
          {/* <RedoButton /> */}
          <Image src={RedoButton} width={68} height={42} alt="" priority />
        </button>
      </div>
    </div>
  );
}
