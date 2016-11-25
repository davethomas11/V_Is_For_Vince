'use strict';

export default class RenderEngine {
  static render(canvas, entities) {
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    entities.forEach(e => e.render(context));
  }
}