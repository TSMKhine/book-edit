import { IPoint } from '../zwibbler-def';
import { PathCommands } from './PathCommands';

const ArcPath = (
  centreX: number,
  centreY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  counterClockwise: boolean = true
) => {
  const path = new PathCommands();
  const { x: startX, y: startY } = pointAtAngleDistance(
    { x: centreX, y: centreY },
    startAngle,
    radius
  );
  const { x: endX, y: endY } = pointAtAngleDistance(
    { x: centreX, y: centreY },
    endAngle,
    radius
  );

  path.moveTo(startX, startY);
  path.arc(
    endX,
    endY,
    centreX,
    centreY,
    radius,
    startAngle,
    endAngle,
    counterClockwise
  );
  // path.close();

  return path.toArray();
};

const pointAtAngleDistance = (
  center: IPoint,
  angle: number,
  distance: number
) => {
  // between 0~2pi
  const normalizedAngle =
    ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

  const adjustedAngle = 2 * Math.PI - normalizedAngle;

  return {
    x: center.x + distance * Math.cos(adjustedAngle),
    y: center.y - distance * Math.sin(adjustedAngle),
  };
};

export default ArcPath;
