import { ZwibblerContext } from './zwibbler/zwibbler-def';
// import relaxing from '@/assets/audio/Power_English_Update.mp3';
import relaxing from '@/assets/audio/beep.mp3';

import { Howl, Howler } from 'howler';
export let audioPlayer: Howl | null = null;

type TPlayingNodeId = string | undefined;

export let playingNodeId: TPlayingNodeId;

export const imageAudio = () => {
  // playingNodeId = node;

  audioPlayer && Howler.stop();

  audioPlayer = new Howl({
    src: [relaxing],
    format: ['mp3', 'mpeg'],
    autoplay: false,
    loop: false,
    onend: () => {
      stopAudio();
    },
  });
  console.log('audioPlayer', audioPlayer);

  audioPlayer.play();
};

export const stopAudio = () => {
  playingNodeId = undefined;

  if (audioPlayer) {
    Howler.stop();
    audioPlayer = null;
    console.log('audioPlayer', audioPlayer);
  }
};
