'use strict';

import Game from '../engine/game';
import PlayerConfig from './models/player-config';
import Player from './models/player';
import KeyboardController from '../engine/input-controllers/keyboard-input';
import VelocityModule from '../engine/modules/velocity-module';
import GameObject from '../engine/models/game-object';
import { Keyset } from '../engine/input-controllers/basic-keyboard-movement';

export default class VinceGame extends Game {

  readonly VEL: number = 250;
  readonly ACCEL: number = 145;
  readonly DECEL: number = 75;

  vince: Player;
  jerry: Player;
  bart: Player;

  keyboard: KeyboardController;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    // This allows us to have a full width game
    window.addEventListener('resize', () => {
      this.setBounds(window.innerWidth, window.innerHeight);
    }, false);

    this.init();
  }

  getUniqueGameName(): string {
    return "VisForVince";
  }

  init() {
    this.keyboard = new KeyboardController;
    super.addInput(this.keyboard); // Refactor this. Maybe it doesn't need to be attached to base game engine

    let vinceKeys = new Keyset("ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown");
    let config = new PlayerConfig();
    config.colorA = "#0F0";
    config.colorB = "#30F"
    config.fireKey = "Enter";
    config.radius = 50;
    config.startX = 100;
    config.startY = 100;
    this.vince = this.preparePlayer(config, vinceKeys);

    let jerryKeys = new Keyset("KeyA", "KeyW", "KeyD", "KeyS");
    config.colorA = "#F0F";
    config.colorB = "#3AF"
    config.fireKey = "Space";
    config.radius = 75;
    config.startX = 300;
    config.startY = 300;
    this.jerry = this.preparePlayer(config, jerryKeys);

    let bartKeys = new Keyset("KeyJ", "KeyI", "KeyL", "KeyK");
    config.colorA = "#34F";
    config.colorB = "#3A1"
    config.fireKey = "KeyO";
    config.radius = 30;
    config.startX = 100;
    config.startY = 400;
    this.bart = this.preparePlayer(config, bartKeys);

  }

  //temporary utility function
  preparePlayer(config: PlayerConfig, keyset: Keyset): Player {
    config.acceleration = this.ACCEL;
    config.deceleration = this.DECEL;
    config.speed = this.VEL;
    config.movementKeys = keyset;

    return new Player(config);
  }

  start() {
    super.start();

    this.showFrameRate(true);
    this.setBounds(window.innerWidth, window.innerHeight);
    
    this.add(this.vince);
    this.add(this.jerry);
    this.add(this.bart);
  }

  stop() {
    super.stop();

    this.removeAllGameObjects();
  }
}
