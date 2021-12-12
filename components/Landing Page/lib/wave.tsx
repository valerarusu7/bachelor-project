class Wave {
  private waveLength: number[];
  private color: string;

  constructor(waveLength: number[], color: string) {
    this.waveLength = waveLength;
    this.color = color;
  }

  public draw = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    frequency: number
  ): void => {
    context.beginPath();
    context.moveTo(0, height);
    if (this.waveLength.length < 3) {
      return;
    }
    for (var i = 0; i < width; i++) {
      var wave1 = Math.sin(i * this.waveLength[0] - frequency);
      var wave2 = Math.sin(i * this.waveLength[1] - frequency);
      var wave3 = Math.sin(i * this.waveLength[2] - frequency);
      context.lineTo(i * 3.5, 50 + wave1 * wave2 * wave3 * 75);
    }

    context.lineTo(width, height);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  };
}

export default Wave;
