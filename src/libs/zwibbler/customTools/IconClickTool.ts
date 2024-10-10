import { ZwibblerContext } from '@/libs/zwibbler/zwibbler-def';
import { CANVAS_LAYER, COLOR } from '@/constants/canvas';

export let qrImage = false;
export class IconClickTool {
  constructor(private ctx: ZwibblerContext) {}

  // private isErasing = false;

  onMouseClick(x: number, y: number, e: PointerEvent) {
    console.log('click');
    this.iconClick(x, y);
  }
  // onMouseDown(x: number, y: number, e: PointerEvent) {
  //   console.log('down');
  // }

  // 背景以外のノードを削除
  private iconClick(x: number, y: number) {
    var pageNode = this.ctx.getNodeObject(this.ctx.getPageNode());

    // console.log('pageNo', pageNo);

    var nodelength = pageNode?.children.length || 0;
    // const nodes = ctx.
    // console.log('childNode', childNodes);
    // childNodes?.map((node) => {
    //   console.log('node', node);
    // });
    for (var childNode = 0; childNode < nodelength; childNode++) {
      console.log('chidlnode', pageNode?.children[childNode]);
      var nodeId = pageNode?.children[childNode].id;
      if (nodeId) {
        const qrNode = this.ctx.getNodeProperty(nodeId, '_qrNode');
        console.log('qrNode', qrNode);
        // var nodeArr = [];
        if (qrNode) {
          // nodeArr.push(noteId);
          // console.log('nodeArr', nodeArr);
          var rect = this.ctx.getNodeRectangle(nodeId);
          if (
            x >= rect.x &&
            x <= rect.x + rect.width &&
            y >= rect.y &&
            y <= rect.y + rect.height
          ) {
            // console.log('audioPlayer', audioPlayer);
            this.ctx.clearSelection();
            // if (audioPlayer) {
            //   stopAudio();
            // } else {
            //   imageAudio();
            // }
            // console.log('audioPlayer after', audioPlayer);
            // setShowQrImage(true);
            qrImage = true;
            console.log('click');
          }
          //   console.log(rect.x, rect.y, rect.width, rect.height);
          // console.log('x', x);
          // console.log('y', y);
        }
      }
    }
  }
}
