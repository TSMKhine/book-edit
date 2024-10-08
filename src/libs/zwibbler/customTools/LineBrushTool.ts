import { ICanvasContext, ZwibblerContext } from '@/libs/zwibbler/zwibbler-def';
import { BRUSH_TYPE, COLOR, NODE_TYPE } from '@/constants/canvas';

export class LineBrushTool {
  constructor(
    private ctx: ZwibblerContext,
    private lineWidth: number,
    private strokeStyle: string //color
  ) {}

  private isDrawing = false;
  private startPoint = { x: 0, y: 0 };

  getToolName() {
    return 'brush';
  }

  enter() {
    this.ctx.setCursor('none');
  }

  leave() {
    this.ctx.setCursor('default');
    this.ctx.redraw();
  }

  onMouseDown(x: number, y: number, e: PointerEvent) {
    this.isDrawing = true;

    this.startPoint = { x, y };
  }

  onMouseUp(x: number, y: number, e: PointerEvent) {
    if (this.startPoint.x === x && this.startPoint.y === y) {
      this.isDrawing = false;
      return;
    }

    if (this.isDrawing) {
      this.ctx.begin();
      this.ctx.createNode(NODE_TYPE.BRUSH, {
        points: [this.startPoint.x, this.startPoint.y, x, y],
        lineWidth: this.lineWidth,
        strokeStyle: this.strokeStyle,
        _brushType: BRUSH_TYPE.LINE,
        _lineWidth: this.lineWidth,
        lockPosition: true,
        lockSize: true,
        lockRotation: true,
        // lockRotation: true,
        lockEditMode: true,
        _lockCopy: true,
      });
      this.ctx.commit();
    }

    this.isDrawing = false;
    this.ctx.clearSelection();
  }

  onMouseMove(x: number, y: number, e: PointerEvent) {
    this.ctx.redraw((canvas: ICanvasContext) => {
      // cursor
      this.drawCursor(canvas, x, y);

      // line
      if (this.isDrawing) {
        canvas.beginPath();
        canvas.lineCap = 'round';
        canvas.lineWidth = this.lineWidth;
        canvas.strokeStyle = this.strokeStyle;
        canvas.moveTo(this.startPoint.x, this.startPoint.y);
        canvas.lineTo(x, y);
        canvas.stroke();
        canvas.closePath();
      }
    });
  }

  private drawCursor(canvas: ICanvasContext, x: number, y: number) {
    const r = this.lineWidth / 2 + 1;
    canvas.beginPath();
    canvas.arc(x, y, r, 0, Math.PI * 2);
    canvas.lineWidth = 1 / this.ctx.getCanvasScale();
    canvas.strokeStyle = COLOR.BLACK;
    canvas.stroke();
    canvas.closePath();
  }
}
