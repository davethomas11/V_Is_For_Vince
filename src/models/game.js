'use strict';

import RenderEngine from '../services/render-engine';

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.entities = [];
  }

  add(entity) {
    this.entities.push(entity);
  }

  redraw() {
    RenderEngine.render(this.canvas, this.entities);
  }

  update() {
    this.entities.forEach(e => e.update());
    this.redraw();
  }
}