import NumberTools from '../util/number-tools';
import GameObject from './game-object'

export default class FrameRate extends GameObject {
  frameRate: number;

  constructor() {
    super();

    this.x = 10;
    this.y = 20;
  }

  update(delta: number): void {
    super.update(delta);
    
    let unroundedFps = (delta > 0) ? 1000 / delta : 0;
    this.frameRate = NumberTools.round(unroundedFps, 2);
  }

  render(ctx: CanvasRenderingContext2D): void {
   
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)"
    ctx.font = "bold 12px Arial";
    ctx.fillText(`${this.frameRate} fps`, this.x, this.y);
  }
};