'use strict';

import GameInfo from './interfaces/game-info';
import FrameRate from './models/frame-rate'
import GameObject from './models/game-object';
import RenderEngine from './services/render-engine';
import TimeService from './services/time-service';

export default class Game {
  canvas: HTMLCanvasElement;
  frameRateOverlay: FrameRate;
  gameInfo: GameInfo;
  gameObjects: Array<GameObject>;
  running: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.gameObjects = [];
    this.running = false;
    this.gameInfo = {
      bounds : {
        height: canvas.height,
        width: canvas.width
      }
    };
  }

  start(): void {
    this.running = true;
    this.update();
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
    this.gameInfo.bounds.width = width;
    this.gameInfo.bounds.height = height;

    this.canvas.width = width;
    this.canvas.height = height;

    this.redraw();
  }

  stop(): void {
    this.running = false;
    TimeService.currentFrame = undefined;
  }

  add(gameObject: GameObject): void {
    this.gameObjects.push(gameObject);
  }

  removeAllGameObjects(): void {
    this.gameObjects = [];
  }

  redraw(): void {
    RenderEngine.render(this.canvas, this.gameObjects);
  }

  update(timestamp: number | undefined = undefined): void {
    if (timestamp === undefined || TimeService.currentFrame === undefined) {
      TimeService.delta = 0;
    } else {
      TimeService.delta = timestamp - TimeService.currentFrame;
    }

    this.gameObjects.forEach(e => e.update(this.gameInfo));
    this.redraw();
    TimeService.currentFrame = timestamp;

    if (this.running) {
      window.requestAnimationFrame((t) => this.update(t));
    }
  }
};