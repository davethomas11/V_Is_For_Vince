import GameObject from '../../engine/models/game-object';
import VelocityModule from '../../engine/modules/velocity-module';
import Game from '../../engine/game'

export default class Laser extends GameObject {

  private velocityModule: VelocityModule;
  readonly LASER_LENGTH: number = 75;

  constructor(acceleration: number, angle: number, speed: number) {
    super();

    this.velocityModule = new VelocityModule();
    this.velocityModule.constantAccelerateAtAngleXY(acceleration, angle, speed);
    this.addModule(this.velocityModule);
  }

  render(ctx: CanvasRenderingContext2D): void {

    var direction = this.velocityModule.angle;
    var x2 = this.x + this.LASER_LENGTH * Math.cos(direction);
    var y2 = this.y + this.LASER_LENGTH * Math.sin(direction);

    ctx.beginPath();
    ctx.strokeStyle = "#F00";
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    
  }

  update(deltaMs: number) {
    super.update(deltaMs);

    if (this.x < 0 || this.y < 0 || 
        this.x > Game.Info.viewPortWidth || 
        this.y > Game.Info.viewPortHeight) {
      
      this.alive = false;
    }
  }
}