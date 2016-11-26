'use strict';

import NumberTools from '../../engine/util/number-tools';
import GameObject from '../../engine/models/game-object';

export default class Vince extends GameObject {
  constructor() {
    super();

    this.x = 100;
    this.y = 100;
  }

  meander(delta) {

    this.x += Math.round(Math.random() * 10) - 5;
    this.y += Math.round(Math.random() * 10) - 5;

    this.x = NumberTools.clamp(this.x, 60, window.innerWidth);
    this.y = NumberTools.clamp(this.y, 60, window.innerHeight);
  }

  render(context) {
    context.strokeStyle = "#000";
    context.lineWidth = 4;
    context.fillStyle = '#0F0';

    context.beginPath();
    context.arc(this.x, this.y, 50, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
    context.closePath();
  }

  update(delta, info) {
    this.meander(delta);
  }
}