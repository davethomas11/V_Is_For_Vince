import KeyboardMapping from './keyboard-mapping'
import VelocityModule from '../modules/velocity-module'

export class BasicKeyboardMovementMapping extends KeyboardMapping {
  velocityModule: VelocityModule;

  constructor(velocityModule: VelocityModule, keys: Keyset) {
    super();

    this.velocityModule = velocityModule;

    super.registerOnDown(keys.left, () => this.velocityModule.accelerateLeft());
    super.registerOnDown(keys.right, () => this.velocityModule.accelerateRight());
    super.registerOnDown(keys.up, () => this.velocityModule.accelerateUp());
    super.registerOnDown(keys.down, () => this.velocityModule.accelerateDown());

    super.registerOnUp(keys.left, () => this.velocityModule.decelerateLeft());
    super.registerOnUp(keys.right, () => this.velocityModule.decelerateRight());
    super.registerOnUp(keys.up, () => this.velocityModule.decelerateUp());
    super.registerOnUp(keys.down, () => this.velocityModule.decelerateDown());
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
