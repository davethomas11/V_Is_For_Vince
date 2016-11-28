import GameObject from '../../engine/models/game-object';
import VelocityModule from '../../engine/modules/velocity-module';
import Rect from '../../engine/geometry/rect';
import Point from '../../engine/geometry/point';
import NumberTools from '../../engine/util/number-tools';

export default class Laser extends GameObject {

  private velocityModule: VelocityModule;
  readonly LASER_LENGTH: number = 75;
  private rect: Rect = new Rect(0,0,0,0);
  private point: Point = new Point(0,0);

  constructor(acceleration: number, angle: number, speed: number) {
    super();

    this.velocityModule = new VelocityModule();
    this.velocityModule.constantAccelerateAtAngleXY(acceleration, angle, speed);
    this.addModule(this.velocityModule);
  }

  render(ctx: CanvasRenderingContext2D): void {

    let direction = this.velocityModule.angle;
    let x2 = this.x + this.LASER_LENGTH * Math.cos(direction);
    let y2 = this.y + this.LASER_LENGTH * Math.sin(direction);

    ctx.beginPath();
    ctx.strokeStyle = "#F00";
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();  
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