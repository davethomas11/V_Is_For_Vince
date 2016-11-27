'use strict';

import GameObject from '../../engine/models/game-object';
import NumberTools from '../../engine/util/number-tools';
import LaserGunModule from '../modules/laser-module';
import VelocityModule from '../../engine/modules/velocity-module';

export default class Vince extends GameObject {
 
  constructor() {
    super();

    this.x = 100;
    this.y = 100;

    this.addModule(new LaserGunModule("Space", 5000, 750));
  }

  render(ctx: CanvasRenderingContext2D) {
    
    var velocityModule = this.getModule(VelocityModule) as VelocityModule;
    

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.fillStyle = '#0F0';

    ctx.beginPath();
    ctx.arc(this.x, this.y, 50, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    var x = this.x + 15 * Math.cos(velocityModule.angle);
    var y = this.y + 15 * Math.sin(velocityModule.angle);
    ctx.fillStyle = "#30F"
    ctx.lineWidth = 2;
    ctx.arc(x, y, 20, 0, 2 * Math.PI);

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