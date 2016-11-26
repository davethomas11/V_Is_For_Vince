import GameObject from './game-object'
export default class FrameRate extends GameObject {


  constructor() {
    super();
  }

  update(delta, info) {
    this.frameRate = Math.round((1000 / delta) * 100) / 100;
    this.x = info.bounds.width / 2;
    this.y = 40;
  }

  render(ctx) {
    ctx.fillStyle = "#000"
    ctx.font = "bold 16px Arial";
    ctx.fillText(`${this.frameRate} fps`, this.x, this.y);
  }
}