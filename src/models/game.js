'use strict';

export default class Game {
  constructor(engine, context) {
    this.engine = engine;
    this.context = context;
    this.entities = [];
  }

  add(entity) {
    this.entities.push(entity);
  }

  redraw() {
    this.engine.render(this.context, this.entities);
  }

  update() {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update();
    }

    this.redraw();
  }
}