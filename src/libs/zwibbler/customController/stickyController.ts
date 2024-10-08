import { MainScope } from '@/libs/zwibbler/zwibbler-def';
import { getFillColor } from '@/libs/utils';
import { COLOR, FILL_TYPE } from '@/constants/canvas';

export default function stickyController(scope: MainScope) {
  const ctx = scope.ctx;

  ctx.decoration({
    x: 1.0,
    y: 1.0,
    xoffset: -15,
    yoffset: -15,
    width: 25,
    image:
      // https://remixicon.com/icon/reply-all-fill
      // "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='transform: rotate(60deg);' %3E%3Cpath d='M14 4.5V9C19.5228 9 24 13.4772 24 19C24 19.2727 23.9891 19.5428 23.9677 19.81C22.5055 17.0364 19.6381 15.119 16.313 15.0053L16 15H13.9999L14 19.5L6 12L14 4.5ZM8 4.5V7.237L2.92 12L7.999 16.761L8 19.5L0 12L8 4.5Z'%3E%3C/path%3E%3C/svg%3E",
      // node_btn_flip.svg
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:none;%7D.cls-1,.cls-2,.cls-3%7Bstroke-width:0px;%7D.cls-2%7Bfill:%234577ff;%7D.cls-3%7Bfill:%23fff;%7D%3C/style%3E%3C/defs%3E%3Cg id='_2'%3E%3Cpath class='cls-3' d='M52.6,23.3c-.33-1.5-1.49-2.69-2.99-3.04l-5.64-1.33.18-.14c1.21-.95,1.78-2.5,1.45-4.01-.33-1.5-1.49-2.69-2.99-3.04l-26.07-6.16c-1.2-.28-2.47,0-3.43.78-.96.77-1.51,1.95-1.49,3.18l.43,26.11c.02,1.52.9,2.89,2.27,3.54.55.26,1.14.39,1.73.39.87,0,1.74-.29,2.46-.84l.44-.34.09,5.78c.02,1.52.9,2.89,2.27,3.54,1.37.66,2.99.48,4.18-.45l5.12-3.98c.42,1.06.77,2.39,1.05,3.98.46,2.71-.83,5.06-.83,5.06-.97,1.67-.61,3.79.85,5.05.75.64,1.68.96,2.6.96s1.78-.3,2.52-.89c.87-.7,8.46-7.13,8.81-16.6.08-2.28-.02-5.4-.8-8.6l6.32-4.91c1.22-.95,1.78-2.5,1.45-4.01Z'/%3E%3Cpolygon class='cls-2' points='19.3 14.09 22.15 14.76 37.99 18.51 41.7 15.62 15.63 9.46 16.06 35.56 19.61 32.81 19.35 17.02 19.3 14.09'/%3E%3Crect class='cls-1' width='64' height='64'/%3E%3Cpath class='cls-2' d='M48.7,24.15l-26.07-6.16.43,26.11,8.35-6.49c2.57,1.99,3.65,5.69,4.21,8.97.73,4.29-1.32,7.75-1.32,7.75,0,0,7.04-5.67,7.33-13.64.11-3.16-.21-6.77-1.43-9.92l8.5-6.61Z'/%3E%3C/g%3E%3C/svg%3E",

    appliesTo: function (node, ctx) {
      if (ctx.getNodeProperty(node, '_isSticky')) {
        return true;
      }
      return false;
    },

    onclick: function (node, ctx, event) {
      const isOpened = ctx.getNodeProperty(node, '_isOpened');
      const color = ctx.getNodeProperty(node, 'strokeStyle');

      if (isOpened) {
        ctx.setNodeProperties(node, {
          fillStyle: getFillColor(FILL_TYPE.FILL, color),
          strokeStyle: color,
          dashes: '',
          textFillStyle: COLOR.BLACK,
          text: ctx.getNodeProperty(node, '_text'),
          lockText: ctx.getNodeProperty(node, 'lockPosition') || undefined,
          _text: '',
          _isOpened: false,
        });
      } else {
        ctx.setNodeProperties(node, {
          fillStyle: getFillColor(FILL_TYPE.NONE, color),
          strokeStyle: color,
          dashes: '5,5',
          textFillStyle: COLOR.WHITE,
          text: '',
          lockText: true,
          _text: ctx.getNodeProperty(node, 'text'),
          _isOpened: true,
        });
      }
    },
  });
}
