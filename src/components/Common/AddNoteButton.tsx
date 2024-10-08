import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { db } from '@/libs/dexie/db';
import { cn } from '@/libs/utils';
import { NOTE_LIMIT } from '@/constants/value';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import ActionButton from '@/components/Dialog/ActionButton';

import DialogText from '@/assets/dialog/dialog_txt_04.svg';
import OKButtonText from '@/assets/dialog/dialog_btn_03.svg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function AddNewButton({ setIsLoading, ...props }: ButtonProps) {
  const { className, children } = props;

  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const clickedRef = useRef(false);

  const handleNewNote = async () => {
    if (!clickedRef.current) {
      clickedRef.current = true;
      const noteCount = await db.note.count();

      if (noteCount < NOTE_LIMIT) {
        setIsLoading(true);
        const id = nanoid();
        // Add initial note
        await db.note
          .add({
            id,
            data: '',
            title: '無題のノート',
            updatedAt: Date.now(),
          })
          .then(() => {
            router.push(`/note/${id}`);
          })
          .catch((error) => {
            setIsLoading(false);
            clickedRef.current = false;
            console.error(error);
            alert('ストレージの空き領域がありません');
          });
      } else {
        clickedRef.current = false;
        setOpen(true);
      }
    }
  };

  return (
    <>
      <button
        className={cn(className, 'active:opacity-80')}
        onClick={handleNewNote}
      >
        {children}
      </button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            {/* <DialogText /> */}
            <Image src={DialogText} width={384} height={80} alt="" />
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
