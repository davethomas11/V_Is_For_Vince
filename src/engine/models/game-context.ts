import InputController from '../input-controllers/input-controller'
import PhysicsType2d from '../vendor/physics/PhysicsType2d.v0_9'

// Publicly exposed engine data and setters for GameObjects
interface GameContext {

  getViewPortHeight(): number;
  getViewPortWidth(): number;

  getInputController(type: any): InputController | undefined;
  getUniqueGameName(): string;

  createPhysicsBody(def: PhysicsType2d.Dynamics.BodyDefinition): PhysicsType2d.Dynamics.Body;
  destroyPhysicBody(body: PhysicsType2d.Dynamics.Body): void
}

export default GameContext