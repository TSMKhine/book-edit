import { ICanvasContext, ZwibblerContext } from '@/libs/zwibbler/zwibbler-def';

export class ZoomTool {
  constructor(private ctx: ZwibblerContext) {
    this.isDrawing = false;
  }

  private isDrawing = false;
  private startPoint = { x: 0, y: 0 };
  private endPoint = { x: 0, y: 0 };
  private width = 0;
  private height = 0;

  onMouseDown(x: number, y: number, e: PointerEvent) {
    this.isDrawing = true;
    const point = this.ctx.getDocumentCoordinates(e.x, e.y);
    this.startPoint = { x: point.x, y: point.y };
    // console.log('startpoint : ', this.startPoint);

    // console.log(this.startPoint);
  }
  onMouseUp(x: number, y: number, e: PointerEvent) {
    this.isDrawing = false;

    this.ctx.redraw();
    const canvasSize = this.ctx.getCanvasSize();
    const scale = canvasSize.height / this.height;
    console.log(canvasSize.width, this.width);

    this.ctx.setZoom(
      scale,
      this.startPoint.x + this.width / 2,
      this.startPoint.y + this.height / 2
    );

    // var rect = this.ctx.getViewRectangle();
    // rect.y -= 200 / scale;
    // this.ctx.setViewRectangle(rect);

    this.ctx.usePickTool();
  }

  onMouseMove(x: number, y: number, e: PointerEvent) {
    if (!this.isDrawing) return;

    const point = this.ctx.getDocumentCoordinates(e.x, e.y);
    this.endPoint = { x: point.x, y: point.y };
    console.log('endpoint : ', this.endPoint);

    this.ctx.redraw((canvas: ICanvasContext) => {
      this.width = this.endPoint.x - this.startPoint.x;
      // this.height = this.endPoint.y - this.startPoint.y;
      this.height = this.width * Math.sqrt(2);

      canvas.beginPath();
      canvas.rect(
        this.startPoint.x,
        this.startPoint.y,
        this.width,
        this.height
      );
      canvas.strokeStyle = 'black';
      canvas.lineWidth = 2;
      canvas.stroke();

      // canvas.lineTo(x, y);
      // canvas.stroke();
    });
  }
}
