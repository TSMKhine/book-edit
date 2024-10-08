import { PathCommands } from './PathCommands';

const CirclePath = (path: PathCommands) => {
  const x = 0,
    y = 0,
    radius = 50;

  path.moveTo(x, y - radius);
  path.cornerTo(x + radius, y - radius, x + radius, y);
  path.cornerTo(x + radius, y + radius, x, y + radius);
  path.cornerTo(x - radius, y + radius, x - radius, y);
  path.cornerTo(x - radius, y - radius, x, y - radius);
  path.close();

  return path.toArray();
};

export default CirclePath;
