'use strict';

import FrameRate from './models/frame-rate';
import GameObject from './models/game-object';
import RenderEngine from './services/render-engine';
import InputController from './input-controllers/input-controller';
import GameEvent from './events/event';
import EventBus from './services/event-system';
import ArrayUtils from './util/array-utils';
import GameContext from './models/game-context';
import PhysicsType2d from './vendor/physics/PhysicsType2d.v0_9'

abstract class Game implements GameContext {

  readonly PHYSICS_TIME_STEP = 1/120;
  readonly PHYSICS_VELOCITY_ITERATIONS = 8;
  readonly PHYSICS_POSITION_ITERATIONS = 3;

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private frameRateOverlay: FrameRate;
  private gameObjects: Array<GameObject>;
  private inputControllers: Array<InputController>;
  private running: boolean;
  private currentFrame: number;
  private viewPortWidth: number = 0;
  private viewPortHeight: number = 0;
  private physicsWorld: PhysicsType2d.Dynamics.World;
  private gravity: PhysicsType2d.Vector2;
  private physicsDeltaAccumulator: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.viewPortWidth = canvas.width;
    this.viewPortHeight = canvas.height;
    let twoDContext = canvas.getContext('2d');
    if (twoDContext == null) {
      throw new Error('Could not get the context from the canvas');
    }
    this.context = twoDContext;
    this.gameObjects = [];
    this.inputControllers = [];
    this.running = false;

    this.gravity = new PhysicsType2d.Vector2(0,0);
    this.physicsWorld = new PhysicsType2d.Dynamics.World(this.gravity);
  }

  abstract getUniqueGameName(): string;

  start(): void {
    this.running = true;
    this.update();
    this.physicsStep();

    this.inputControllers.forEach(e => e.bind());
  }

  showFrameRate(isFrameRateVisible: boolean): void {
    if (isFrameRateVisible) {
      this.frameRateOverlay = new FrameRate();
      this.add(this.frameRateOverlay);
    } else {
      this.frameRateOverlay.alive = false;
    }
  }

  setBounds(width: number, height: number): void {
    this.viewPortWidth = width;
    this.viewPortHeight = height;

    this.canvas.width = width;
    this.canvas.height = height;

    this.redraw();
  }

  stop(): void {
    this.running = false;
    this.currentFrame = 0;

    this.inputControllers.forEach(e => e.unbind());
  }

  add(gameObject: GameObject): void {
    gameObject.attach(this);
    this.gameObjects.push(gameObject);
  }

  remove(gameObject: GameObject): void {
    let index = this.gameObjects.indexOf(gameObject);
    if (index != -1) {
      this.gameObjects.splice(index, 1);
      gameObject.detach(this);
    }
  }

  addInput(inputController: InputController): void {
    this.inputControllers.push(inputController);
    if (this.running) inputController.bind();
  } 

  removeAllGameObjects(): void {
    for (let i = this.gameObjects.length - 1; i >= 0; i--) {
      this.remove(this.gameObjects[i]);
    } 
  }

  redraw(): void {
    RenderEngine.render(this.context, this.gameObjects, this);
  }

  update(timestamp: number = 0): void {

    // Time update
    var delta = 0;
    if (timestamp > 0 && this.currentFrame > 0) {
      delta = timestamp - this.currentFrame;
    }
    this.currentFrame = timestamp;

    // Remove pass
    for (let i = this.gameObjects.length - 1; i >= 0; i--) {
      if (!this.gameObjects[i].alive) {
        this.remove(this.gameObjects[i]);
      }
    } 

    // Event pass
    EventBus.handleEvents(this);
    
    // Update pass
    this.gameObjects.forEach(e => e.update(delta));

    // Draw pass
    this.redraw();
    
    // Attempt to keep physics step at constant rate
    this.physicsDeltaAccumulator += delta;
    while (this.physicsDeltaAccumulator > this.PHYSICS_TIME_STEP * 1000) {
      this.physicsStep();
      this.physicsDeltaAccumulator -= this.PHYSICS_TIME_STEP * 1000;
    }

    // Loop
    if (this.running) {
      window.requestAnimationFrame((t) => this.update(t));
    }
  }

  physicsStep(): void {
    // Physics must update at a constant time step independent of variable frame rate.
    // It is recommended by the libarary: http://physicstype2d.com/index.html
    this.physicsWorld.Step(this.PHYSICS_TIME_STEP, this.PHYSICS_VELOCITY_ITERATIONS, this.PHYSICS_POSITION_ITERATIONS);
  }

  getViewPortWidth(): number {
    return this.viewPortWidth;
  }

  getViewPortHeight(): number {
    return this.viewPortHeight
  }

  getInputController(type: any): InputController | undefined {
    return ArrayUtils.getByType(type, this.inputControllers);
  }

  createPhysicsBody(def: PhysicsType2d.Dynamics.BodyDefinition): PhysicsType2d.Dynamics.Body {
    return this.physicsWorld.CreateBody(def);
  }

  destroyPhysicBody(body: PhysicsType2d.Dynamics.Body): void {
    this.physicsWorld.DestroyBody(body);
  }
};

export default Game