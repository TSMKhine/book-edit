import { PathCommands } from './PathCommands';

const ArrowPath = (path: PathCommands) => {
  const x = -10,
    y = 0,
    h = 30,
    s = 20,
    w = 40;

  path.moveTo(x - w, y);
  path.lineTo(x - w, y + s);
  path.lineTo(x, y + s);
  path.lineTo(x, y + s + h);
  path.lineTo(x + w + s, y);
  path.lineTo(x, y - s - h);
  path.lineTo(x, y - s);
  path.lineTo(x - w, y - s);
  path.lineTo(x - w, y);
  path.close();

  return path.toArray();
};

export default ArrowPath;
