import Image from 'next/image';
import { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { compassPointsAtom, compassStepAtom, showRulerAtom } from '@/stores/ui';
import { contextAtom } from '@/stores/canvas';
import { BRUSH_TYPE, COLOR, WIDTH } from '@/constants/canvas';
import { clearTempLayer } from '@/libs/utils';

import CancelButton from '@/components/Dialog/CancelButton';
import ActionButton from '@/components/Dialog/ActionButton';

import CloseButtonText from '@/assets/dialog/dialog_btn_compass_01.svg';
import UndoButtonText from '@/assets/dialog/dialog_btn_compass_02.svg';
import RedoButtonText from '@/assets/dialog/dialog_btn_compass_03.svg';

export default function StepFour() {
  const ctx = useAtomValue(contextAtom);
  const setShowRuler = useSetAtom(showRulerAtom);
  const setCompassStep = useSetAtom(compassStepAtom);
  const [compassPoints, setCompassPoints] = useAtom(compassPointsAtom);

  useEffect(() => {
    return () => {
      // リセット
      setCompassPoints({
        center: { x: 0, y: 0 },
        points: [],
      });
      clearTempLayer();
    };
  }, []);

  const addCompassNode = () => {
    if (compassPoints.points.length === 0) {
      return;
    }

    // create new node
    const arcNodeId = ctx.createNode('BrushNode', {
      points: compassPoints.points,
      _centerPos: compassPoints.center,
      lineWidth: WIDTH.THIN,
      strokeStyle: COLOR.BLACK,
      _brushType: BRUSH_TYPE.LINE,
      _lineWidth: WIDTH.THIN,
      lockEditMode: true,
      lockPosition: true,
      lockSize: true,
      lockRotation: true,
      _lockCopy: true,
    });

    const centerNodeId = ctx.createNode('BrushNode', {
      points: [
        compassPoints.center.x,
        compassPoints.center.y,
        compassPoints.center.x + 0.001,
        compassPoints.center.y + 0.001,
      ],
      lineWidth: WIDTH.NORMAL,
      strokeStyle: COLOR.BLACK,
      _brushType: BRUSH_TYPE.LINE,
      _lineWidth: WIDTH.NORMAL,
      lockEditMode: true,
      lockPosition: true,
      lockSize: true,
      lockRotation: true,
      _lockCopy: true,
    });

    // ctx.createGroup([arcNodeId, centerNodeId]);

    ctx.clearSelection();
  };

  const handleClose = () => {
    // 円をかく
    addCompassNode();
    // コンパスを閉じる
    setShowRuler((prev) => ({
      ...prev,
      compass: false,
    }));
  };

  // やり直す
  const handleUndo = () => {
    // 手順１に戻る
    setCompassStep(1);
  };

  // つづける
  const handleRedo = () => {
    // 円をかく
    addCompassNode();
    // 手順１に戻る
    setCompassStep(1);
  };

  return (
    <div className="pointer-events-auto w-[540px] rounded-md border border-primary bg-background py-2 shadow-lg">
      <div className="relative flex justify-evenly gap-4 px-4 py-2">
        <CancelButton
          className="relative h-[42px] w-[190px]"
          onClick={handleClose}
        >
          {/* <CloseButtonText /> */}
          <Image src={CloseButtonText} fill alt="" />
        </CancelButton>
        <CancelButton
          className="relative h-[42px] w-[124px]"
          onClick={handleUndo}
        >
          {/* <UndoButtonText /> */}
          <Image src={UndoButtonText} fill alt="" />
        </CancelButton>
        <ActionButton
          className="relative h-[42px] w-[146px]"
          onClick={handleRedo}
        >
          {/* <RedoButtonText /> */}
          <Image src={RedoButtonText} fill alt="" />
        </ActionButton>
      </div>
    </div>
  );
}
