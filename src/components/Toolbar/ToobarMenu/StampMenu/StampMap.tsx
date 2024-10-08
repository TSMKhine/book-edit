import { StaticImageData } from 'next/image';

import {
  EMOTION,
  NAMEPLATE,
  ANSWER,
  CLOCK,
  MONEY,
  GRAPH,
  FIGURE,
  INSTRUMENT,
  MAP,
  MAP_PREVIEW,
} from '@/assets/stamp';

import EmotionButtonOff from '@/assets/icon/toolbar/stamp/stamp_btn_01_off.svg';
import EmotionButtonOn from '@/assets/icon/toolbar/stamp/stamp_btn_01_on.svg';
import NameplateButtonOff from '@/assets/icon/toolbar/stamp/stamp_btn_02_off.svg';
import NameplateButtonOn from '@/assets/icon/toolbar/stamp/stamp_btn_02_on.svg';
import AnswerButtonOff from '@/assets/icon/toolbar/stamp/stamp_btn_03_off.svg';
import AnswerButtonOn from '@/assets/icon/toolbar/stamp/stamp_btn_03_on.svg';
import ClockButtonOff from '@/assets/icon/toolbar/stamp/stamp_btn_04_off.svg';
import ClockButtonOn from '@/assets/icon/toolbar/stamp/stamp_btn_04_on.svg';
import MoneyButtonOff from '@/assets/icon/toolbar/stamp/stamp_btn_05_off.svg';
import MoneyButtonOn from '@/assets/icon/toolbar/stamp/stamp_btn_05_on.svg';
import GraphButtonOff from '@/assets/icon/toolbar/stamp/stamp_btn_06_off.svg';
import GraphButtonOn from '@/assets/icon/toolbar/stamp/stamp_btn_06_on.svg';
import FigureButtonOff from '@/assets/icon/toolbar/stamp/stamp_btn_07_off.svg';
import FigureButtonOn from '@/assets/icon/toolbar/stamp/stamp_btn_07_on.svg';
import InstrumentButtonOff from '@/assets/icon/toolbar/stamp/stamp_btn_08_off.svg';
import InstrumentButtonOn from '@/assets/icon/toolbar/stamp/stamp_btn_08_on.svg';
import MapButtonOff from '@/assets/icon/toolbar/stamp/stamp_btn_09_off.svg';
import MapButtonOn from '@/assets/icon/toolbar/stamp/stamp_btn_09_on.svg';

interface IStampMap {
  title: string;
  // buttonOff: JSX.Element;
  // buttonOn: JSX.Element;
  buttonOff: any;
  buttonOn: any;
  preview?: StaticImageData[];
  images: StaticImageData[];
  imgScale?: number;
  lockAspectRatio?: boolean;
  gridCols?: string;
  layout?: string;
}

const STAMP_MAP: IStampMap[] = [
  {
    title: '顔アイコン',
    buttonOff: EmotionButtonOff,
    buttonOn: EmotionButtonOn,
    images: EMOTION,
    imgScale: 0.5,
    lockAspectRatio: true,
    gridCols: 'grid-cols-4 sm:grid-cols-6',
    layout: 'h-16 aspect-square',
  },
  {
    title: '名札',
    buttonOff: NameplateButtonOff,
    buttonOn: NameplateButtonOn,
    images: NAMEPLATE,
    imgScale: 0.3,
    gridCols: 'grid-cols-1 sm:grid-cols-2',
    layout: 'h-full aspect-square',
  },
  {
    title: '〇✕',
    buttonOff: AnswerButtonOff,
    buttonOn: AnswerButtonOn,
    images: ANSWER,
    imgScale: 0.25,
    lockAspectRatio: true,
    gridCols: 'grid-cols-1 sm:grid-cols-2',
    layout: 'h-full aspect-square',
  },
  {
    title: '時計',
    buttonOff: ClockButtonOff,
    buttonOn: ClockButtonOn,
    images: CLOCK,
    imgScale: 0.25,
    lockAspectRatio: true,
    gridCols: 'grid-cols-1 sm:grid-cols-2',
    layout: 'h-full aspect-square',
  },
  {
    title: 'お金',
    buttonOff: MoneyButtonOff,
    buttonOn: MoneyButtonOn,
    images: MONEY,
    imgScale: 0.1,
    lockAspectRatio: true,
    gridCols: 'grid-cols-2 sm:grid-cols-3',
    layout: 'h-20 w-full',
  },
  {
    title: 'グラフ',
    buttonOff: GraphButtonOff,
    buttonOn: GraphButtonOn,
    images: GRAPH,
    imgScale: 0.5,
    gridCols: 'grid-cols-2 sm:grid-cols-3',
    layout: 'h-40 w-full',
  },
  {
    title: '立体図形',
    buttonOff: FigureButtonOff,
    buttonOn: FigureButtonOn,
    images: FIGURE,
    imgScale: 0.2,
    gridCols: 'grid-cols-2 sm:grid-cols-4',
    layout: 'h-28 aspect-square',
  },
  {
    title: '実験器具',
    buttonOff: InstrumentButtonOff,
    buttonOn: InstrumentButtonOn,
    images: INSTRUMENT,
    imgScale: 0.3,
    lockAspectRatio: true,
    gridCols: 'grid-cols-2 sm:grid-cols-3',
    layout: 'h-28 aspect-square',
  },
  {
    title: '地図',
    buttonOff: MapButtonOff,
    buttonOn: MapButtonOn,
    preview: MAP_PREVIEW,
    images: MAP,
    imgScale: 1.0,
    lockAspectRatio: true,
    gridCols: 'grid-cols-1 sm:grid-cols-2',
    layout: 'h-44 w-full',
  },
];

export default STAMP_MAP;
