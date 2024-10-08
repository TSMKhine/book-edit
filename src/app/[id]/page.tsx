'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useResetAtom } from 'jotai/utils';
import {
  figureToolAtom,
  penToolAtom,
  stickyToolAtom,
  textToolAtom,
} from '@/stores/canvas';
import { focusedRulerAtom, showRulerAtom } from '@/stores/ui';
import { useSetAtom } from 'jotai';
// import Canvas from '@/components/Canvas';
import Loading from '@/components/Loading';
const Canvas = dynamic(() => import('@/components/Canvas'), {
  ssr: false,
  loading: () => <Loading isStart={false} />,
});

export default function Note({ params }: { params: { id: string } }) {
  const resetPenTool = useResetAtom(penToolAtom);
  const resetTextTool = useResetAtom(textToolAtom);
  const resetFigureTool = useResetAtom(figureToolAtom);
  const resetStickyTool = useResetAtom(stickyToolAtom);
  const resetShowRuler = useResetAtom(showRulerAtom);

  const setFocusedRuler = useSetAtom(focusedRulerAtom);

  useEffect(() => {
    return () => {
      resetPenTool();
      resetTextTool();
      resetFigureTool();
      resetStickyTool();
      resetShowRuler();
      setFocusedRuler(null);
    };
  }, []);

  return <Canvas noteId={params.id} />;
}
