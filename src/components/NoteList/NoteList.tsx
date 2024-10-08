import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/libs/dexie/db';

import NoteListItem from './NoteListItem';
import Loading from '../Loading';

export default function NoteList({ isLoading }: { isLoading: boolean }) {
  const noteList = useLiveQuery(() =>
    db.note.orderBy('updatedAt').reverse().toArray()
  );

  return (
    <div className="relative h-full px-4 py-8">
      {!noteList || isLoading ? (
        <Loading />
      ) : (
        <div className="mx-auto grid max-w-screen-lg grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {noteList.map((note) => (
            <NoteListItem key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
