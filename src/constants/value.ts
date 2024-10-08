export const NOTE_LIMIT = 20 as const;

export const PAGE_LIMIT = 20 as const;

export const FILENAME_LIMIT = 100 as const;

// ファイルサイズ１０MB
export const FILE_SIZE_LIMIT = 10000000 as const;

export const RULER = {
  // [0, 15, 30, 45, ..., 360]
  DEGREES: Array.from({ length: 360 / 15 + 1 }, (_, i) => i * 15),
  THRESHOLD: 3,
} as const;
