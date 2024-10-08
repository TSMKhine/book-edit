import { MainScope } from '@/libs/zwibbler/zwibbler-def';

export default function linkController(scope: MainScope) {
  const ctx = scope.ctx;

  // link button
  ctx.decoration({
    x: 1.0,
    y: 0,
    xoffset: 15,
    yoffset: -15,
    width: 25,
    image:
      // https://remixicon.com/icon/external-link-line
      // "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V12L17.206 8.207L11.2071 14.2071L9.79289 12.7929L15.792 6.793L12 3H21Z'%3E%3C/path%3E%3C/svg%3E",
      // node_btn_link.svg
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:none;%7D.cls-1,.cls-2%7Bstroke-width:0px;%7D.cls-2%7Bfill:%234577ff;%7D%3C/style%3E%3C/defs%3E%3Cg id='_2'%3E%3Cpath class='cls-2' d='M47.45,58.5H8c-1.38,0-2.5-1.12-2.5-2.5V16.55c0-1.38,1.12-2.5,2.5-2.5h16.63c1.38,0,2.5,1.12,2.5,2.5s-1.12,2.5-2.5,2.5h-14.13v34.45h34.45v-16.52c0-1.38,1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5v19.02c0,1.38-1.12,2.5-2.5,2.5Z'/%3E%3Cpath class='cls-2' d='M53.86,8.01l-19.99,1.76c-.88,0-1.32,1.06-.7,1.68l7.6,7.6-15.14,15.14c-1.15,1.15-1.15,3.02,0,4.17.58.58,1.33.86,2.09.86s1.51-.29,2.09-.86l15.14-15.14,7.6,7.6c.62.62,1.68.18,1.68-.7l1.76-19.99c.11-1.22-.91-2.24-2.13-2.13Z'/%3E%3Crect class='cls-1' width='64' height='64'/%3E%3C/g%3E%3C/svg%3E",

    appliesTo: function (node, ctx) {
      if (ctx.getNodeProperty(node, '_link')) {
        return true;
      }
      return false;
    },

    onclick: function (node, ctx, event) {
      let link = ctx.getNodeProperty(node, '_link');
      if (!/^https?:\/\//.test(link)) {
        link = 'https://' + link;
      }
      window.open(link, '_blank', 'noreferrer');
    },
  });
}
