'use strict';

import Game from '../engine/game';
import Vince from './models/vince';

export default class VinceGame extends Game {

  constructor(canvas) {
    super(canvas);

    // This allows us to have a full width game
    window.addEventListener('resize', this.resizeCanvas, false);

    function resizeCanvas() {

    }
  }

  start() {
    super.start();

    this.resizeCanvas();
    this.add(new Vince());
  }

  stop() {
    super.stop();

    this.removeAllGameObjects();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    //Every time window changes we need to redraw
    this.redraw();
  }
}

