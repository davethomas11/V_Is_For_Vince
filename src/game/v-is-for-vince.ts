'use strict';

import Game from '../engine/game';
import Vince from './models/vince';

export default class VinceGame extends Game {

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    let e = this;
    // This allows us to have a full width game
    window.addEventListener('resize', () => {
      this.setBounds(window.innerWidth, window.innerHeight);
    }, false);
  }

  start() {
    super.start();

    this.showFrameRate(true);
    this.setBounds(window.innerWidth, window.innerHeight);
    this.add(new Vince());
  }

  stop() {
    super.stop();

    this.removeAllGameObjects();
  }
}
