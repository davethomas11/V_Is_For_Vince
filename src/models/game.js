'use strict';

import RenderEngine from '../services/render-engine';

export default class Game {
  constructor(context, canvas) {
    this.context = context;
    this.canvas = canvas;
    this.entities = [];
  }

  add(entity) {
    this.entities.push(entity);
  }

  redraw() {
    RenderEngine.render(this.context, this.canvas, this.entities);
  }

  update() {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update();
    }

    this.redraw();
  }
}