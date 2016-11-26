'use strict';

import GameObject from '../models/game-object';

export default class RenderEngine {
  static render(canvas: HTMLCanvasElement, gameObjects: Array<GameObject>): void {
    let context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get the context from the canvas');

    context.clearRect(0, 0, canvas.width, canvas.height);

    gameObjects.forEach(e => e.render(context));
  }
}