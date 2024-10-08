import { ZOOM } from '@/constants/canvas';

const lowercaseObjectKeys = <T>(obj: Record<string, T>) => {
  const newObj: Record<string, T> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key.toLowerCase()] = obj[key];
    }
  }

  return newObj;
};

// NOTE: key:lowercase, value:string
export const ZwibblerConfig = lowercaseObjectKeys({
  zwibbler: '',

  // persistent: 'true',
  allowSelectBox: 'true',
  showHints: 'false',
  showToolbar: 'false',
  background: 'white',
  showColourPanel: 'false',
  wheelAdjustsBrush: 'none',

  // clickToDrawShapes:'true'
  selectMode: 'overlap',
  selectTransparent: 'true',
  autoPickTool: 'false',
  autoPickToolText: 'false',
  // allowTextInShape: 'false',
  multilineText: 'true',

  pageView: 'true',
  defaultZoom: 'page', // page
  // defaultPaperSize: 'A4',
  outsidePageColour: '#F1FFF2',
  pageShadow: 'false',
  pageBorderColour: '#989898',

  maximumZoom: ZOOM.MAX,
  minimumZoom: ZOOM.MIN,

  defaultBrushWidth: 2,
  defaultLineWidth: 2,
  // defaultFillStyle: 'rgba(0,0,0,0.0)',

  // useSelectionHandles: 'false',

  // backgroundImage: 'background.jpg',

  // confine: 'page',
  // clickToDrawShapes: 'true',
});
