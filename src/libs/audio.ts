import { ZwibblerContext } from './zwibbler/zwibbler-def';

import { Howl, Howler } from 'howler';
let audioPlayer: Howl | null = null;

type TPlayingNodeId = string | undefined;

export let playingNodeId: TPlayingNodeId;

export const playAudio = (ctx: ZwibblerContext, node: string, blob: Blob) => {
  playingNodeId = node;

  audioPlayer && Howler.stop();

  audioPlayer = new Howl({
    src: URL.createObjectURL(blob),
    format: ['mp3', 'mpeg'],
    autoplay: false,
    loop: false,
    onend: () => {
      stopAudio(ctx, node);
    },
  });

  audioPlayer.play();
};

export const stopAudio = (ctx: ZwibblerContext, node?: string) => {
  playingNodeId = undefined;

  if (audioPlayer) {
    Howler.stop();
  }
  node && ctx.selectNodes(node);
};
