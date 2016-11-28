import GameEvent from './event'
import GameObject from '../models/game-object'

export default class SpawnEvent extends GameEvent {

  readonly gameObject: GameObject

  constructor(gameObject: GameObject) {
    super();
    this.gameObject = gameObject;
  }
}