'use strict';

import FrameRate from './models/frame-rate'
import GameObject from './models/game-object';
import RenderEngine from './services/render-engine';
import InputController from './input-controllers/input-controller';

export default class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  frameRateOverlay: FrameRate;
  gameObjects: Array<GameObject>;
  inputControllers: Array<InputController>;
  running: boolean;
  currentFrame: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    let twoDContext = canvas.getContext('2d');
    if (twoDContext == null) {
      throw new Error('Could not get the context from the canvas');
    }
    this.context = twoDContext!;
    this.gameObjects = [];
    this.inputControllers = [];
    this.running = false;
  }

  start(): void {
    this.running = true;
    this.update();

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
    Game._viewPortWidth = width;
    Game._viewPortHeight = height;

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
    this.gameObjects.push(gameObject);
  }

  addInput(inputController: InputController): void {
    this.inputControllers.push(inputController);
    if (this.running) inputController.bind();
  } 

  removeAllGameObjects(): void {
    this.gameObjects = [];
  }

  redraw(): void {
    RenderEngine.render(this.context, this.gameObjects);
  }

  update(timestamp: number = 0): void {

    var delta = 0;
    if (timestamp > 0 && this.currentFrame > 0) {
      delta = timestamp - this.currentFrame;
    }

    this.gameObjects.forEach(e => e.update(delta));
    this.redraw();
    this.currentFrame = timestamp;
    
    if (this.running) {
      window.requestAnimationFrame((t) => this.update(t));
    }
  }

  private static _viewPortWidth: number = 0;
  private static _viewPortHeight: number = 0;

  static Info = class {

    static get viewPortHeight(): number {
      return Game._viewPortHeight;
    }

    static get viewPortWidth(): number {
      return Game._viewPortWidth;
    }
  }
};

