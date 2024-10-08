import { contextAtom } from '@/stores/canvas';
import { focusedRulerAtom } from '@/stores/ui';
import { TRulerKind } from '@/types/ui';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef, useCallback } from 'react';

const useOutsideRuler = (callback?: () => void) => {
  const ctx = useAtomValue(contextAtom);
  const setFocusedRuler = useSetAtom(focusedRulerAtom);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handlePointerDownInside = (rulerKind: TRulerKind) => {
    ctx.clearSelection();
    setFocusedRuler(rulerKind);
  };

  const handlePointerDownOutside: EventListener = useCallback(
    (event) => {
      if ('pointerId' in event) {
        // const wrapperEL = wrapperRef.current as HTMLElement;
        const currentEl = event.target as HTMLElement;
        const canvasEl = document.querySelector(
          '.zwibbler-canvas-holder'
        ) as HTMLElement;

        if (canvasEl.contains(currentEl)) {
          // if (wrapperEL && !wrapperEL.contains(currentEl)) {
          // }
          setFocusedRuler(null);

          if (callback) {
            callback();
          }
        }
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener('pointerdown', handlePointerDownOutside, true);

    return () => {
      document.removeEventListener(
        'pointerdown',
        handlePointerDownOutside,
        true
      );
    };
  }, [handlePointerDownOutside]);

  return { wrapperRef, handlePointerDownInside };
};

export default useOutsideRuler;
