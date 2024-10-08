import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAtom } from 'jotai';
import { contextAtom } from '@/stores/canvas';

import { db } from '@/libs/dexie/db';
import { useLiveQuery } from 'dexie-react-hooks';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import CancelButton from '@/components/Dialog/CancelButton';
import ActionButton from '@/components/Dialog/ActionButton';

import DialogText from '@/assets/dialog/dialog_txt_06.svg';
import CancelButtonText from '@/assets/dialog/dialog_btn_01.svg';
import OKButtonText from '@/assets/dialog/dialog_btn_02.svg';

export default function Title() {
  const pathname = usePathname();
  const noteId = pathname.split('/').pop() as string;
  const note = useLiveQuery(() => db.note.get(noteId));

  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string | undefined>();
  const [open, setOpen] = useState<boolean>(false);

  const [ctx] = useAtom(contextAtom);

  const handleOkTitle = async () => {
    const newTitle = title?.trim();

    if (newTitle?.length === 0) {
      inputRef.current?.focus();
      return;
    }

    try {
      await db.note.update(noteId, {
        title: newTitle,
        updatedAt: Date.now(),
      });
      ctx.setNodeProperty('0', '_noteTitle', newTitle);
    } catch (error) {
      console.error(error);
      alert('ストレージの空き領域がありません');
    } finally {
      setOpen(false);
    }
  };

  useEffect(() => {
    setTitle(note?.title);
  }, [open, note]);

  return (
    <div className="w-48 text-center sm:w-72 md:w-96">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger className="max-w-full truncate text-white active:opacity-80 sm:text-lg">
          {note?.title}
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            {/* <DialogText /> */}
            <Image src={DialogText} width={384} height={40} alt="" />
          </AlertDialogHeader>
          <div className="px-6">
            <Input
              ref={inputRef}
              type="text"
              value={title}
              maxLength={50}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <AlertDialogFooter className="gap-3 sm:justify-between">
            <CancelButton onPointerUp={() => setOpen(false)}>
              {/* <CancelButtonText /> */}
              <Image src={CancelButtonText} width={124} height={42} alt="" />
            </CancelButton>
            <ActionButton onPointerUp={handleOkTitle}>
              {/* <OKButtonText /> */}
              <Image src={OKButtonText} width={124} height={42} alt="" />
            </ActionButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
