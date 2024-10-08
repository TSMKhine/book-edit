export type TPenTool = {
  type: string;
  width: number;
  color: string;
};

export type TTextTool = {
  fontName: string;
  size: number;
  color: string;
  writingMode: string;
};

export type TFigureTool = {
  width: number;
  color: string;
  fillType: string;
  writingMode: string;
};

export type TStickyTool = {
  writingMode: string;
};
