'use strict';

import NumberTools from '../util/number-tools';

export default class Vince {
  constructor(context) {
    this.context = context;

    this.x = 100;
    this.y = 100;
  }

  meander() {
    this.x += Math.round(Math.random() * 10) - 5;
    this.y += Math.round(Math.random() * 10) - 5;

    this.x = NumberTools.clamp(this.x, 60, window.innerWidth);
    this.y = NumberTools.clamp(this.y, 60, window.innerHeight);
  }

  render() {
    this.context.strokeStyle = "#000";
    this.context.lineWidth = 4;
    this.context.fillStyle = '#0F0';

    this.context.beginPath();
    this.context.arc(this.x, this.y, 50, 0, 2 * Math.PI);
    this.context.stroke();
    this.context.fill();
    this.context.closePath();
  }

  update() {
    this.meander();
  }
}