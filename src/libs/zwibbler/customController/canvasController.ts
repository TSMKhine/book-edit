import { MainScope } from '@/libs/zwibbler/zwibbler-def';

export default function canvasController(scope: MainScope) {
  const ctx = scope.ctx;

  // canvas width
  scope.getCanvasWidth = () => {
    const { width } = ctx.getCanvasSize();
    return width;
  };
  // canvas height
  scope.getCanvasHeight = () => {
    const { height } = ctx.getCanvasSize();
    return height;
  };
  // canvas scale
  scope.getCanvasScale = () => {
    return ctx.getCanvasScale();
  };
  // canvas translateX
  scope.getCanvasTranslateX = () => {
    const { translateX } = ctx.getCanvasTranslate();
    return translateX;
  };
  // canvas translateY
  scope.getCanvasTranslateY = () => {
    const { translateY } = ctx.getCanvasTranslate();
    return translateY;
  };
}
