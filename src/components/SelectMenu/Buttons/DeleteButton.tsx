import Image from 'next/image';
import { useAtom } from 'jotai';
import { contextAtom } from '@/stores/canvas';

import DeleteButtonOffIcon from '@/assets/icon/menubar/menu_btn_trash_01_off.svg';

export default function DeleteButton() {
  const [ctx] = useAtom(contextAtom);

  return (
    <button
      className="relative flex h-[45px] w-[75px] items-center justify-center"
      onClick={() => ctx.deleteSelection()}
    >
      {/* <DeleteButtonOffIcon className="h-full w-full" /> */}
      <Image src={DeleteButtonOffIcon} fill alt="" />
    </button>
  );
}
