import Module from '../interfaces/module'
import GameObject from '../models/game-object'
import NumberTools from '../util/number-tools'

export default class VelocityModule implements Module {

  private velocityX: VelocityDimension = new VelocityDimension();
  private velocityY: VelocityDimension = new VelocityDimension();

  maxVelocity: number;
  acceleration: number;
  deceleration: number;

  constructor(maxVelocity: number, acceleration: number, deceleration: number) {
    this.maxVelocity = maxVelocity;
    this.acceleration = acceleration;
    this.deceleration = deceleration;
  }

  update(gameObject:GameObject, deltaInMs: number): void {

    var deltaInSeconds = deltaInMs / 1000;
    this.velocityX.update(deltaInSeconds, this.maxVelocity);
    this.velocityY.update(deltaInSeconds, this.maxVelocity);


    gameObject.x += deltaInSeconds * this.velocityX.velocity;
    gameObject.y += deltaInSeconds * this.velocityY.velocity;
  }

  accelerateRight(): void {
    this.accelerationX = this.acceleration;
  }

  accelerateLeft(): void {
    this.accelerationX = -this.acceleration;
  }

  accelerateUp(): void {
    this.accelerationY = -this.acceleration;
  }

  accelerateDown(): void {
    this.accelerationY = this.acceleration;
  }

  decelerateRight(): void {
    this.decelerationX = -this.deceleration;
  }

  decelerateLeft(): void {
    this.decelerationX = this.deceleration;
  }

  decelerateUp(): void {
    this.decelerationY = this.deceleration;
  }

  decelerateDown(): void {
    this.decelerationY = -this.deceleration;
  }

  set accelerationX(pixelsPerSecond: number) {
    this.velocityX.acceleration = pixelsPerSecond;
  }

  set accelerationY(pixelsPerSecond: number) {
    this.velocityY.acceleration = pixelsPerSecond;
  }

  set decelerationX(pixelsPerSecond: number) {
    this.velocityX.deceleration = pixelsPerSecond;
  }

  set decelerationY(pixelsPerSecond: number) {
    this.velocityY.deceleration = pixelsPerSecond;
  }
}

class VelocityDimension {

  private _velocity: number = 0;
  private _acceleration: number = 0;
  private _accelerating: boolean = false;

  set acceleration(pixelsPerSecond: number) {
    this._accelerating = pixelsPerSecond === 0 ? false : true;
    this._acceleration = pixelsPerSecond;
  }

  set deceleration(pixelsPerSecond: number) {
    if ((this._acceleration > 0 && pixelsPerSecond < 0) ||
        (this._acceleration < 0 && pixelsPerSecond > 0)) {     
      this._accelerating = false;
      this._acceleration = pixelsPerSecond;
    }
  }

  get velocity() {
    return this._velocity;
  }

  // TODO: Fix floatyness of switching directions
  // Need to be able to go in oposite direction faster
  // By apply force in other direction.

  // TODO: Bug sometimes player maintains velocity after
  // releasing the key. Deceleration does not happen.
  update(deltaInSeconds: number, maxVelocity: number): void {
    if (this._acceleration == 0) {
      this._velocity = 0;
      return;
    }

    var accelerationChange = deltaInSeconds * this._acceleration;
    var maxVel = maxVelocity;
    var minVel = -maxVelocity;

    if (!this._accelerating) {
      if (this._velocity > 0) {
        minVel = 0;
      } else if (this._velocity < 0) {
        maxVel = 0;
      }
    }

    this._velocity += accelerationChange;
    this._velocity = NumberTools.clamp(this._velocity, minVel, maxVel);

    if (this._velocity == 0) {
      this._acceleration = 0;
      this._accelerating = false;
    }
  }
}