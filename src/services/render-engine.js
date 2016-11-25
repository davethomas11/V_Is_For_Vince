'use strict';

export default class RenderEngine {
  static render(context, canvas, entities) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < entities.length; i++) {
      entities[i].render(context);
    }
  }
}