import Image from 'next/image';
import { cn } from '@/libs/utils';

import RotateIcon from '@/assets/icon/ruler/menu_btn_rotate_ruler.svg';

export default function RotateButton() {
  return (
    <div
      className={cn(
        'moveable-custom-rotation',
        'absolute -left-1 -top-1 flex h-8 w-8 origin-top-left cursor-move items-center justify-center rounded-full'
      )}
    >
      {/* <RotateIcon width={64} height={64} className="pointer-events-none" /> */}
      <Image
        className="pointer-events-none"
        src={RotateIcon}
        width={64}
        height={64}
        alt=""
      />
    </div>
  );
}
