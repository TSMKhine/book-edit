import { MainScope } from '@/libs/zwibbler/zwibbler-def';

export default function zoomController(scope: MainScope) {
  const ctx = scope.ctx;

  scope.getDisplayedZoom = () => {
    return `${Math.round(ctx.getCanvasScale() * 100)}%`;
  };
}
