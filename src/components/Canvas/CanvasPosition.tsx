import { useRef } from 'react';
import { useSetAtom } from 'jotai';
import useMutationObserver from '@/hooks/useMutationObserver';
import {
  canvasHeightAtom,
  canvasScaleAtom,
  canvasTranslateXAtom,
  canvasTranslateYAtom,
  canvasWidthAtom,
} from '@/stores/ui';

export default function CanvasPosition() {
  const setCanvasTranslateX = useSetAtom(canvasTranslateXAtom);
  const setCanvasTranslateY = useSetAtom(canvasTranslateYAtom);
  const setCanvasScale = useSetAtom(canvasScaleAtom);
  const setCanvasWidth = useSetAtom(canvasWidthAtom);
  const setCanvasHeight = useSetAtom(canvasHeightAtom);

  const translateXRef = useRef<HTMLSpanElement>(null);
  const translateYRef = useRef<HTMLSpanElement>(null);
  const scaleRef = useRef<HTMLSpanElement>(null);
  const widthRef = useRef<HTMLSpanElement>(null);
  const heightRef = useRef<HTMLSpanElement>(null);

  useMutationObserver(translateXRef, () => {
    setCanvasTranslateX(Number(translateXRef.current?.innerHTML));
  });

  useMutationObserver(translateYRef, () => {
    setCanvasTranslateY(Number(translateYRef.current?.innerHTML));
  });

  useMutationObserver(scaleRef, () => {
    setCanvasScale(Number(scaleRef.current?.innerHTML));
  });

  useMutationObserver(widthRef, () => {
    setCanvasWidth(Number(widthRef.current?.innerHTML));
  });

  useMutationObserver(heightRef, () => {
    setCanvasHeight(Number(heightRef.current?.innerHTML));
  });

  return (
    <>
      <span ref={translateXRef} z-text="getCanvasTranslateX()"></span>
      <span ref={translateYRef} z-text="getCanvasTranslateY()"></span>
      <span ref={scaleRef} z-text="getCanvasScale()"></span>
      <span ref={widthRef} z-text="getCanvasWidth()"></span>
      <span ref={heightRef} z-text="getCanvasHeight()"></span>
    </>
  );
}
