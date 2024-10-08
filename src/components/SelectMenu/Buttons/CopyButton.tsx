import Image from 'next/image';
import { useAtom } from 'jotai';
import { contextAtom } from '@/stores/canvas';

import CopyButtonOffIcon from '@/assets/icon/menubar/menu_btn_copy_01_off.svg';

export default function CopyButton() {
  const [ctx] = useAtom(contextAtom);

  return (
    <button
      className="relative flex h-[45px] w-[75px] items-center justify-center"
      onClick={() => ctx.duplicate()}
    >
      {/* <CopyButtonOffIcon className="h-full w-full" /> */}
      <Image src={CopyButtonOffIcon} fill alt="" />
    </button>
  );
}
