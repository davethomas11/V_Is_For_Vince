import GameObject from '../../engine/models/game-object';
import VelocityModule from '../../engine/modules/velocity-module';
import Rect from '../../engine/geometry/rect';
import Point from '../../engine/geometry/point';
import NumberTools from '../../engine/util/number-tools';
import { PhysicsModule, PhysicsConversions, BodyDefinitionFactory } from '../../engine/modules/physics-module';
import HitPointModule from '../modules/hitpoint-module';

export default class Laser extends GameObject implements BodyDefinitionFactory {

  readonly LASER_LENGTH: number = 120;
  readonly AMPLITUDE_OF_SINE: number = 17;
  readonly FREQUENCY_AMT: number = 90/180*Math.PI / 5;
  readonly LASER_DMG: number = 5;

  private velocityModule: VelocityModule;
  private rect: Rect = new Rect(0,0,0,0);
  private point: Point = new Point(0,0);

  constructor(acceleration: number, angle: number, speed: number, x: number, y: number) {
    super();

    this.x = x;
    this.y = y;
    this.velocityModule = new VelocityModule();
    this.velocityModule.constantAccelerateAtAngleXY(acceleration, angle, speed);
    this.addModule(this.velocityModule);
    this.addModule(new PhysicsModule(this));
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

  getBodyDefinition(): PhysicsType2d.Dynamics.BodyDefinition {
    let bodyDef = new PhysicsType2d.Dynamics.BodyDefinition();
    bodyDef.type = PhysicsType2d.Dynamics.BodyType.DYNAMIC;
    let x = PhysicsConversions.toMetres(this.x);
    let y = PhysicsConversions.toMetres(this.y);
    bodyDef.position = new PhysicsType2d.Vector2(x, y);
    bodyDef.bullet = true;
    return bodyDef;
  }

  getFixtures(): Array<PhysicsType2d.Dynamics.FixtureDefinition> {
    let fd = new PhysicsType2d.Dynamics.FixtureDefinition();
    let shape = new PhysicsType2d.Collision.Shapes.EdgeShape;
    let point1 = new PhysicsType2d.Vector2(0, 0);
    let x2 = PhysicsConversions.toMetres(Math.cos(this.velocityModule.angle) * this.LASER_LENGTH);
    let y2 = PhysicsConversions.toMetres(Math.sin(this.velocityModule.angle) * this.LASER_LENGTH);
    let point2 = new PhysicsType2d.Vector2(x2, y2);
    shape.Set(point1, point2);
    fd.isSensor = true;
    fd.shape = shape;
    fd.density = 0.25;
    return [fd];
  }

  onContact(other: GameObject): void {
     if (other == this.spawner) return;

    this.alive = false;
    let hpModule = other.getModule(HitPointModule) as HitPointModule;
    if (hpModule != undefined) {
      hpModule.reduce(this.LASER_DMG);
    }
  }
  
}