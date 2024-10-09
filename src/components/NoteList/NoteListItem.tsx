import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import type { Note } from '@/libs/dexie/models';

export default function NoteListItem({ note }: { note: Note }) {
  const router = useRouter();

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
