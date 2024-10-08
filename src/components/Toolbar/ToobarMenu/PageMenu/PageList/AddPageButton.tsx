import { useState } from 'react';
import { useAtom } from 'jotai';
import { contextAtom } from '@/stores/canvas';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import ActionButton from '@/components/Dialog/ActionButton';
import { NOTE_LIMIT } from '@/constants/value';

import PlusIcon from '@/assets/icon/toolbar/page/btn_add.svg';
import DialogText from '@/assets/dialog/dialog_txt_05.svg';
import OKButtonText from '@/assets/dialog/dialog_btn_03.svg';
import Image from 'next/image';

export default function AddPageButton() {
  const [ctx] = useAtom(contextAtom);
  const [open, setOpen] = useState<boolean>(false);

  const handleAddPage = () => {
    if (ctx.getPageCount() > NOTE_LIMIT - 1) {
      setOpen(true);
    } else {
      ctx.setCurrentPage(ctx.addPage());
    }
  };

  return (
    <>
      <button onClick={handleAddPage}>
        <div className="grid aspect-A4 h-40 place-items-center rounded-sm bg-[#C7D6FF]">
          <div className="h-8 w-8">
            {/* <PlusIcon /> */}
            <Image src={PlusIcon} width={32} height={32} alt="" />
          </div>
        </div>
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            {/* <DialogText /> */}
            <Image src={DialogText} width={384} height={40} alt="" />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <ActionButton onPointerUp={() => setOpen(false)}>
              {/* <OKButtonText /> */}
              <Image src={OKButtonText} width={124} height={42} alt="" />
            </ActionButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
