import Image from 'next/image';
import { useAtom } from 'jotai';
import { contextAtom } from '@/stores/canvas';
import { NODE_TYPE } from '@/constants/canvas';

import LockButtonOffIcon from '@/assets/icon/menubar/menu_btn_lock_01_off.svg';
import LockButtonOnIcon from '@/assets/icon/menubar/menu_btn_lock_02_off.svg';

export default function LockButton() {
  const [ctx] = useAtom(contextAtom);
  const islock = ctx?.summary?.properties._isLock;

  const handleToggleLock = () => {
    const nodes = ctx.getSelectedNodes();

    if (islock) {
      nodes.map((node) => {
        const isSticky = ctx.getNodeProperty(node, '_isSticky');
        const isOpened = ctx.getNodeProperty(node, '_isOpened');
        const selectedNodeType = ctx.getNodeProperty(node, '$type');
        ctx.setNodeProperties(node, {
          lockPosition: selectedNodeType === NODE_TYPE.BRUSH || undefined,
          lockSize: selectedNodeType === NODE_TYPE.BRUSH || undefined,
          lockRotation:
            selectedNodeType === NODE_TYPE.BRUSH || isSticky || undefined,
          lockText: (isSticky && isOpened) || undefined,
          _lockDelete: undefined,
          _lockCopy: selectedNodeType === NODE_TYPE.BRUSH || undefined,
          _isLock: undefined,
        });
      });
    } else {
      ctx.setNodeProperties(nodes, {
        lockPosition: true,
        lockSize: true,
        lockRotation: true,
        lockText: true,
        _lockDelete: true,
        _lockCopy: true,
        _isLock: true,
      });
    }
  };

  return (
    <button
      className="relative flex h-[45px] w-[75px] items-center justify-center"
      onClick={handleToggleLock}
    >
      {islock ? (
        // <LockButtonOnIcon className="h-full w-full" />
        <Image src={LockButtonOnIcon} fill alt="" />
      ) : (
        // <LockButtonOffIcon className="h-full w-full" />
        <Image src={LockButtonOffIcon} fill alt="" />
      )}
    </button>
  );
}
