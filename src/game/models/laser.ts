import GameObject from '../../engine/models/game-object';
import VelocityModule from '../../engine/modules/velocity-module';
import Rect from '../../engine/geometry/rect';
import Point from '../../engine/geometry/point';
import NumberTools from '../../engine/util/number-tools';

export default class Laser extends GameObject {

  readonly LASER_LENGTH: number = 120;
  readonly AMPLITUDE_OF_SINE: number = 17;
  readonly FREQUENCY_AMT: number = 90/180*Math.PI / 5;

  private velocityModule: VelocityModule;
  private rect: Rect = new Rect(0,0,0,0);
  private point: Point = new Point(0,0);

  constructor(acceleration: number, angle: number, speed: number) {
    super();

    this.velocityModule = new VelocityModule();
    this.velocityModule.constantAccelerateAtAngleXY(acceleration, angle, speed);
    this.addModule(this.velocityModule);
  }

  render(ctx: CanvasRenderingContext2D): void {

    ctx.save();
    
    this.sineWave(ctx);
    ctx.stroke();
    
    ctx.restore(); 
  }

  sineWave(ctx: CanvasRenderingContext2D): void {

    ctx.translate(this.x, this.y);
    ctx.rotate(this.velocityModule.angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.LASER_LENGTH, 0);
    ctx.strokeStyle = "#f442a4";
    ctx.stroke();
    ctx.closePath(); 

    ctx.beginPath();
    ctx.strokeStyle = "#F00";
    let frequency = 0;

    for (let x = 0; x < this.LASER_LENGTH; x++) {

      let y = Math.sin(frequency) * this.AMPLITUDE_OF_SINE;
      ctx.lineTo(x, y);
      frequency += this.FREQUENCY_AMT;  
    }
  }

  update(deltaMs: number) {
    super.update(deltaMs);

    this.point.x = this.x;
    this.point.y = this.y;

    this.rect.width = this.context!.getViewPortWidth();
    this.rect.height = this.context!.getViewPortHeight();

    this.alive = NumberTools.rectContainsPoint(this.rect, this.point);
  }
}