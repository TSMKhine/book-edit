import { StaticImageData } from 'next/image';

import templates01 from '@/assets/background/01.templates/01.マス目入り方眼.png';
import templates02 from '@/assets/background/01.templates/02.小さい方眼.png';
import templates03 from '@/assets/background/01.templates/03.大きい方眼.png';
import templates04 from '@/assets/background/01.templates/04.黒板ノート.png';
import templates05 from '@/assets/background/01.templates/05.英語ノート.png';
import templates06 from '@/assets/background/01.templates/06.色つきノート.png';
import templates07 from '@/assets/background/01.templates/07.横書きノート.png';
import templates08 from '@/assets/background/01.templates/08.コーネル式.png';
import templates09 from '@/assets/background/01.templates/09.縦半分.png';
import templates10 from '@/assets/background/01.templates/10.横半分.png';
import templates11 from '@/assets/background/01.templates/11.十字.png';
import templates12 from '@/assets/background/01.templates/12.絵日記.png';

import contents01 from '@/assets/background/02.contents/01.1日の予定表.png';
import contents02 from '@/assets/background/02.contents/02.1週間の予定表.png';
import contents03 from '@/assets/background/02.contents/03.ひらがな練習１.png';
import contents04 from '@/assets/background/02.contents/04.ひらがな練習２.png';
import contents05 from '@/assets/background/02.contents/05.カタカナ練習１.png';
import contents06 from '@/assets/background/02.contents/06.カタカナ練習２.png';
import contents07 from '@/assets/background/02.contents/07.数字練習.png';
import contents08 from '@/assets/background/02.contents/08.単位練習.png';
import contents09 from '@/assets/background/02.contents/09.ABC練習１.png';
import contents10 from '@/assets/background/02.contents/10.ABC練習２.png';
import contents11 from '@/assets/background/02.contents/11.abc練習１.png';
import contents12 from '@/assets/background/02.contents/12.abc練習２.png';

interface IImage {
  data?: StaticImageData;
  title?: string;
  ruby?: JSX.Element;
}

interface IBackgroundMap {
  tabName: string;
  images: IImage[];
}

const BACKGROUND_MAP: IBackgroundMap[] = [
  {
    tabName: 'テンプレート',
    images: [
      {
        title: '白紙',
        ruby: (
          <ruby>
            白紙<rt>はくし</rt>
          </ruby>
        ),
      },
      {
        data: templates01,
        title: 'マス目入り方眼',
        ruby: (
          <>
            マス
            <ruby>
              目入<rt>めい</rt>
            </ruby>
            り
            <ruby>
              方眼<rt>ほうがん</rt>
            </ruby>
          </>
        ),
      },
      {
        data: templates02,
        title: '小さい方眼',
        ruby: (
          <>
            <ruby>
              小<rt>ちい</rt>
            </ruby>
            さい
            <ruby>
              方眼<rt>ほうがん</rt>
            </ruby>
          </>
        ),
      },
      {
        data: templates03,
        title: '大きい方眼',
        ruby: (
          <>
            <ruby>
              大<rt>おお</rt>
            </ruby>
            きい
            <ruby>
              方眼<rt>ほうがん</rt>
            </ruby>
          </>
        ),
      },
      {
        data: templates04,
        title: '黒板ノート',
        ruby: (
          <>
            <ruby>
              黒板<rt>こくばん</rt>
            </ruby>
            ノート
          </>
        ),
      },
      {
        data: templates05,
        title: '英語ノート',
        ruby: (
          <>
            <ruby>
              英語<rt>えいご</rt>
            </ruby>
            ノート
          </>
        ),
      },
      {
        data: templates06,
        title: '色つきノート',
        ruby: (
          <>
            <ruby>
              色<rt>いろ</rt>
            </ruby>
            つきノート
          </>
        ),
      },
      {
        data: templates07,
        title: '横書きノート',
        ruby: (
          <>
            <ruby>
              横書<rt>よこが</rt>
            </ruby>
            きノート
          </>
        ),
      },
      {
        data: templates08,
        title: 'コーネル式',
        ruby: (
          <>
            コーネル
            <ruby>
              式<rt>しき</rt>
            </ruby>
          </>
        ),
      },
      {
        data: templates09,
        title: '縦半分',
        ruby: (
          <ruby>
            縦半分<rt>たてはんぶん</rt>
          </ruby>
        ),
      },
      {
        data: templates10,
        title: '横半分',
        ruby: (
          <ruby>
            横半分<rt>よこはんぶん</rt>
          </ruby>
        ),
      },
      {
        data: templates11,
        title: '十字',
        ruby: (
          <ruby>
            十字<rt>じゅうじ</rt>
          </ruby>
        ),
      },
      {
        data: templates12,
        title: '絵日記',
        ruby: (
          <ruby>
            絵日記<rt>えにっき</rt>
          </ruby>
        ),
      },
    ],
  },
  {
    tabName: '学習コンテンツ',
    images: [
      {
        data: contents01,
        title: '1日の予定表',
        ruby: (
          <>
            1
            <ruby>
              日<rt>にち</rt>
            </ruby>
            の
            <ruby>
              予定表<rt>よていひょう</rt>
            </ruby>
          </>
        ),
      },
      {
        data: contents02,
        title: '1週間の予定表',
        ruby: (
          <>
            1
            <ruby>
              週間<rt>しゅうかん</rt>
            </ruby>
            の
            <ruby>
              予定表
              <rt>よていひょう</rt>
            </ruby>
          </>
        ),
      },
      {
        data: contents03,
        title: 'ひらがな練習１',
        ruby: (
          <>
            ひらがな
            <ruby>
              練習<rt>れんしゅう</rt>
            </ruby>
            １
          </>
        ),
      },
      {
        data: contents04,
        title: 'ひらがな練習２',
        ruby: (
          <>
            ひらがな
            <ruby>
              練習<rt>れんしゅう</rt>
            </ruby>
            ２
          </>
        ),
      },
      {
        data: contents05,
        title: 'カタカナ練習１',
        ruby: (
          <>
            カタカナ
            <ruby>
              練習<rt>れんしゅう</rt>
            </ruby>
            １
          </>
        ),
      },
      {
        data: contents06,
        title: 'カタカナ練習２',
        ruby: (
          <>
            カタカナ
            <ruby>
              練習<rt>れんしゅう</rt>
            </ruby>
            ２
          </>
        ),
      },
      {
        data: contents07,
        title: '数字練習',
        ruby: (
          <ruby>
            数字練習<rt>すうじれんしゅう</rt>
          </ruby>
        ),
      },
      {
        data: contents08,
        title: '単位練習',
        ruby: (
          <ruby>
            単位練習<rt>たんいれんしゅう</rt>
          </ruby>
        ),
      },
      {
        data: contents09,
        title: 'ABC練習１',
        ruby: (
          <>
            ABC
            <ruby>
              練習<rt>れんしゅう</rt>
            </ruby>
            １
          </>
        ),
      },
      {
        data: contents10,
        title: 'ABC練習２',
        ruby: (
          <>
            ABC
            <ruby>
              練習<rt>れんしゅう</rt>
            </ruby>
            ２
          </>
        ),
      },
      {
        data: contents11,
        title: 'abc練習１',
        ruby: (
          <>
            abc
            <ruby>
              練習<rt>れんしゅう</rt>
            </ruby>
            １
          </>
        ),
      },
      {
        data: contents12,
        title: 'abc練習２',
        ruby: (
          <>
            abc
            <ruby>
              練習<rt>れんしゅう</rt>
            </ruby>
            ２
          </>
        ),
      },
    ],
  },
];

export default BACKGROUND_MAP;
