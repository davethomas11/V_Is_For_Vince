import GameObject from '../models/game-object'

abstract class Module {
  
  update(parent: GameObject, deltaMs: number): void {

  }

  onAttach(parent: GameObject): void {

  }
}
export default Module;