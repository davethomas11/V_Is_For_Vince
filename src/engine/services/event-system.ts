import GameEvent from '../events/event'
import SpawnEvent from '../events/spawn-event'
import Game from '../game'

export default class EventSystem {

  static handleEvent(game: Game, event: GameEvent | undefined): void {

    if ((<any>event).constructor.name == (<any>SpawnEvent).name) {
      game.add((event as SpawnEvent).gameObject);
    }
  }
}