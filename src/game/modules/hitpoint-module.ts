import PointModule from '../../engine/modules/point-module'
import GameObject from '../../engine/models/game-object'

// Simple HP handling
export default class HitPointModule extends PointModule {

  constructor(hp: number) {
    super();
    this._maxPoints = this._points = hp;
    this.onExhausted(() => { 
      if (this.parent) {
        this.parent.alive = false;
      }
    });
  }
}