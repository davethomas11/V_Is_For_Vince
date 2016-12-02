import Module from './module'
import GameObject from '../models/game-object'
import GameContext from '../models/game-context'

export interface BodyDefinitionFactory {
  getBodyDefinition(): PhysicsType2d.Dynamics.BodyDefinition;
  getFixtures(): Array<PhysicsType2d.Dynamics.FixtureDefinition>;
}

export class PhysicsConversions {
  private static readonly METRES_PER_PIXEL = 0.02;
  private static readonly PIXELS_PER_METRE = 50;
  
  static toMetres(pixels: number): number {
    return pixels * this.METRES_PER_PIXEL;
  }

  static toPixels(metres: number): number {
    return metres * this.PIXELS_PER_METRE;
  }
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
    this.factory.getFixtures().forEach(f => { this.body.CreateFixtureFromDefinition(f) });
  }

  onDetach(gameObject: GameObject, context: GameContext): void {
    context.destroyPhysicBody(this.body);
  }

  update(parent: GameObject, deltaMs: number): void {
    parent.x = PhysicsConversions.toPixels(this.body.GetPosition().x);
    parent.y = PhysicsConversions.toPixels(this.body.GetPosition().y);
  }

  applyForce(vector: PhysicsType2d.Vector2): void {
    this.body.ApplyLinearImpulse(vector, this.body.GetLocalCenter())
  }

  setVelocity(vector: PhysicsType2d.Vector2): void {
    this.body.SetLinearVelocity(vector);
  }
}