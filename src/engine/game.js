'use strict';

import RenderEngine from './services/render-engine';

export default class Game {

  running

  constructor(canvas) {
    this.canvas = canvas;
    this.gameObjects = [];
    this.running = false;
    this.sleep = function (ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }

  start() {

    this.running = true;
    this.update();
  }

  stop() {

    this.running = false;
  }

  add(gameObject) {
    this.gameObjects.push(gameObject);
  }

  removeAllGameObjects() {
    this.gameObjects = [];
  }

  redraw() {
    RenderEngine.render(this.canvas, this.gameObjects);
  }

  update() {
    this.gameObjects.forEach(e => e.update());
    this.redraw();

    if (this.running) {
      this.sleep(50).then(() => this.update());
    }
  }


}