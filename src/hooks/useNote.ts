import { useSetAtom } from 'jotai';
import { isSavingAtom } from '@/stores/ui';
import { db } from '@/libs/dexie/db';
import { ZwibblerContext } from '@/libs/zwibbler/zwibbler-def';

let timer = 0;

export default function useNote() {
  const setIsSaving = useSetAtom(isSavingAtom);

  const saveNote = (
    ctx: ZwibblerContext,
    noteId: string,
    isDirty = true,
    newTitie?: string
  ) => {
    setIsSaving(true);

    if (!timer) {
      timer = window.setTimeout(async () => {
        try {
          await db.note.update(noteId, {
            data: ctx.save(),
            ...(newTitie && { title: newTitie }),
            snapshot: ctx.save({ format: 'image/png', page: 0 }),
            ...(isDirty && { updatedAt: Date.now() }),
          });
        } catch (error: any) {
          console.error(error);
          if (
            error.name === 'QuotaExceededError' ||
            (error.inner && error.inner.name === 'QuotaExceededError')
          ) {
            alert('ストレージの空き領域がありません');
            isDirty && window.location.replace('/');
          }
        } finally {
          setIsSaving(false);
          timer = 0;
          ctx.digest();
        }
      }, 1000);
    }
  };

  const getNote = async (ctx: ZwibblerContext, noteId: string) => {
    const note = await db.note.get(noteId);
    if (note) {
      if (note.data === '') {
        // 新規
        await db.note.update(noteId, {
          data: ctx.save(),
        });
      } else {
        // 読み込み
        ctx.load(note.data);
      }
    }
  };

  return {
    saveNote,
    getNote,
  };
}
