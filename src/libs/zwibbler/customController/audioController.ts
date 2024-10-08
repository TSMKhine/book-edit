import { MainScope } from '@/libs/zwibbler/zwibbler-def';
import { playingNodeId, playAudio, stopAudio } from '@/libs/audio';

export default function audioController(scope: MainScope) {
  const ctx = scope.ctx;

  // audio play button
  ctx.decoration({
    x: 1.0,
    y: 1.0,
    xoffset: 15,
    yoffset: 15,
    width: 25,
    image:
      // https://remixicon.com/icon/play-circle-line
      // "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM10.6219 8.41459L15.5008 11.6672C15.6846 11.7897 15.7343 12.0381 15.6117 12.2219C15.5824 12.2658 15.5447 12.3035 15.5008 12.3328L10.6219 15.5854C10.4381 15.708 10.1897 15.6583 10.0672 15.4745C10.0234 15.4088 10 15.3316 10 15.2526V8.74741C10 8.52649 10.1791 8.34741 10.4 8.34741C10.479 8.34741 10.5562 8.37078 10.6219 8.41459Z'%3E%3C/path%3E%3C/svg%3E",
      // node_btn_play.svg
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:none;%7D.cls-1,.cls-2%7Bstroke-width:0px;%7D.cls-2%7Bfill:%234577ff;%7D%3C/style%3E%3C/defs%3E%3Cg id='_2'%3E%3Crect class='cls-1' width='64' height='64'/%3E%3Cpath class='cls-2' d='M32,60.5c-15.71,0-28.5-12.79-28.5-28.5S16.29,3.5,32,3.5s28.5,12.79,28.5,28.5-12.79,28.5-28.5,28.5ZM32,8.5c-12.96,0-23.5,10.54-23.5,23.5s10.54,23.5,23.5,23.5,23.5-10.54,23.5-23.5-10.54-23.5-23.5-23.5Z'/%3E%3Cpolygon class='cls-2' points='45.19 32 25.19 20 25.19 44 45.19 32'/%3E%3C/g%3E%3C/svg%3E",

    appliesTo: function (node, ctx) {
      if (ctx.getNodeProperty(node, '_audio') && playingNodeId !== node) {
        return true;
      }
      return false;
    },

    onclick: async (node, ctx, event) => {
      ctx.selectNodes(node);
      const audio = ctx.getNodeProperty(node, '_audio');
      if (audio?.data) {
        // convert string to blob
        const binaryData = atob(audio.data.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          int8Array[i] = binaryData.charCodeAt(i) & 0xff;
        }
        const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });

        playAudio(ctx, node, blob);
      }
    },
  });

  // audio stop button
  ctx.decoration({
    x: 1.0,
    y: 1.0,
    xoffset: 15,
    yoffset: 15,
    width: 23,
    image:
      // https://remixicon.com/icon/stop-circle-line
      // "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM9 9H15V15H9V9Z'%3E%3C/path%3E%3C/svg%3E",
      // menu_btn_mic_stop_01.svg
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 42 42'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:none;%7D.cls-1,.cls-2,.cls-3%7Bstroke-width:0px;%7D.cls-2%7Bfill:%234577ff;%7D.cls-3%7Bfill:%23fff;%7D%3C/style%3E%3C/defs%3E%3Cg id='_2'%3E%3Ccircle class='cls-2' cx='21' cy='21' r='20'/%3E%3Cpath class='cls-2' d='M21,1.99c10.48,0,19.01,8.53,19.01,19.01s-8.53,19.01-19.01,19.01S1.99,31.48,1.99,21,10.52,1.99,21,1.99M21,0C9.4,0,0,9.4,0,21s9.4,21,21,21,21-9.4,21-21S32.6,0,21,0h0Z'/%3E%3Crect class='cls-3' x='13' y='13' width='16' height='16'/%3E%3Crect class='cls-1' width='42' height='42'/%3E%3C/g%3E%3C/svg%3E",

    appliesTo: function (node, ctx) {
      if (ctx.getNodeProperty(node, '_audio') && playingNodeId === node) {
        return true;
      }
      return false;
    },

    onclick: async (node, ctx, event) => {
      ctx.selectNodes(node);
      stopAudio(ctx, node);
    },
  });
}
