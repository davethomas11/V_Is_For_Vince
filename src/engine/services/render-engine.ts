'use strict';

import GameObject from '../models/game-object';
import Game from '../game'

export default class RenderEngine {
  static render(context: CanvasRenderingContext2D, gameObjects: Array<GameObject>): void {

    context.clearRect(0, 0, Game.Info.viewPortWidth, Game.Info.viewPortHeight);
    gameObjects.forEach(e => e.render(context));
  }
}