import KeyboardMapping from './keyboard-mapping'
import ArrayUtils from './../util/array-utils'
import InputController from './input-controller'

export default class KeyboardController implements InputController {

  private mappings: Array<KeyboardMapping> = [];

  private hasDownHandler: number = 0;
  private hasUpHandler: number = 0;
  private hasPressHandler: number = 0;

  // These functions need to be wrapped to protect `this` context
  private downEventListener: EventListenerOrEventListenerObject = 
    (e: KeyboardEvent) => this.keyDown(e);
  private upEventListener: EventListenerOrEventListenerObject = 
    (e: KeyboardEvent) => this.keyUp(e);
  private pressEventListener: EventListenerOrEventListenerObject = 
    (e: KeyboardEvent) => this.keyPress(e);

  bind(): void {
    window.addEventListener("keydown", this.downEventListener);
    window.addEventListener("keyup", this.upEventListener);
    window.addEventListener("keypress", this.pressEventListener);
  }

  unbind(): void {
    window.removeEventListener("keydown", this.keyDown);
    window.removeEventListener("keyup", this.keyUp);
    window.removeEventListener("keypress", this.keyPress);
  }

  keyDown(event: KeyboardEvent): void {
    if (!this.hasDownHandler) return;

    this.mappings.forEach((mapping) => {
      mapping.handleDown(event.code);
    });
  }

  keyUp(event: KeyboardEvent): void {
    if (!this.hasUpHandler) return;

    this.mappings.forEach((mapping) => {
      mapping.handleUp(event.code);
    });
  }

  keyPress(event: KeyboardEvent): void {

    if (!this.hasPressHandler) return;

    this.mappings.forEach((mapping) => {
      mapping.handlePress(event.code);
    });
  }

  attachKeyboardMapping(mapping: KeyboardMapping): void {
    this.mappings.push(mapping);
    this.assessmentOfMapping(mapping);
  }

  removeKeyboardMapping(mapping: KeyboardMapping): void {
    ArrayUtils.remove(mapping, this.mappings);
    this.hasDownHandler = this.hasUpHandler = this.hasPressHandler = 0;
    this.mappings.forEach(this.assessmentOfMapping);
  }

  private assessmentOfMapping(mapping: KeyboardMapping): void {
    this.hasDownHandler |= mapping.isHandlingDown() ? 1 : 0;
    this.hasUpHandler |= mapping.isHandlingUp() ? 1 : 0;
    this.hasPressHandler |= mapping.isHandlingPress() ? 1 : 0;
  }
}