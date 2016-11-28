'use strict';

import GameObject from '../models/game-object';
import GameContext from '../models/game-context';


export default class RenderEngine {
  static render(context: CanvasRenderingContext2D, 
                gameObjects: Array<GameObject>,
                gameContext: GameContext): void {

    context.clearRect(0, 0, gameContext.getViewPortWidth(), 
                            gameContext.getViewPortHeight());
    gameObjects.forEach(e => e.render(context));
  }
}