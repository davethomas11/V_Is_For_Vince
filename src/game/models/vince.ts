'use strict';

import GameObject from '../../engine/models/game-object';
import NumberTools from '../../engine/util/number-tools';

export default class Vince extends GameObject {
 
  constructor() {
    super();

    this.x = 100;
    this.y = 100;
  }

  render(ctx: CanvasRenderingContext2D) {
    
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.fillStyle = '#0F0';

    ctx.beginPath();
    ctx.arc(this.x, this.y, 50, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  update(delta: number) {
    super.update(delta);

    this.x = NumberTools.clamp(this.x, 50, window.innerWidth - 50);
    this.y = NumberTools.clamp(this.y, 50, window.innerHeight - 50);
  }
}