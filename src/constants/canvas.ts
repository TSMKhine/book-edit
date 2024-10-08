export const TOOL = {
  PICK: 'pick',
  BRUSH: 'brush',
  ERASER: 'eraser',
  TEXT: 'text',
} as const;

export const BRUSH_TYPE = {
  PEN: 'pen',
  MARKER: 'marker',
  LINE: 'line',
} as const;

export const NODE_TYPE = {
  IMAGE: 'ImageNode',
  SVG: 'SvgNode',
  PATH: 'PathNode',
  BRUSH: 'BrushNode',
  TEXT: 'TextNode',
  HTML: 'HTMLNode',
  GROUP: 'GroupNode',
} as const;

export const COLOR = {
  BLACK: '#000000', // black
  WHITE: '#ffffff', // white
  BLUE: '#22d3ee', // cyan-400
  GREEN: '#a3e635', // lime-400
  YELLOW: '#fbbf24', // amber-400
  RED: '#fb7185', // rose-400
  LIGHT_GRAY: '#f3f4f6', // gray-100
  DARK_GRAY: '#111827', // gray-900
  PRIMARY: '#0ea5e9', // cyan-500

  ALPHA: {
    30: '4d', // opacity 0.3
    0: '00', // opacity 0
  },
} as const;

export const WIDTH = {
  THIN: 2,
  NORMAL: 5,
  THICK: 10,
} as const;

export const FONT_NAME = {
  MINCHO: 'Noto Serif JP',
  GOTHIC: 'Noto Sans JP',
} as const;

export const FILL_TYPE = {
  FILL: 'fill',
  WHITE: 'white',
  NONE: 'none',
  TRANSPARENT: 'transparent',
} as const;

export const FIGURE_KIND = {
  RECTANGLE: 'rectangle',
  TRIANGLE: 'triangle',
  CIRCLE: 'circle',
  ARROW: 'arrow',
  CHAT_BUBBLE: 'chat-bubble',
} as const;

export const RULER_KIND = {
  CLEAR_RULER: 'clearRuler',
  PROTRACTOR: 'protractor',
  TRIANGULAR_BI: 'triangularBi',
  TRIANGULAR: 'triangular',
  COMPASS: 'compass',
} as const;

export const ZOOM = {
  MAX: 4,
  MIN: 0.25,
} as const;

export const STICKY_COLOR = {
  ORANGE: '#f97316', // orange-500
  YELLOW: '#fde047', // yellow-300
  GREEN: '#22c55e', // green-500
  BLUE: '#3b82f6', // blue-500
  PURPLE: '#a855f7', // purple-500
  WHITE: '#fafafa', // neutral-50
};

export const WRITING_MODE = {
  HORIZONTAL: '',
  VERTICAL: 'vertical-rl',
} as const;

export const CANVAS_SIZE = {
  WIDTH: 1000,
  HEIGHT: 745,
} as const;

export const CANVAS_LAYER = {
  DEFAULT: 'default',
  BACKGROUND: 'background',
} as const;
