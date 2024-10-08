import { WRITING_MODE } from '@/constants/canvas';
import { PathCommands } from './PathCommands';

const StickyPath = (path: PathCommands, writingMode: string) => {
  const x = 0,
    y = 0;
  let w, h;
  if (writingMode === WRITING_MODE.VERTICAL) {
    w = 70;
    h = 200;
  } else {
    w = 200;
    h = 70;
  }

  path.moveTo(x - w / 2, y - h / 2);
  path.lineTo(x + w / 2, y - h / 2);
  path.lineTo(x + w / 2, y + h / 2);
  path.lineTo(x - w / 2, y + h / 2);
  path.lineTo(x - w / 2, y - h / 2);
  path.close();

  return path.toArray();
};

export default StickyPath;
