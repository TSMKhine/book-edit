export class PathCommands {
  private commands: number[] = [];

  constructor(commands?: number[]) {
    if (commands !== undefined) {
      this.commands = commands;
    }
  }

  moveTo(x: number, y: number): void {
    this.commands.push(0, x, y);
  }

  lineTo(x: number, y: number): void {
    this.commands.push(1, x, y);
  }

  cornerTo(cx: number, cy: number, x: number, y: number): void {
    this.commands.push(6, x, y, cx, cy);
  }

  arc(
    endingX: number,
    endingY: number,
    centreX: number,
    centreY: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    counterClockwise: boolean = true
  ) {
    this.commands.push(
      9,
      endingX,
      endingY,
      centreX,
      centreY,
      radius,
      startAngle,
      endAngle
    );
    this.commands.push(counterClockwise ? 1 : 0);
  }

  close(): void {
    this.commands.push(7);
  }

  toArray(): number[] {
    return this.commands;
  }
}
