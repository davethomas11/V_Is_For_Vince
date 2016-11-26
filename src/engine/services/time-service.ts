export default class TimeService {
  static currentFrame: number | undefined;

  private static _delta: number = 0;

  static get delta(): number {
    return this._delta;
  }

  static set delta(newDelta: number) {
    // don't accept negative numbers
    this._delta = Math.max(newDelta, this._delta);
  }
};