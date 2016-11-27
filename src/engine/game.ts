'use strict';

import FrameRate from './models/frame-rate'
import GameObject from './models/game-object';
import RenderEngine from './services/render-engine';
import InputController from './input-controllers/input-controller';
import GameEvent from './events/event';
import EventSystem from './services/event-system';
import ArrayUtils from './util/array-utils'

export default class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private frameRateOverlay: FrameRate;
  private gameObjects: Array<GameObject>;
  private static inputControllers: Array<InputController>;
  private running: boolean;
  private currentFrame: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    let twoDContext = canvas.getContext('2d');
    if (twoDContext == null) {
      throw new Error('Could not get the context from the canvas');
    }
    this.context = twoDContext!;
    this.gameObjects = [];
    Game.inputControllers = [];
    this.running = false;
  }

  start(): void {
    this.running = true;
    this.update();

    Game.inputControllers.forEach(e => e.bind());
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

    Game.inputControllers.forEach(e => e.unbind());
  }

  add(gameObject: GameObject): void {
    this.gameObjects.push(gameObject);
  }

  addInput(inputController: InputController): void {
    Game.inputControllers.push(inputController);
    if (this.running) inputController.bind();
  } 

  removeAllGameObjects(): void {
    this.gameObjects = [];
  }

  redraw(): void {
    RenderEngine.render(this.context, this.gameObjects);
  }

  update(timestamp: number = 0): void {

    // Time update
    var delta = 0;
    if (timestamp > 0 && this.currentFrame > 0) {
      delta = timestamp - this.currentFrame;
    }
    this.currentFrame = timestamp;

    // Remove pass
    for (var i = this.gameObjects.length - 1; i >= 0; i--) {
      if (!this.gameObjects[i].alive) {
        this.gameObjects.splice(i, 1);
      }
    } 

    // Event pass
    while (Game.events.length > 0) {
      EventSystem.handleEvent(this, Game.events.shift());
    }
    
    // Udpate pass
    this.gameObjects.forEach(e => e.update(delta));

    // Draw pass
    this.redraw();
    
    // Loop
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

  private static events: Array<GameEvent> = [];

  static EventBus = class {

    static post(event: GameEvent) {
      Game.events.push(event);
    }
  }

  static getInputController(type: any): InputController  | null {

    return ArrayUtils.getByType(type, Game.inputControllers);
  }
};

