import { importAllFiles } from '@/libs/utils';

export const EMOTION = importAllFiles(
  require.context('./01.emotion', false, /\.(png|svg)$/)
);

export const NAMEPLATE = importAllFiles(
  require.context('./02.nameplate', false, /\.(png|svg)$/)
);

export const ANSWER = importAllFiles(
  require.context('./03.answer', false, /\.(png|svg)$/)
);

export const CLOCK = importAllFiles(
  require.context('./04.clock', false, /\.(png|svg)$/)
);

export const MONEY = importAllFiles(
  require.context('./05.money', false, /\.(png|svg)$/)
);

export const GRAPH = importAllFiles(
  require.context('./06.graph', false, /\.(png|svg)$/)
);

export const FIGURE = importAllFiles(
  require.context('./07.figure', false, /\.(png|svg)$/)
);

export const INSTRUMENT = importAllFiles(
  require.context('./08.instrument', false, /\.(png|svg)$/)
);

export const MAP = importAllFiles(
  require.context('./09.map', false, /\.(png|svg)$/)
);

export const MAP_PREVIEW = importAllFiles(
  require.context('./09.map/preview', false, /\.(png|svg)$/)
);
