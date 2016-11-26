'use strict';

import RenderEngine from './services/render-engine';
import FrameRate from './models/frame-rate'

export default class Game {

  constructor(canvas) {
    this.canvas = canvas;
    this.gameObjects = [];
    this.running = false;
    this.gameInfo = {
      bounds : {
        height: canvas.height,
        width: canvas.width
      }
    };
  }

  start() {

    this.running = true;
    this.update();
  }

  showFrameRate(isFrameRateVisible) {
    if (isFrameRateVisible) {
      this.frameRateObject = new FrameRate();
      this.add(this.frameRateObject);
    } else if (this.frameRateObject != null) {
      this.frameRateObject.alive = false;
    }
  }

  setBounds(width, height) {

    this.gameInfo.bounds.width = width;
    this.gameInfo.bounds.height = height;

    this.canvas.width = width;
    this.canvas.height = height;

    this.redraw();
  }

  stop() {

    this.running = false;
    this.lastTime = null;
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

  update(timestamp) {

    var delta;
    if (this.lastTime == null) {
      delta = 0;
    } else {
      delta = timestamp - this.lastTime;
    }

    this.gameObjects.forEach(e => e.update(delta, this.gameInfo));
    this.redraw();
    this.lastTime = timestamp;

    if (this.running) {
      window.requestAnimationFrame((t) => this.update(t));
    }
  }
}