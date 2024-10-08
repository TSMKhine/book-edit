import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';

// gothic
export const noto_Sans_JP = Noto_Sans_JP({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

// mincho
export const noto_Serif_JP = Noto_Serif_JP({
  weight: ['200', '300', '400', '500', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});
