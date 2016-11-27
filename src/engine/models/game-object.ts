import Module from '../modules/module';
import Game from '../game';
import SpawnEvent from '../events/spawn-event';
import ArrayUtils from '../util/array-utils';

abstract class GameObject {
  alive: boolean = true;
  x: number = 0;
  y: number = 0;
  modules: Array<Module> = [];

  //TODO: placeholder for base GameObject
  constructor() {}

  abstract render(ctx: CanvasRenderingContext2D): void;

  update(deltaMs: number): void {
    this.modules.forEach((module) => {
      module.update(this, deltaMs);
    });
  }

  addModule(module: Module): void {
    this.modules.push(module);
    module.onAttach(this);
  }

  removeModule(module: Module): void {
    ArrayUtils.remove(module, this.modules);
  }

  spawn(gameObject: GameObject): void {
    Game.EventBus.post(new SpawnEvent(gameObject));
  }

  getModule (type: any): Module | null {
    return ArrayUtils.getByType(type, this.modules);
  }
}

export default GameObject;