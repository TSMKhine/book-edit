import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { db } from '@/libs/dexie/db';
import type { Note } from '@/libs/dexie/models';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import CancelButton from '@/components/Dialog/CancelButton';
import ActionButton from '@/components/Dialog/ActionButton';

import DeleteButtonIcon from '@/assets/icon/list/btn_delete.svg';
import DialogText from '@/assets/dialog/dialog_txt_11.svg';
import CancelButtonText from '@/assets/dialog/dialog_btn_01.svg';
import OKButtonText from '@/assets/dialog/dialog_btn_03.svg';

export default function NoteListItem({ note }: { note: Note }) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleDeleteNote = async (noteId: string) => {
    try {
      await db.note.delete(noteId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <button
        className="h-fit w-full shadow-xl outline outline-1 outline-gray-300"
        onClick={() => router.push(`/${note.id}`)}
      >
        <div className="aspect-landscape relative bg-white">
          {note.snapshot && (
            <Image src={note.snapshot} alt={note.title} fill={true} />
          )}
        </div>
        <div className="absolute bottom-1 h-16 w-full bg-gray-800/50 text-sm text-white">
          <div className="flex h-full flex-col justify-evenly px-4 py-2 text-left">
            <div className="w-full truncate">{note.title}</div>
            <div>{dayjs(note.updatedAt).format('YYYY年M月D日 HH:mm:ss')}</div>
          </div>
        </div>
      </button>
    </div>
  );
}
