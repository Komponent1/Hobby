export class Vector {
  public x: number = 0;
  public y: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public normalize(): Vector {
    const length = this.length();
    return new Vector(this.x / length, this.y / length);
  }

  get length(): () => number {
    return () => Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
