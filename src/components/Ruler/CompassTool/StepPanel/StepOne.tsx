import Image from 'next/image';
import { useSetAtom } from 'jotai';
import { compassStepAtom, showRulerAtom } from '@/stores/ui';
import CancelButton from '@/components/Dialog/CancelButton';
import ActionButton from '@/components/Dialog/ActionButton';

import compassAnime from '@/assets/compass/compass_step_1.gif';
import DialogText from '@/assets/dialog/dialog_txt_01.svg';
import CancelButtonText from '@/assets/dialog/dialog_btn_01.svg';
import OKButtonText from '@/assets/dialog/dialog_btn_02.svg';

export default function StepOne() {
  const setCompassStep = useSetAtom(compassStepAtom);
  const setShowRuler = useSetAtom(showRulerAtom);

  const handleClose = () => {
    setShowRuler((prev) => ({
      ...prev,
      compass: false,
    }));
  };

  return (
    <div className="pointer-events-auto flex w-[420px] rounded-md border border-primary bg-background py-2 shadow-lg">
      <div className="w-80">
        <div className="py-3">
          {/* <DialogText /> */}
          <Image src={DialogText} width={384} height={40} alt="" />
        </div>

        <div className="flex justify-between px-4 py-3">
          <CancelButton onClick={handleClose}>
            {/* <CancelButtonText /> */}
            <Image src={CancelButtonText} width={124} height={42} alt="" />
          </CancelButton>
          <ActionButton onClick={() => setCompassStep(2)}>
            {/* <OKButtonText /> */}
            <Image src={OKButtonText} width={124} height={42} alt="" />
          </ActionButton>
        </div>
      </div>
      <div className="grid w-24 place-items-center">
        <Image
          src={compassAnime}
          width={100}
          height={100}
          alt=""
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
