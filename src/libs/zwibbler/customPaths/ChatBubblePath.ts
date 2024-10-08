import { PathCommands } from './PathCommands';

const ChatBubblePath = (path: PathCommands) => {
  const x = 0,
    y = 0,
    w = 100,
    h = 100;

  path.moveTo(x - w / 2, y - h / 2);
  path.lineTo(x + w / 2, y - h / 2);
  path.lineTo(x + w / 2, y + h / 5);
  path.lineTo(x + w / 5, y + h / 5);
  path.lineTo(x, y + h / 2);
  path.lineTo(x - w / 5, y + h / 5);
  path.lineTo(x - w / 2, y + h / 5);
  path.lineTo(x - w / 2, y - h / 2);

  path.close();

  return path.toArray();
};

export default ChatBubblePath;
