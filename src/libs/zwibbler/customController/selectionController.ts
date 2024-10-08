import { MainScope } from '@/libs/zwibbler/zwibbler-def';

export default function selectionController(scope: MainScope) {
  const ctx = scope.ctx;

  ctx.removeSelectionHandles();

  ctx.addSelectionHandle(
    0.5,
    0.0,
    0,
    -25,
    // node_btn_rotate.svg
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 64 64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:none;%7D.cls-1,.cls-2%7Bstroke-width:0px;%7D.cls-2%7Bfill:%234577ff;%7D%3C/style%3E%3C/defs%3E%3Cg id='_2'%3E%3Crect class='cls-1' width='64' height='64'/%3E%3Cpath class='cls-2' d='M48.48,26.16c-.47-1.3-1.9-1.97-3.2-1.51-1.3.47-1.98,1.9-1.51,3.2.48,1.35.73,2.77.73,4.22,0,6.89-5.61,12.5-12.5,12.5s-12.5-5.61-12.5-12.5c0-.7.08-1.38.19-2.06l2.61,1.47c.38.21.8.32,1.23.32.5,0,1.01-.15,1.44-.45.79-.55,1.19-1.51,1.03-2.46l-1.63-9.81c-.13-.76-.6-1.42-1.28-1.79-.68-.37-1.49-.4-2.19-.09l-8.88,3.9c-.87.38-1.45,1.22-1.49,2.17s.45,1.84,1.27,2.3l3.36,1.89c-.41,1.49-.65,3.04-.65,4.62,0,9.65,7.85,17.5,17.5,17.5s17.5-7.85,17.5-17.5c0-2.03-.34-4.01-1.02-5.9Z'/%3E%3C/g%3E%3C/svg%3E",
    'rotate'
  );

  ctx.addSelectionHandle(0.0, 0.0, 0, 0, '', 'scale');
  ctx.addSelectionHandle(1.0, 0.0, 0, 0, '', 'scale');
  ctx.addSelectionHandle(1.0, 1.0, 0, 0, '', 'scale');
  ctx.addSelectionHandle(0.0, 1.0, 0, 0, '', 'scale');

  ctx.addSelectionHandle(0.5, 0.0, 0, 0, '', 'scale');
  ctx.addSelectionHandle(1.0, 0.5, 0, 0, '', 'scale');
  ctx.addSelectionHandle(0.5, 1.0, 0, 0, '', 'scale');
  ctx.addSelectionHandle(0.0, 0.5, 0, 0, '', 'scale');
}
