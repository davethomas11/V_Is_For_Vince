import Module from '../../engine/modules/module'
import GameObject from '../../engine/models/game-object'
import VelocityModule from '../../engine/modules/velocity-module'
import BaseKeyboardMapping from '../../engine/input-controllers/keyboard-mapping'
import KeyboardController from '../../engine/input-controllers/keyboard-input'
import Game from '../../engine/game'
import Laser from '../models/laser'

export default class LaserGunModule extends Module {

  fireKey: string;
  acceleration: number;
  speed: number;

  constructor(fireKey: string, acceleration: number, speed: number) {
    super();

    this.fireKey = fireKey;
    this.acceleration = acceleration;
    this.speed = speed;
  }

  onAttach(parent: GameObject): void {
    
    var laserMapping = new BaseKeyboardMapping();
    laserMapping.registerOnDown(this.fireKey, () => this.fireLaser(parent));
    var controller = Game.getInputController(KeyboardController)

    if (controller != null) {
      (controller as KeyboardController).attachKeyboardMapping(laserMapping);
    }
  }

  fireLaser(gameObject: GameObject): void {

    var module = gameObject.getModule(VelocityModule);
    if (module != null) {

      var velocityModule = module as VelocityModule;
      var laser = new Laser(this.acceleration, velocityModule.angle, this.speed);
      laser.x = gameObject.x;
      laser.y = gameObject.y;
      gameObject.spawn(laser);
    }
  }
}
