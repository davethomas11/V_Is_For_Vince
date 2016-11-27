import GameObject from '../models/game-object'

interface Module {
  update(parent: GameObject, deltaMs: number): void;
}
export default Module;