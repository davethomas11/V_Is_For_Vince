import InputController from '../input-controllers/input-controller'

// Publicly exposed engine data and setters for GameObjects
interface GameContext {

  getViewPortHeight(): number;
  getViewPortWidth(): number;

  getInputController(type: any): InputController | undefined;
  getUniqueGameName(): string;
}

export default GameContext