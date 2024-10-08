import Image from 'next/image';
import { useAtom } from 'jotai';
import { isMagnetRulerAtom } from '@/stores/ui';

import Compass15Icon from '@/assets/icon/menubar/menu_btn_compass_01.svg';
import Compass1Icon from '@/assets/icon/menubar/menu_btn_compass_02.svg';

export default function RotateMagnetButton() {
  const [isMagnetRuler, setIsMagnetRuler] = useAtom(isMagnetRulerAtom);

  return (
    <button
      className="relative flex h-[45px] w-[75px] items-center justify-center"
      onClick={() => setIsMagnetRuler((prev) => !prev)}
    >
      {isMagnetRuler ? (
        // <Compass15Icon />
        <Image src={Compass15Icon} fill alt="" />
      ) : (
        // <Compass1Icon />
        <Image src={Compass1Icon} fill alt="" />
      )}
    </button>
  );
}
