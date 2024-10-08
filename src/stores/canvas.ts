import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import {
  BRUSH_TYPE,
  COLOR,
  FILL_TYPE,
  FONT_NAME,
  TOOL,
  WIDTH,
  WRITING_MODE,
} from '@/constants/canvas';

import { ZwibblerContext } from '@/libs/zwibbler/zwibbler-def';
import {
  // TSelectMenuPosition,
  TPenTool,
  TTextTool,
  TFigureTool,
  TStickyTool,
} from '@/types/canvas';

export const contextAtom = atom<ZwibblerContext>({} as ZwibblerContext);

export const tempContextAtom = atom<CanvasRenderingContext2D | null>(null);

export const toolNameAtom = atom<string>(TOOL.PICK);

export const selectedNodesAtom = atom<string[]>([]);

export const penToolAtom = atomWithReset<TPenTool>({
  type: BRUSH_TYPE.PEN, // marker
  width: WIDTH.NORMAL, // lineWidth 2,5,10
  color: COLOR.BLACK, // strokeStyle
});

export const textToolAtom = atomWithReset<TTextTool>({
  fontName: FONT_NAME.GOTHIC, // fontName
  size: 25, // fontSize
  color: COLOR.BLACK, // textStrokeStyle
  writingMode: WRITING_MODE.HORIZONTAL,
});

export const figureToolAtom = atomWithReset<TFigureTool>({
  width: WIDTH.THIN, // lineWidth 2,5
  color: COLOR.BLACK, // strokeStyle
  fillType: FILL_TYPE.NONE,
  writingMode: WRITING_MODE.HORIZONTAL,
});

export const stickyToolAtom = atomWithReset<TStickyTool>({
  writingMode: WRITING_MODE.HORIZONTAL,
});

// for debugging
if (process.env.NODE_ENV !== 'production') {
  contextAtom.debugLabel = 'contextAtom';
  penToolAtom.debugLabel = 'penToolAtom';
  textToolAtom.debugLabel = 'textToolAtom';
  figureToolAtom.debugLabel = 'figureToolAtom';
}
