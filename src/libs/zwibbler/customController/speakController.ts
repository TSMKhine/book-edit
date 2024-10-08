import { MainScope } from '@/libs/zwibbler/zwibbler-def';
import { playAudio, stopAudio } from '@/libs/audio';

export default function speakController(scope: MainScope) {
  const ctx = scope.ctx;

  async function fetchAndPlayAudio(node: string, text: string) {
    const body = JSON.stringify({ text });

    try {
      const response = await fetch('/api/synthesize-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!response.ok) {
        throw new Error(`Audio fetch failed with status: ${response.status}`);
      }
      const blob = await response.blob();

      playAudio(ctx, node, blob);
      ctx.selectNodes(node);
    } catch (e) {
      console.error('Error occurred while fetching or playing audio:', e);
    }
  }

  ctx.addSelectionHandle(
    0.0,
    0.0,
    0,
    -25,
    // width='20' height='20' fill='rgba(0,81,183,1)'
    // "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 24 24'%3E%3Cpath d='M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22H2L4.92893 19.0711C3.11929 17.2614 2 14.7614 2 12ZM6.82843 20H12C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 14.1524 4.85124 16.1649 6.34315 17.6569L7.75736 19.0711L6.82843 20ZM11 6H13V18H11V6ZM7 9H9V15H7V9ZM15 9H17V15H15V9Z' fill='rgba(0,81,183,1)'%3E%3C/path%3E%3C/svg%3E",
    // node_btn_speak.svg
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 64 64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:none;%7D.cls-1,.cls-2%7Bstroke-width:0px;%7D.cls-2%7Bfill:%234577ff;%7D%3C/style%3E%3C/defs%3E%3Cg id='_2'%3E%3Crect class='cls-1' width='64' height='64'/%3E%3Cpath class='cls-2' d='M32,60.13H5.92c-.96,0-1.83-.55-2.25-1.41-.42-.86-.3-1.89.3-2.64l5.55-6.97c-3.86-4.97-5.96-11.08-5.96-17.42C3.55,16.01,16.32,3.25,32,3.25s28.44,12.76,28.44,28.45-12.76,28.43-28.44,28.43ZM11.1,55.14h20.9c12.93,0,23.45-10.52,23.45-23.45s-10.52-23.46-23.45-23.46S8.54,18.76,8.54,31.7c0,5.82,2.15,11.39,6.04,15.71.82.91.86,2.27.1,3.23l-3.59,4.51Z'/%3E%3Cpath class='cls-2' d='M31.93,48.15c-1.38,0-2.5-1.12-2.5-2.5v-27.91c0-1.38,1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5v27.91c0,1.38-1.12,2.5-2.5,2.5Z'/%3E%3Cpath class='cls-2' d='M20.15,41.52c-1.38,0-2.5-1.12-2.5-2.5v-14.65c0-1.38,1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5v14.65c0,1.38-1.12,2.5-2.5,2.5Z'/%3E%3Cpath class='cls-2' d='M43.71,41.52c-1.38,0-2.5-1.12-2.5-2.5v-14.65c0-1.38,1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5v14.65c0,1.38-1.12,2.5-2.5,2.5Z'/%3E%3C/g%3E%3C/svg%3E",
    // '',
    (x, y) => {
      const nodes = ctx.getSelectedNodes();
      if (nodes.length === 1) {
        const node = nodes[0];
        const text = ctx.getNodeProperty(node, 'text');
        if (!!text) {
          fetchAndPlayAudio(nodes[0], text);
        }
      }
    },
    () => {
      const nodes = ctx.getSelectedNodes();
      if (nodes.length === 1) {
        const nodeType = ctx.getNodeType(nodes[0]);
        if (nodeType === 'TextNode') {
          return true;
        }
      }
      return false;
    }
  );
}
