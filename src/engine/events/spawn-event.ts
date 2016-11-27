import GameEvent from './event'
import GameObject from '../models/game-object'

export default class SpawnEvent extends GameEvent {

  private _gameObject: GameObject

  constructor(gameObject: GameObject) {
    super();
    this._gameObject = gameObject;
  }

  get gameObject() {
    return this._gameObject;
  }
}