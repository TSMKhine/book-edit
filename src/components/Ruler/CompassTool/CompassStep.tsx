import { useAtom } from 'jotai';
import { compassStepAtom } from '@/stores/ui';

import StepOne from './StepPanel/StepOne';
import StepTwo from './StepPanel/StepTwo';
import StepThree from './StepPanel/StepThree';
import StepFour from './StepPanel/StepFour';
import { useEffect } from 'react';

export default function CompassStep() {
  const [compassStep, setCompassStep] = useAtom(compassStepAtom);

  useEffect(() => {
    return () => {
      setCompassStep(1);
    };
  }, []);

  return (
    <div className="flex justify-center pt-2">
      {compassStep === 1 && <StepOne />}
      {compassStep === 2 && <StepTwo />}
      {compassStep === 3 && <StepThree />}
      {compassStep === 4 && <StepFour />}
    </div>
  );
}
