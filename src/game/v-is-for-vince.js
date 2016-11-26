'use strict';

import Game from '../engine/game';
import Vince from './models/vince';

export default class VinceGame extends Game {

  constructor(canvas) {
    super(canvas);

    var e = this;
    // This allows us to have a full width game
    window.addEventListener('resize', function () {
      e.setBounds(window.innerWidth, window.innerHeight);
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

