import GameObject from '../models/game-object'
import GameContext from '../models/game-context'

abstract class Module {
  
  // Called when parent GameObject is updated by GameContext
  update(parent: GameObject, deltaMs: number): void {
    // implement if needed
  }

  // Called when parent GameObject is attached to GameContext
  onAttach(parent: GameObject, context: GameContext): void {
    // implement if needed
  }

  // Called when parent GameObject is detached from GameContext
  onDetach(parent: GameObject, context: GameContext): void {
    // implement if needed
  }
}
export default Module;