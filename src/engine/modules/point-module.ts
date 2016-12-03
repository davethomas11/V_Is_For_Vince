import Module from './module'

// System for tracking hit points, magic points or other types of game character points
export default class PointModule extends Module {

  private refilledCallback: Function;
  private exhaustedCallback: Function;
  private reducedCallback: Function;
  private increasedMaxCallback: Function;
  
  protected _points: number;
  protected _maxPoints: number;

  /**
   * Register a callback to be called
   * when the point module is empty
   * 
   * @param {Function} cb
   * 
   * @memberOf PointModule
   */
  onExhausted(cb: Function): void {
    this.exhaustedCallback = cb;
  }

  /**
   * Register a callback to be called
   * when the point module is reduced by any amount
   * 
   * @param {Function} cb
   * 
   * @memberOf PointModule
   */
  onReduced(cb: Function): void {
    this.reducedCallback = cb;
  }

  /**
   * Register a callback to be called
   * when the point module has it's max increased
   * 
   * @param {Function} cb
   * 
   * @memberOf PointModule
   */
  onMaxIncreased(cb: Function): void {
    this.increasedMaxCallback = cb;
  }

  /**
   * Register a callback to be called
   * when the point module is refilled by any amount
   * 
   * @param {Function} cb
   * 
   * @memberOf PointModule
   */
  onRefilled(cb: Function): void {
    this.refilledCallback = cb;
  }

  /**
   * Inscrease the point module max ammount
   * 
   * @param {number} by - this amount
   * @param {boolean} refill - whether to refill points as well
   * 
   * @memberOf PointModule
   */
  increaseMax(by: number, refill: boolean): void {
    this._maxPoints += by;
    if (refill) {
      this.refill(this._maxPoints - this._points);
    }

    if (this.increasedMaxCallback) this.increasedMaxCallback();
  }

  /**
   * Refill the points towards max
   * 
   * @param {number} by - this amount
   * 
   * @memberOf PointModule
   */
  refill(by: number): void {
    this._points += by;

    if (this._points >= this._maxPoints) {
      this._points = this._maxPoints;
    }

    if (this.refilledCallback) this.refilledCallback();
  }

  /**
   * Reduce the points towards zero
   * 
   * @param {number} by - this amount
   * 
   * @memberOf PointModule
   */
  reduce(by: number): void {
    this._points -= by;
    if (this._points <= 0) {
      this._points = 0;
      if (this.exhaustedCallback) this.exhaustedCallback();
    }

    if (this.reducedCallback) this.reducedCallback();
  }

  get points() {
    return this._points;
  }

  get maxPoints() {
    return this._maxPoints;
  }
}