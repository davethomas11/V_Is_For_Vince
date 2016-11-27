import ArrayUtils from '../util/array-utils'
import Module from '../interfaces/module'

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
  }

  removeModule(module: Module): void {
    ArrayUtils.remove(module, this.modules);
  }
}

export default GameObject;