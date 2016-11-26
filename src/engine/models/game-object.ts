import GameInfo from '../interfaces/game-info';

abstract class GameObject {
  alive: boolean = true;
  x: number = 0;
  y: number = 0;

  //TODO: placeholder for base GameObject
  constructor() {}

  abstract render(ctx: CanvasRenderingContext2D | null): void;

  abstract update(gameInfo: GameInfo): void;
}

export default GameObject;