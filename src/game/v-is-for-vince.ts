'use strict';

import Game from '../engine/game';
import Vince from './models/vince';
import Jerry from './models/jerry';
import Bart from './models/bart';
import KeyboardController from '../engine/input-controllers/keyboard-input';
import VelocityModule from '../engine/modules/velocity-module';
import GameObject from '../engine/models/game-object';
import { BasicKeyboardMovementMapping, Keyset } from '../engine/input-controllers/basic-keyboard-movement';


export default class VinceGame extends Game {

  readonly VEL: number = 250;
  readonly ACCEL: number = 145;
  readonly DECEL: number = 75;

  vince: Vince;
  jerry: Jerry;
  bart: Bart;

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

    this.vince = new Vince();
    let vinceKeys = new Keyset("ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown");
    this.preparePlayer(this.vince, vinceKeys);

    this.jerry = new Jerry();
    let jerryKeys = new Keyset("KeyA", "KeyW", "KeyD", "KeyS");
    this.preparePlayer(this.jerry, jerryKeys);

    this.bart = new Bart();
    let bartKeys = new Keyset("KeyJ", "KeyI", "KeyL", "KeyK");
    this.preparePlayer(this.bart, bartKeys);

  }

  //temporary utility function
  preparePlayer(object: GameObject, keyset: Keyset) {
    let velocity = new VelocityModule(this.VEL, this.ACCEL, this.DECEL);
    object.addModule(velocity);
    let mapping = new BasicKeyboardMovementMapping(velocity, keyset);
    this.keyboard.attachKeyboardMapping(mapping);
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
