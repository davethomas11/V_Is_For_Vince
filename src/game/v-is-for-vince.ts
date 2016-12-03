'use strict';

import Game from '../engine/game';
import PlayerConfig from './models/player-config';
import Player from './models/player';
import KeyboardController from '../engine/input-controllers/keyboard-input';
import VelocityModule from '../engine/modules/velocity-module';
import GameObject from '../engine/models/game-object';
import { Keyset } from '../engine/input-controllers/basic-keyboard-movement';
import { PhysicsConversions } from '../engine/modules/physics-module';

export default class VinceGame extends Game {

  readonly VEL: number = 250;
  readonly ACCEL: number = 145;
  readonly DECEL: number = 75;

  vince: Player;
  jerry: Player;
  bart: Player;

  keyboard: KeyboardController;

  edges: Array<PhysicsType2d.Dynamics.Body>

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    // This allows us to have a full width game
    window.addEventListener('resize', () => {
      this.setBounds();
    }, false);

    this.init();
  }

  getUniqueGameName(): string {
    return "VisForVince";
  }
 
  /**
   * Sets the outer bounding box of the game to the window size
   * Creates physics boundaries around outer edges of window
   * 
   * @memberOf VinceGame
   */
  setBounds() {
    let gameEdges:Array<PhysicsType2d.Dynamics.Body> = [];

    let width = PhysicsConversions.toMetres(window.innerWidth);
    let height = PhysicsConversions.toMetres(window.innerHeight);
    let topLeft = new PhysicsType2d.Vector2(0, 0);
    let topRight = new PhysicsType2d.Vector2(width, 0);
    let bottomLeft = new PhysicsType2d.Vector2(0, height);
    let bottomRight = new PhysicsType2d.Vector2(width, height);

    gameEdges.push(this.createEdge(topLeft, topRight));
    gameEdges.push(this.createEdge(topRight, bottomRight));
    gameEdges.push(this.createEdge(bottomRight, bottomLeft));
    gameEdges.push(this.createEdge(bottomLeft, topLeft));

    if (this.edges) this.edges.forEach(e => this.destroyPhysicBody(e));
    this.edges = gameEdges;

    super.setBounds(window.innerWidth, window.innerHeight);
  }

  /**
   * Create a physics edge object in the world.
   * The edge blocks other physics objects from passing through it.
   * 
   * @param {PhysicsType2d.Vector2} from - this point
   * @param {PhysicsType2d.Vector2} to - this point
   * @returns {PhysicsType2d.Dynamics.Body}
   * 
   * @memberOf VinceGame
   */
  createEdge(from: PhysicsType2d.Vector2, to: PhysicsType2d.Vector2): PhysicsType2d.Dynamics.Body {
    var groundDefinition = new PhysicsType2d.Dynamics.BodyDefinition();
    groundDefinition.type = PhysicsType2d.Dynamics.BodyType.STATIC;
    var ground = this.createPhysicsBody(groundDefinition);
    var groundShape = new PhysicsType2d.Collision.Shapes.EdgeShape();
    groundShape.Set(from, to);
    ground.CreateFixture(groundShape, 0.0);
    return ground;
  }

  init(): void {
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
    this.setBounds();
    
    this.add(this.vince);
    this.add(this.jerry);
    this.add(this.bart);
  }

  stop() {
    super.stop();

    this.removeAllGameObjects();
  }
}
