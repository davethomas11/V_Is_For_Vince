import Module from '../../engine/modules/module'
import GameObject from '../../engine/models/game-object'
import VelocityModule from '../../engine/modules/velocity-module'
import BaseKeyboardMapping from '../../engine/input-controllers/keyboard-mapping'
import KeyboardController from '../../engine/input-controllers/keyboard-input'
import GameContext from '../../engine/models/game-context'
import Laser from '../models/laser'

export default class LaserGunModule extends Module {

  fireKey: string;
  acceleration: number;
  speed: number;
  keyMapping: BaseKeyboardMapping;

  constructor(fireKey: string, acceleration: number, speed: number) {
    super();
    this.fireKey = fireKey;
    this.acceleration = acceleration;
    this.speed = speed;
  }

  onAttach(parent: GameObject, context: GameContext): void {
    this.keyMapping = new BaseKeyboardMapping();
    this.keyMapping.registerOnDown(this.fireKey, () => this.fireLaser(parent));
    let controller = context.getInputController(KeyboardController) as KeyboardController
    if (controller != null) {
      controller.attachKeyboardMapping(this.keyMapping);
    }
  }

  onDetach(parent: GameObject, context: GameContext): void {
    let controller = context.getInputController(KeyboardController) as KeyboardController
    if (controller != null) {
      controller.removeKeyboardMapping(this.keyMapping);
    }
  }

  fireLaser(gameObject: GameObject): void {
    let module = gameObject.getModule(VelocityModule);
    if (module != null) {
      let velocityModule = module as VelocityModule;
      let laser = new Laser(this.acceleration, velocityModule.angle, this.speed);
      laser.x = gameObject.x;
      laser.y = gameObject.y;
      gameObject.spawn(laser);
    }
  }
}
