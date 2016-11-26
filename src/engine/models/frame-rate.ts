import GameInfo from '../interfaces/game-info';
import TimeService from '../services/time-service';
import NumberTools from '../util/number-tools';
import GameObject from './game-object'

export default class FrameRate extends GameObject {
  frameRate: number;

  constructor() {
    super();

    this.x = 10;
    this.y = 20;
  }

  update(gameInfo: GameInfo): void {
    let unroundedFps = (TimeService.delta > 0) ? 1000 / TimeService.delta : 0;
    this.frameRate = NumberTools.round(unroundedFps, 2);
  }

  render(ctx: CanvasRenderingContext2D | null): void {
    if (ctx === null) throw new Error('Context is null');

    ctx.fillStyle = "rgba(0, 0, 0, 0.6)"
    ctx.font = "bold 12px Arial";
    ctx.fillText(`${this.frameRate} fps`, this.x, this.y);
  }
};