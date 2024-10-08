import { atom } from 'jotai';
import { TRulerKind, TShowRuler } from '@/types/ui';
import { atomWithReset } from 'jotai/utils';

export const isSavingAtom = atom<boolean>(false);

export const focusedRulerAtom = atom<null | TRulerKind>(null);

export const showRulerAtom = atomWithReset<TShowRuler>({
  clearRuler: false,
  protractor: false,
  triangularBi: false,
  triangular: false,
  compass: false,
});

export const isMagnetRulerAtom = atom<boolean>(true);

export const compassStepAtom = atom<number>(1);

export const compassPointsAtom = atom<{
  center: { x: number; y: number };
  points: number[];
}>({
  center: { x: 0, y: 0 },
  points: [],
});

export const canvasScaleAtom = atom<number>(1);

export const canvasTranslateXAtom = atom<number>(0);

export const canvasTranslateYAtom = atom<number>(0);

export const canvasWidthAtom = atom<number>(0);

export const canvasHeightAtom = atom<number>(0);

export const showQrImageAtom = atom<boolean>(false);
