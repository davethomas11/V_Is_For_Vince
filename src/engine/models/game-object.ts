import Module from '../modules/module';
import Game from '../game';
import SpawnEvent from '../events/spawn-event';
import ArrayUtils from '../util/array-utils';
import GameContext from './game-context';
import EventBus from '../services/event-system'

abstract class GameObject {
  alive: boolean = true;
  x: number = 0;
  y: number = 0;
  context: GameContext | undefined;
  spawner: GameObject | undefined;

  private modules: Array<Module> = [];

  //TODO: placeholder for base GameObject
  constructor() {}

  abstract render(ctx: CanvasRenderingContext2D): void;

  update(deltaMs: number): void {
    this.modules.forEach((module) => {
      module.update(this, deltaMs);
    });
  }

  addModule(module: Module): void {
    module.parent = this;
    this.modules.push(module);
  }

  removeModule(module: Module): void {
    module.parent = undefined;
    ArrayUtils.remove(module, this.modules);
  }

  spawn(gameObject: GameObject): void {
    if (this.context) {
      gameObject.spawner = this;
      EventBus.post(this.context, new SpawnEvent(gameObject));
    }
  }

  getModule (type: any): Module | undefined {
    return ArrayUtils.getByType(type, this.modules);
  }

  detach(context: GameContext): void {
    this.context = undefined;
    this.spawner = undefined;
    this.modules.forEach(m => m.onDetach(this, context));
  }

  attach(context: GameContext): void {
    this.context = context;
    this.modules.forEach(m => m.onAttach(this, context));
  }
  
  onContact(other: GameObject): void {
  }
}

export default GameObject;