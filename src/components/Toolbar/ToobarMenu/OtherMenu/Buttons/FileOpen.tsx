import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAtom } from 'jotai';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import CancelButton from '@/components/Dialog/CancelButton';
import ActionButton from '@/components/Dialog/ActionButton';
import { contextAtom } from '@/stores/canvas';
import useNote from '@/hooks/useNote';

import SaveButton from '@/assets/icon/toolbar/other/save_btn_03_off.svg';
import DialogText from '@/assets/dialog/dialog_txt_08.svg';
import CancelButtonText from '@/assets/dialog/dialog_btn_01.svg';
import OKButtonText from '@/assets/dialog/dialog_btn_03.svg';

export default function FileOpen() {
  const pathname = usePathname();
  const noteId = pathname.split('/').pop() as string;
  const [ctx] = useAtom(contextAtom);
  const [open, setOpen] = useState<boolean>(false);

  const { saveNote } = useNote();

  const handleOpen = () => {
    ctx.openFromComputer('zw').then(
      function () {
        const noteTitle = ctx.getNodeProperty('0', '_noteTitle');
        saveNote(ctx, noteId, true, noteTitle);
        setOpen(false);
      },
      function (error) {
        alert('正しいファイルを選択してください。');
      }
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button>
          {/* <SaveButton /> */}
          <Image src={SaveButton} width={256} height={44} alt="" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          {/* <DialogText /> */}
          <Image src={DialogText} width={384} height={40} alt="" />
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-between">
          <CancelButton onPointerUp={() => setOpen(false)}>
            {/* <CancelButtonText /> */}
            <Image src={CancelButtonText} width={124} height={42} alt="" />
          </CancelButton>
          <ActionButton onPointerUp={handleOpen}>
            {/* <OKButtonText /> */}
            <Image src={OKButtonText} width={124} height={42} alt="" />
          </ActionButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
