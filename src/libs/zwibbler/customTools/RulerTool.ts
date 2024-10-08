import {
  ICanvasContext,
  ZwibblerContext,
  IPoint,
} from '@/libs/zwibbler/zwibbler-def';
import { BRUSH_TYPE, COLOR, NODE_TYPE, WIDTH } from '@/constants/canvas';

export class RulerTool {
  constructor(private ctx: ZwibblerContext) {}

  private lineWidth = WIDTH.THIN;
  private strokeStyle = COLOR.BLACK;
  private isDrawing = false;
  private startPoint = { x: 0, y: 0 };
  private endPoint = { x: 0, y: 0 };
  private pointA = { x: 0, y: 0 };
  private pointB = { x: 0, y: 0 };

  getToolName() {
    return 'brush';
  }

  enter() {
    // this.ctx.setCursor('none');
  }

  leave() {
    // this.ctx.setCursor('default');
    this.ctx.redraw();
  }

  onMouseDown(x: number, y: number, pointA: IPoint, pointB: IPoint) {
    if (this.isDrawing) {
      return;
    }

    this.isDrawing = true;
    this.pointA = pointA;
    this.pointB = pointB;

    this.startPoint = this.findNearest({ x, y }, pointA, pointB);
  }

  onMouseUp(x: number, y: number) {
    const mouseUpPoint = this.findNearest({ x, y }, this.pointA, this.pointB);
    const isEqualPoint =
      this.startPoint.x === mouseUpPoint.x &&
      this.startPoint.y === mouseUpPoint.y;

    if (this.isDrawing) {
      if (this.startPoint.x === 0 && this.startPoint.y === 0) {
        return;
      }

      this.ctx.begin();
      if (isEqualPoint) {
        this.ctx.createNode(NODE_TYPE.BRUSH, {
          points: [
            mouseUpPoint.x,
            mouseUpPoint.y,
            mouseUpPoint.x + 0.001,
            mouseUpPoint.y + 0.001,
          ],
          lineWidth: 5,
          strokeStyle: this.strokeStyle,
          _brushType: BRUSH_TYPE.LINE,
          _lineWidth: this.lineWidth,
          lockEditMode: true,
          lockPosition: true,
          lockSize: true,
          lockRotation: true,
          _lockCopy: true,
        });
      } else {
        // create line
        this.ctx.createNode(NODE_TYPE.BRUSH, {
          points: [
            this.startPoint.x,
            this.startPoint.y,
            this.endPoint.x + 0.001,
            this.endPoint.y + 0.001,
          ],
          lineWidth: this.lineWidth,
          strokeStyle: this.strokeStyle,
          _brushType: BRUSH_TYPE.LINE,
          _lineWidth: this.lineWidth,
          lockEditMode: true,
          lockPosition: true,
          lockSize: true,
          lockRotation: true,
          _lockCopy: true,
        });
      }
      this.ctx.commit();
      this.ctx.clearSelection();
      this.ctx.usePickTool();

      this.isDrawing = false;
    }
  }

  onMouseMove(x: number, y: number) {
    this.ctx.redraw((canvas: ICanvasContext) => {
      // cursor
      // this.drawCursor(canvas, x, y);

      // line
      if (this.isDrawing) {
        canvas.beginPath();
        canvas.lineCap = 'round';
        canvas.lineWidth = this.lineWidth;
        canvas.strokeStyle = this.strokeStyle;
        canvas.moveTo(this.startPoint.x, this.startPoint.y);

        this.endPoint = this.findNearest({ x, y }, this.pointA, this.pointB);

        canvas.lineTo(this.endPoint.x, this.endPoint.y);
        canvas.stroke();
        canvas.closePath();
      }
    });

    this.ctx.autoScroll(x, y);
  }

  /**
   * 点pから直線ab上の最も近い点qを計算
   *
   * @param p
   * @param a
   * @param b
   */
  private findNearest(p: IPoint, a: IPoint, b: IPoint) {
    // 垂直
    if (a.x === b.x) {
      return { x: a.x, y: p.y };
    }

    // 水平
    if (a.y === b.y) {
      return { x: p.x, y: a.y };
    }

    // 傾き
    const m = (a.y - b.y) / (a.x - b.x);
    // 傾きの逆数
    const n = (b.x - a.x) / (a.y - b.y);

    const q = { x: 0, y: 0 };
    q.x = (p.y - a.y + a.x * m - p.x * n) / (m - n);
    q.y = m * q.x + a.y - a.x * m;

    return q;
  }
}
