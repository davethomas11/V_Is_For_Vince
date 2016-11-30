import Module from './module'
import GameObject from '../models/game-object'
import GameContext from '../models/game-context'
import PhysicsType2d from '../vendor/physics/PhysicsType2d.v0_9'

export  interface BodyDefinitionFactory {
  getBodyDefinition(): PhysicsType2d.Dynamics.BodyDefinition;
  getFixtures(): Array<PhysicsType2d.Dynamics.FixtureDefinition>;
}

export class PhysicsModule extends Module {

  private body: PhysicsType2d.Dynamics.Body;
  private factory: BodyDefinitionFactory;
  private vector: PhysicsType2d.Vector2;

  constructor(factory: BodyDefinitionFactory) {
    super();
    this.factory = factory;
    this.vector = new PhysicsType2d.Vector2(0,0);
  }

  onAttach(gameObject: GameObject, context: GameContext): void {
    this.body = context.createPhysicsBody(this.factory.getBodyDefinition());
    this.factory.getFixtures().forEach(f => this.body.CreateFixtureFromDefinition(f));
  }

  onDetach(gameObject: GameObject, context: GameContext): void {
    context.destroyPhysicBody(this.body);
  }

  update(parent: GameObject, deltaMs: number): void {
    this.body.GetWorldPoint(this.vector);
    parent.x = this.vector.x;
    parent.y = this.vector.y;
  }

  applyForce(vector: PhysicsType2d.Vector2): void {
    this.body.ApplyForceToCenter(vector);
  }
}