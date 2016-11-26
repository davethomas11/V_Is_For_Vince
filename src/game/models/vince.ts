'use strict';

import GameInfo from '../../engine/interfaces/game-info';
import GameObject from '../../engine/models/game-object';
import TimeService from '../../engine/services/time-service';
import NumberTools from '../../engine/util/number-tools';

export default class Vince extends GameObject {
  private readonly SPEED = 0.1;

  constructor() {
    super();

    this.x = 100;
    this.y = 100;
  }

  meander() {
    console.log(TimeService.delta);
    this.x += (Math.random() - 0.5) * this.SPEED * TimeService.delta;
    this.y += (Math.random() - 0.5) * this.SPEED * TimeService.delta;

    this.x = NumberTools.clamp(this.x, 60, window.innerWidth);
    this.y = NumberTools.clamp(this.y, 60, window.innerHeight);
  }

  render(ctx: CanvasRenderingContext2D | null) {
    if (ctx === null) throw new Error('Context is null');

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.fillStyle = '#0F0';

    ctx.beginPath();
    ctx.arc(this.x, this.y, 50, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  update(gameInfo: GameInfo) {
    this.meander();
  }
}