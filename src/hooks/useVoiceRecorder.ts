import { useState, useEffect } from 'react';
import { Howl, Howler } from 'howler';

import beepSound from '@/assets/audio/beep.mp3';

import {
  SetRecorder,
  Recorder,
  Interval,
  AudioTrack,
  MediaRecorderEvent,
} from '@/types/recorder';

const initialState: Recorder = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
};

const MAX_RECORDER_TIME = 1;

export default function useVoiceRecorder() {
  const [recorderState, setRecorderState] = useState<Recorder>(initialState);

  useEffect(() => {
    let recordingInterval: Interval = null;

    if (recorderState.initRecording) {
      recordingInterval = setInterval(() => {
        setRecorderState((prevState: Recorder) => {
          if (
            prevState.recordingMinutes === MAX_RECORDER_TIME &&
            prevState.recordingSeconds === 0
          ) {
            typeof recordingInterval === 'number' &&
              clearInterval(recordingInterval);
            saveRecording(recorderState.mediaRecorder);
            return prevState;
          }

          if (
            prevState.recordingSeconds >= 0 &&
            prevState.recordingSeconds < 59
          )
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1,
            };
          else if (prevState.recordingSeconds === 59)
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0,
            };
          else return prevState;
        });
      }, 1000);
    } else {
      typeof recordingInterval === 'number' && clearInterval(recordingInterval);
    }

    return () => {
      typeof recordingInterval === 'number' && clearInterval(recordingInterval);
    };
  });

  useEffect(() => {
    const recorder = recorderState.mediaRecorder;
    let chunks: Blob[] = [];

    if (recorder && recorder.state === 'inactive') {
      recorder.start();

      recorder.ondataavailable = (e: MediaRecorderEvent) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/mpeg' });
        chunks = [];

        setRecorderState((prevState: Recorder) => {
          if (prevState.mediaRecorder)
            return {
              ...initialState,
              // audio: URL.createObjectURL(blob),
              audio: blob,
            };
          else return initialState;
        });
      };
    }

    return () => {
      if (recorder)
        recorder.stream
          .getAudioTracks()
          .forEach((track: AudioTrack) => track.stop());
    };
  }, [recorderState.mediaRecorder]);

  useEffect(() => {
    setRecorderState((prevState) => {
      if (prevState.mediaStream) {
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream),
        };
      } else {
        return prevState;
      }
    });
  }, [recorderState.mediaStream]);

  async function startRecording(setRecorderState: SetRecorder) {
    try {
      Howler.stop();
      const sound = new Howl({
        src: [beepSound],
        autoplay: false,
        loop: false,
      });

      // play beep
      sound.play();

      const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      setRecorderState((prevState) => {
        return {
          ...prevState,
          initRecording: true,
          mediaStream: stream,
        };
      });
    } catch (err) {
      console.error(err);
    }
  }

  function saveRecording(recorder: MediaRecorder | null) {
    if (recorder?.state !== 'inactive') recorder?.stop();
  }

  return {
    recorderState,
    startRecording: () => startRecording(setRecorderState),
    cancelRecording: () => setRecorderState(initialState),
    saveRecording: () => saveRecording(recorderState.mediaRecorder),
  };
}
