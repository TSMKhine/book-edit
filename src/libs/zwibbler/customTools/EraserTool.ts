import { ZwibblerContext } from '@/libs/zwibbler/zwibbler-def';
import { CANVAS_LAYER, COLOR } from '@/constants/canvas';

export class EraserTool {
  constructor(private ctx: ZwibblerContext) {}

  private isErasing = false;

  getToolName() {
    return 'eraser';
  }

  enter() {
    this.ctx.setCursor('none');
  }
  leave() {
    this.ctx.setCursor('default');
    this.ctx.redraw();
  }

  onMouseClick(x: number, y: number, e: PointerEvent) {
    this.deleteNodes(x, y);
  }

  onMouseDown(x: number, y: number, e: PointerEvent) {
    this.isErasing = true;

    this.ctx.redraw((canvas) => {
      canvas.beginPath();
      canvas.arc(x, y, this.ctx.getTouchRadius(e) / 2, 0, 2 * Math.PI);
      canvas.stroke();
      canvas.fillStyle = COLOR.WHITE;
      canvas.fill();
      canvas.closePath();
    });
  }
  onMouseUp(x: number, y: number, e: PointerEvent) {
    this.isErasing = false;

    this.ctx.redraw();
  }

  onMouseMove(x: number, y: number, e: PointerEvent) {
    if (this.isErasing) {
      this.deleteNodes(x, y);
    }

    this.ctx.redraw((canvas) => {
      canvas.beginPath();
      canvas.strokeStyle = '#d1d5db';
      canvas.lineWidth = 3;
      canvas.arc(x, y, this.ctx.getTouchRadius(e) / 2, 0, 2 * Math.PI);
      canvas.stroke();
      canvas.fillStyle = COLOR.WHITE;
      canvas.fill();
      canvas.closePath();
    });
  }

  // 背景以外のノードを削除
  private deleteNodes(x: number, y: number) {
    const nodes = this.ctx.getNodesUnderPoint(x, y);

    const bgNodes = this.ctx.getLayerNodes(CANVAS_LAYER.BACKGROUND);
    if (nodes.length) {
      const targetNodes = nodes.filter((node) => !bgNodes.includes(node));
      this.ctx.deleteNodes(targetNodes);
    }
  }
}
