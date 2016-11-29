'use strict';

import GameObject from '../../engine/models/game-object';
import NumberTools from '../../engine/util/number-tools';

// TODO: Base class common code in Jerry and Vince
export default class Bart extends GameObject {
  
  constructor() {
    super();

    this.x = 500;
    this.y = 70;
  }

  render(ctx: CanvasRenderingContext2D) {
    
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.fillStyle = '#34F';

    ctx.beginPath();
    ctx.arc(this.x, this.y, 24, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  update(delta: number) {
    super.update(delta);

    this.x = NumberTools.clamp(this.x, 50, window.innerWidth - 24);
    this.y = NumberTools.clamp(this.y, 50, window.innerHeight - 24);
  }
}