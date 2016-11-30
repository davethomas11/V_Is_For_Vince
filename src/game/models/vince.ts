'use strict';

import GameObject from '../../engine/models/game-object';
import NumberTools from '../../engine/util/number-tools';
import LaserGunModule from '../modules/laser-module';
import VelocityModule from '../../engine/modules/velocity-module';
import PhysicsType2d from '../../engine/vendor/physics/PhysicsType2d.v0_9';
import { PhysicsModule, BodyDefinitionFactory } from '../../engine/modules/physics-module'

export default class Vince extends GameObject implements BodyDefinitionFactory {
 
  private velocityModule: VelocityModule;

  constructor() {
    super();

    this.x = 100;
    this.y = 100;

    this.addModule(new LaserGunModule("Space", 5000, 750));
    this.addModule(new PhysicsModule(this));
  }

  render(ctx: CanvasRenderingContext2D) {
    
    if (this.velocityModule == undefined) 
    this.velocityModule = this.getModule(VelocityModule) as VelocityModule;
  
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.fillStyle = '#0F0';

    ctx.beginPath();
    ctx.arc(this.x, this.y, 50, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    let x = this.x + 15 * Math.cos(this.velocityModule.angle);
    let y = this.y + 15 * Math.sin(this.velocityModule.angle);
    ctx.fillStyle = "#30F"
    ctx.lineWidth = 2;
    ctx.arc(x, y, 20, 0, 2 * Math.PI);

    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  getBodyDefinition(): PhysicsType2d.Dynamics.BodyDefinition {
    let bodyDef = new PhysicsType2d.Dynamics.BodyDefinition();
    bodyDef.type = PhysicsType2d.Dynamics.BodyType.DYNAMIC;
    bodyDef.position = new PhysicsType2d.Vector2(this.x, this.y);
    return bodyDef;
  }

  getFixtures(): Array<PhysicsType2d.Dynamics.FixtureDefinition> {
    let fd = new PhysicsType2d.Dynamics.FixtureDefinition();
    let shape = new PhysicsType2d.Collision.Shapes.CircleShape();
    fd.shape = shape;
    fd.density = 1.0;
    fd.friction = 0.3;
    return [fd];
  }
}