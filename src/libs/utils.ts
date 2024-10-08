import { BRUSH_TYPE, CANVAS_SIZE, COLOR, FILL_TYPE } from '@/constants/canvas';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import { RequireContext } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLineWidth(width: number, type: string) {
  return type === BRUSH_TYPE.MARKER ? width * 2 : width;
}

export function getFillColor(fillType: string, color: string) {
  switch (fillType) {
    case FILL_TYPE.FILL:
      return color;
    case FILL_TYPE.WHITE:
      return COLOR.WHITE;
    case FILL_TYPE.TRANSPARENT:
      return color + COLOR.ALPHA[30];
    case FILL_TYPE.NONE:
      return color + COLOR.ALPHA[0];
  }
}

export function getTextColor(fillType: string, color: string) {
  return fillType === FILL_TYPE.FILL && color === COLOR.BLACK
    ? COLOR.LIGHT_GRAY
    : COLOR.DARK_GRAY;
}

export function getDefaultFilename() {
  return `ノート_おたすけっち_${dayjs(Date.now()).format('YYYYMMDD_HHmmss')}`;
}

export function importAllFiles(r: RequireContext) {
  return r.keys().map((key) => r(key).default);
}

export function clearTempLayer() {
  const tempCanvasEl = document.getElementById(
    'temp-canvas'
  ) as HTMLCanvasElement;

  if (tempCanvasEl) {
    tempCanvasEl
      .getContext('2d')
      ?.clearRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
  }
}

export const convertToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
