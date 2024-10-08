import Image from 'next/image';
import { useAtom } from 'jotai';
import { focusedRulerAtom, showRulerAtom } from '@/stores/ui';
import { cn } from '@/libs/utils';

import RemoveIcon from '@/assets/icon/ruler/menu_btn_remove_ruler.svg';

export default function DeleteButton() {
  const [focusedRuler] = useAtom(focusedRulerAtom);
  const [showRuler, setShowRuler] = useAtom(showRulerAtom);

  const handleCloseRuler = () => {
    if (focusedRuler) {
      setShowRuler((prev) => ({
        ...prev,
        [focusedRuler]: !prev[focusedRuler],
      }));
    }
  };

  return (
    <div
      className={cn(
        'moveable-custom-remove',
        'absolute -top-1 left-1 flex h-8 w-8 origin-top-left cursor-pointer items-center justify-center rounded-full',
        '-translate-x-full'
      )}
      onClick={handleCloseRuler}
    >
      {/* <RemoveIcon width={64} height={64} className="pointer-events-none" /> */}
      <Image
        className="pointer-events-none"
        src={RemoveIcon}
        width={64}
        height={64}
        alt=""
      />
    </div>
  );
}
