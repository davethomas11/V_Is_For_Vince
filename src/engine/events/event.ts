export default class GameEvent {
  
  is(type: any): boolean {
    return (this as any).constructor == type;
  }
}