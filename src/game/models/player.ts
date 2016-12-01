'use strict';

import GameObject from '../../engine/models/game-object';
import NumberTools from '../../engine/util/number-tools';
import LaserGunModule from '../modules/laser-module';
import VelocityModule from '../../engine/modules/velocity-module';
import { PhysicsModule, BodyDefinitionFactory } from '../../engine/modules/physics-module';
import { BasicKeyboardMovementMapping, Keyset } from '../../engine/input-controllers/basic-keyboard-movement';
import KeyboardController from '../../engine/input-controllers/keyboard-input';
import PlayerConfig from './player-config';
import GameContext from '../../engine/models/game-context';

export default class Player extends GameObject implements BodyDefinitionFactory {
 
  private velocityModule: VelocityModule;
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

    this.addModule(new LaserGunModule(config.fireKey, 5000, 750));
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
    shape.m_radius = this.radius;
    shape.m_p = new PhysicsType2d.Vector2(this.x + this.radius, this. y + this.radius);
    fd.shape = shape;
    fd.density = 1.0;
    fd.friction = 0.3;
    return [fd];
  }
}