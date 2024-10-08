import { PathCommands } from './PathCommands';

const TrianglePath = (path: PathCommands) => {
  const x = 0,
    y = 0,
    height = 50;

  path.moveTo(x, y - height);
  path.lineTo(x + height, y + height);
  path.lineTo(x - height, y + height);
  path.lineTo(x, y - height);
  path.close();

  return path.toArray();
};

export default TrianglePath;
