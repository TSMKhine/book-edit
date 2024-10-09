'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AddNewButton from '@/components/Common/AddNoteButton';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import LogoIcon from '@/assets/icon/home/logo.svg';
import NewButtonIcon from '@/assets/icon/home/new_btn.svg';
import ListButtonIcon from '@/assets/icon/home/list_btn.svg';
import BackgroundIcon from '@/assets/icon/home/background.svg';
import NoteList from '@/components/NoteList';
import { db } from '@/libs/dexie/db';
import { initialize } from 'next/dist/server/lib/render-server';
import BOOKLIST_MAP from '@/components/Common/BookListMap';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeDB = async () => {
      BOOKLIST_MAP.map(async (book, index) => {
        var existData = await db.note.get(book.id);
        if (!existData) {
          await db.note
            .add({
              id: book.id,
              data: '',
              title: book.title,
              updatedAt: Date.now(),
            })
            .then(() => {
              console.log('登録完了しました。');
            })
            .catch((error) => {
              setIsLoading(false);
              console.error(error);
              alert('ストレージの空き領域がありません');
            });
        }
      });
    };
    initializeDB();
  }, []);

  // const handleContinue = () => {
  //   router.push('/list');
  // };

  return isLoading ? (
    <Loading isStart={false} />
  ) : (
    <div className="relative h-full w-full  bg-primary">
      {/* header */}
      <div className="flex flex-col items-center  bg-primary ">
        <header className="sm: w-[300px] pt-10 sm:w-[500px] sm:pt-36">
          {/* <LogoIcon /> */}
          <Image src={LogoIcon} width={500} height={144} alt="" priority />
        </header>
      </div>

      {/* list */}
      <div className="bg-primary   ">
        <NoteList isLoading={isLoading} />
      </div>
    </div>
  );
}
