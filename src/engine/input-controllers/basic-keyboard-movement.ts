import KeyboardMapping from './keyboard-mapping'
import VelocityModule from '../modules/velocity-module'

export class BasicKeyboardMovementMapping extends KeyboardMapping {
  velocityModule: VelocityModule;

  constructor(velocityModule: VelocityModule, keys: Keyset) {
    super();

    this.velocityModule = velocityModule;

    this.registerOnDown(keys.left, () => this.velocityModule.accelerateLeft());
    this.registerOnDown(keys.right, () => this.velocityModule.accelerateRight());
    this.registerOnDown(keys.up, () => this.velocityModule.accelerateUp());
    this.registerOnDown(keys.down, () => this.velocityModule.accelerateDown());

    this.registerOnUp(keys.left, () => this.velocityModule.decelerateLeft());
    this.registerOnUp(keys.right, () => this.velocityModule.decelerateRight());
    this.registerOnUp(keys.up, () => this.velocityModule.decelerateUp());
    this.registerOnUp(keys.down, () => this.velocityModule.decelerateDown());
  }
}

export class Keyset {
  up: string
  down: string
  left: string
  right: string

  constructor(left: string, up:string, right: string, down: string) {
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
  }
}
