import Image from 'next/image';
import { useSetAtom } from 'jotai';
import clearRuler from '@/assets/compass/ruler_ruler-clear.png';
import protractor from '@/assets/compass/ruler_protractor.png';
import triangular from '@/assets/compass/ruler_triangular.png';
import triangularBi from '@/assets/compass/ruler_triangular-bisector.png';
import compass from '@/assets/compass/compass.png';

import { RULER_KIND } from '@/constants/canvas';
import { showRulerAtom } from '@/stores/ui';
import { TRulerKind } from '@/types/ui';

import ClearButton from '@/assets/icon/toolbar/ruler/item_btn_01_off.svg';

const rulerImages = [
  {
    kind: RULER_KIND.CLEAR_RULER,
    src: clearRuler,
  },
  {
    kind: RULER_KIND.PROTRACTOR,
    src: protractor,
  },
  {
    kind: RULER_KIND.TRIANGULAR,
    src: triangular,
  },
  {
    kind: RULER_KIND.TRIANGULAR_BI,
    src: triangularBi,
  },
  {
    kind: RULER_KIND.COMPASS,
    src: compass,
  },
];

export default function RulerMenu() {
  const setShowRuler = useSetAtom(showRulerAtom);

  const handleSelectRuler = (rulerKind: string) => {
    setShowRuler((prev) => ({
      ...prev,
      [rulerKind]: !prev[rulerKind as TRulerKind],
    }));
  };

  const handleClearSelection = () => {
    setShowRuler((prev) => {
      let newState = { ...prev };
      for (let key in newState) {
        newState[key as TRulerKind] = false;
      }
      return newState;
    });
  };

  return (
    <div className="h-60 w-screen max-w-screen-md rounded-lg bg-neutral-200 p-2">
      <div className="h-full bg-white">
        <div className="flex h-full flex-col gap-3 p-3">
          <div className="grid h-full grid-cols-5 justify-center gap-8 bg-[#ECF1FF] px-2">
            {rulerImages.map((ruler, index) => (
              <div
                key={index}
                className="relative flex h-auto w-full origin-bottom cursor-pointer items-end justify-center pb-2 transition-transform	duration-200 hover:scale-110"
                onClick={() => handleSelectRuler(ruler.kind)}
              >
                <Image
                  src={ruler.src}
                  alt=""
                  priority
                  className="max-h-[120px] max-w-[120px] object-contain object-bottom"
                />
              </div>
            ))}
          </div>

          {/* button */}
          <div className="flex items-center justify-center">
            <button
              className="h-[44px] w-[176px]"
              onClick={handleClearSelection}
            >
              {/* <ClearButton /> */}
              <Image src={ClearButton} width={176} height={44} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
