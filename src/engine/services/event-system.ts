import GameEvent from '../events/event'
import GameContext from '../models/game-context'
import SpawnEvent from '../events/spawn-event'
import Game from '../game'

export default class EventBus {

  private static eventPool: { [gameName: string]: Array<GameEvent> } = {};

  static post(context: GameContext, event: GameEvent): void {
    let events = EventBus.eventPool[context.getUniqueGameName()];
    if (events == null) {
      EventBus.eventPool[context.getUniqueGameName()] = events = [];
    }
    events.push(event);
  }

  static handleEvents(game: Game): void {
    let events = EventBus.eventPool[game.getUniqueGameName()];
    while (events && events.length > 0) {
      EventBus.handleEvent(game, events.shift());
    }
  }

  private static handleEvent(game: Game, event: GameEvent | undefined): void {
    if (event!.is(SpawnEvent)) {
      game.add((event as SpawnEvent).gameObject);
    }
  }
}