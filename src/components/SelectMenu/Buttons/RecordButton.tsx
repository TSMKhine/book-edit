import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { contextAtom } from '@/stores/canvas';

import useVoiceRecorder from '@/hooks/useVoiceRecorder';
import { UseRecorder } from '@/types/recorder';
import { cn } from '@/libs/utils';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import CancelButton from '@/components/Dialog/CancelButton';

import MicButtonOnIcon from '@/assets/icon/menubar/menu_btn_mic_01_off.svg';
import CancelButtonText from '@/assets/dialog/dialog_btn_01.svg';

import RecordIcon from '@/assets/icon/menubar/menu_btn_mic_record_01.svg';
import RecordDisabledIcon from '@/assets/icon/menubar/menu_btn_mic_record_02.svg';
import StopIcon from '@/assets/icon/menubar/menu_btn_mic_stop_01.svg';
import StopDisabledIcon from '@/assets/icon/menubar/menu_btn_mic_trash_02.svg';
import TrashIcon from '@/assets/icon/menubar/menu_btn_mic_trash_01.svg';

export function formatMinutes(minutes: number) {
  return minutes < 10 ? `0${minutes}` : `${minutes}`;
}

export function formatSeconds(seconds: number) {
  return seconds < 10 ? `0${seconds}` : `${seconds}`;
}

export default function RecordButton() {
  const [open, setOpen] = useState<boolean>(false);

  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  const [ctx] = useAtom(contextAtom);
  const _audio = ctx.summary?.properties._audio;

  const {
    recorderState,
    startRecording,
    saveRecording,
    cancelRecording,
  }: UseRecorder = useVoiceRecorder();

  const { audio, recordingMinutes, recordingSeconds, initRecording } =
    recorderState;

  useEffect(() => {
    setMin(recordingMinutes);
    setSec(recordingSeconds);
  }, [recordingMinutes, recordingSeconds]);

  useEffect(() => {
    if (audio) {
      const reader = new FileReader();
      reader.onload = function () {
        const audioText = reader.result;
        ctx.setNodeProperties(ctx.getSelectedNodes(), {
          _audio: {
            data: audioText,
            min,
            sec,
          },
        });
      };
      reader.readAsDataURL(audio);
    }

    return () => {};
  }, [audio]);

  const handleDeleteAudio = () => {
    ctx.setNodeProperties(ctx.getSelectedNodes(), {
      _audio: undefined,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="relative flex h-[45px] w-[75px] items-center justify-center">
          {/* <MicButtonOnIcon className="h-full w-full" /> */}
          <Image src={MicButtonOnIcon} fill alt="" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-xs">
        <AlertDialogHeader></AlertDialogHeader>
        <div className="flex justify-between px-6 pb-3">
          <div className="text-2xl tracking-widest">
            <span>{formatMinutes(_audio ? _audio.min : recordingMinutes)}</span>
            <span>:</span>
            <span>{formatSeconds(_audio ? _audio.sec : recordingSeconds)}</span>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {/* recording button */}
            {initRecording ? (
              <button
                className="text-foreground"
                disabled={recordingSeconds === 0}
                onPointerUp={saveRecording}
              >
                {/* <StopIcon width={32} height={32} /> */}
                <Image src={StopIcon} width={32} height={32} alt="" />
              </button>
            ) : (
              <button
                disabled={_audio}
                className={cn(
                  _audio
                    ? 'pointer-events-none text-secondary'
                    : 'pointer-events-auto text-rose-500'
                )}
                onPointerUp={startRecording}
              >
                {!_audio ? (
                  // <RecordIcon width={32} height={32} />
                  <Image src={RecordIcon} width={32} height={32} alt="" />
                ) : (
                  // <RecordDisabledIcon width={32} height={32} />
                  <Image
                    src={RecordDisabledIcon}
                    width={32}
                    height={32}
                    alt=""
                  />
                )}
              </button>
            )}

            {/* delete button */}
            <button
              disabled={!_audio}
              className={cn(
                _audio
                  ? 'pointer-events-auto text-foreground'
                  : 'pointer-events-none text-secondary'
              )}
              onPointerUp={handleDeleteAudio}
            >
              {_audio ? (
                // <TrashIcon width={32} height={32} />
                <Image src={TrashIcon} width={32} height={32} alt="" />
              ) : (
                // <StopDisabledIcon width={32} height={32} />
                <Image src={StopDisabledIcon} width={32} height={32} alt="" />
              )}
            </button>
          </div>
        </div>
        <AlertDialogFooter className="sm:justify-center">
          <CancelButton
            onPointerUp={() => {
              cancelRecording();
              setOpen(false);
            }}
          >
            {/* <CancelButtonText /> */}
            <Image src={CancelButtonText} width={124} height={42} alt="" />
          </CancelButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
