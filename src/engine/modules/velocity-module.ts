import Module from './module'
import GameObject from '../models/game-object'
import NumberTools from '../util/number-tools'
import { PhysicsModule, PhysicsConversions } from './physics-module'

export default class VelocityModule extends Module {

  readonly ANGLE_OFFSET = -1.5708 // negative 90 degeress

  private velocityX: VelocityDimension = new VelocityDimension();
  private velocityY: VelocityDimension = new VelocityDimension();

  private maxVelocityX: number;
  private maxVelocityY: number;
  private acceleration: number;
  private deceleration: number;
  private _angle: number = 0;
  private vector: PhysicsType2d.Vector2 = new PhysicsType2d.Vector2(0,0);

  constructor(maxVelocity: number = 0, acceleration: number = 0, deceleration: number = 0) {
    super();
    this.maxVelocityX = maxVelocity;
    this.maxVelocityY = maxVelocity;
    this.acceleration = acceleration;
    this.deceleration = deceleration;
  }

  update(gameObject: GameObject, deltaInMs: number): void {

    let deltaInSeconds = deltaInMs / 1000;
    this.velocityX.update(deltaInSeconds, this.maxVelocityX);
    this.velocityY.update(deltaInSeconds, this.maxVelocityY);

    let physicsModule = gameObject.getModule(PhysicsModule);
    if (physicsModule != undefined) {
      this.vector.x = PhysicsConversions.toMetres(this.velocityX.velocity);
      this.vector.y = PhysicsConversions.toMetres(this.velocityY.velocity);
      (physicsModule as PhysicsModule).setVelocity(this.vector);
    } else {
      gameObject.x += deltaInSeconds * this.velocityX.velocity;
      gameObject.y += deltaInSeconds * this.velocityY.velocity;
    }

    // if (this.velocityX.velocity != 0 || this.velocityY.velocity != 0) {
    //   this._angle = Math.atan2(this.velocityX.velocity, -this.velocityY.velocity) + this.ANGLE_OFFSET;
    // }
  }

  get velX() {
    return this.velocityX.velocity;
  }

  get velY() {
    return this.velocityY.velocity;
  }

  get angle() {
    return this._angle;
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
    this.calculateAngle();
  }

  set accelerationY(pixelsPerSecond: number) {
    this.velocityY.acceleration = pixelsPerSecond;
    this.calculateAngle();
  }

  set decelerationX(pixelsPerSecond: number) {
    this.velocityX.deceleration = pixelsPerSecond;
  }

  set decelerationY(pixelsPerSecond: number) {
    this.velocityY.deceleration = pixelsPerSecond;
  }

  constantAccelerateAtAngleXY(acceleration: number, angle: number, speed: number) {
    this.maxVelocityX = speed * Math.cos(angle);
    this.maxVelocityY = speed * Math.sin(angle);
    this.accelerationX = Math.abs(acceleration) * Math.cos(angle);
    this.accelerationY = Math.abs(acceleration) * Math.sin(angle);
    this._angle = angle;
  }

  // TODO: This needs improvement. Angle changes needs to be smoother.
  private calculateAngle() {

    var xFactor = 0;
    var yFactor = 0;
    if (this.velocityX.accelerating && this.velocityY.accelerating) {

      xFactor = this.velocityX.velocity;
      yFactor = this.velocityY.velocity;

    } else if (this.velocityX.accelerating) {

      xFactor = this.velocityX.acceleration;
      yFactor = this.velocityY.velocity;

    } else if (this.velocityY.accelerating) {

      xFactor = this.velocityX.velocity;
      yFactor = this.velocityY.acceleration;
    }

    this._angle = Math.atan2(xFactor, -yFactor) + this.ANGLE_OFFSET;
  }
}

class VelocityDimension {

  private _velocity: number = 0;
  private _acceleration: number = 0;
  private _accelerating: boolean = false;

  get acceleration() {
    return this._acceleration;
  }

  get accelerating() {
    return this._accelerating;
  }

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