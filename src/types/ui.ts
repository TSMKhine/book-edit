export type TShowRuler = {
  clearRuler: boolean;
  protractor: boolean;
  triangularBi: boolean;
  triangular: boolean;
  compass: boolean;
  // [key: string]: boolean;
};

export type TRulerKind = keyof TShowRuler;

export type TRulerProps = {
  [key: string]: any;
};
