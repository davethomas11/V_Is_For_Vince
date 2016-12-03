'use strict';

import GameObject from '../../engine/models/game-object';
import NumberTools from '../../engine/util/number-tools';
import LaserGunModule from '../modules/laser-module';
import VelocityModule from '../../engine/modules/velocity-module';
import { PhysicsModule, PhysicsConversions, BodyDefinitionFactory } from '../../engine/modules/physics-module';
import { BasicKeyboardMovementMapping, Keyset } from '../../engine/input-controllers/basic-keyboard-movement';
import KeyboardController from '../../engine/input-controllers/keyboard-input';
import PlayerConfig from './player-config';
import GameContext from '../../engine/models/game-context';
import HitPointModule from '../modules/hitpoint-module';

export default class Player extends GameObject implements BodyDefinitionFactory {
 
  readonly LASER_ACCEL = 5000;
  readonly LASER_SPEED = 750;
  readonly HP_MAX = 50;

  private velocityModule: VelocityModule;
  private hpModule: HitPointModule;

  private radius: number;
  private colorA: string;
  private colorB: string;
  readonly keyboardMapping: BasicKeyboardMovementMapping;

  constructor(config: PlayerConfig) {
    super();

    this.x = config.startX;
    this.y = config.startY;

    this.radius = config.radius;
    this.colorA = config.colorA;
    this.colorB = config.colorB;

    this.hpModule = new HitPointModule(this.HP_MAX);
    this.addModule(this.hpModule);
    this.addModule(new LaserGunModule(config.fireKey, this.LASER_ACCEL, this.LASER_SPEED));
    this.addModule(new PhysicsModule(this));
    this.velocityModule = new VelocityModule(config.speed, config.acceleration, config.deceleration);
    this.addModule(this.velocityModule);
    this.keyboardMapping = new BasicKeyboardMovementMapping(this.velocityModule, config.movementKeys);
  }

  attach(context: GameContext): void {
    super.attach(context);
    let keyboard = context.getInputController(KeyboardController);
    if (keyboard != undefined) {
      (keyboard as KeyboardController).attachKeyboardMapping(this.keyboardMapping);
    }
  }

  detach(context: GameContext): void {
    super.detach(context);
    let keyboard = context.getInputController(KeyboardController);
    if (keyboard != undefined) {
      (keyboard as KeyboardController).removeKeyboardMapping(this.keyboardMapping);
    }
  }

  render(ctx: CanvasRenderingContext2D) {
  
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.fillStyle = this.colorA;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    let x = this.x + 15 * Math.cos(this.velocityModule.angle);
    let y = this.y + 15 * Math.sin(this.velocityModule.angle);
    ctx.fillStyle = this.colorB;
    ctx.lineWidth = 2;
    ctx.arc(x, y, this.radius / 2, 0, 2 * Math.PI);

    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    let hpBarTop = this.y - this.radius - 20;
    let hpBarBottom = hpBarTop + 10;
    let hpWidth = this.radius * 2 * (this.hpModule.points / this.hpModule.maxPoints);
    ctx.fillRect(this.x - this.radius, hpBarTop, hpWidth, 10);
  }

  getBodyDefinition(): PhysicsType2d.Dynamics.BodyDefinition {
    let bodyDef = new PhysicsType2d.Dynamics.BodyDefinition();
    bodyDef.type = PhysicsType2d.Dynamics.BodyType.DYNAMIC;
    let x = PhysicsConversions.toMetres(this.x);
    let y = PhysicsConversions.toMetres(this.y);
    bodyDef.position = new PhysicsType2d.Vector2(x, y);
    bodyDef.linearDamping = 0.1;
    return bodyDef;
  }

  getFixtures(): Array<PhysicsType2d.Dynamics.FixtureDefinition> {
    let fd = new PhysicsType2d.Dynamics.FixtureDefinition();
    let shape = new PhysicsType2d.Collision.Shapes.CircleShape();
    let r = PhysicsConversions.toMetres(this.radius);
    shape.m_radius = r;
    fd.shape = shape;
    fd.density = 0.25;
    return [fd];
  }
}