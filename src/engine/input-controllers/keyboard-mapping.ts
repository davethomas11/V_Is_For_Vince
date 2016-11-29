export default class KeyboardMapping {

  private press: { [key:string]:Function } = {};
  private onDown: { [key:string]:Function } = {};
  private onUp: { [key:string]:Function } = {};

  registerPress(key: string, action: Function): void {
    this.press[key] = action;
  }

  registerOnDown(key: string, action: Function): void {
    this.onDown[key] = action;
  }

  registerOnUp(key: string, action: Function): void {
    this.onUp[key] = action;
  }

  handlePress(key: string): void {
    this.handleEvent(key, this.press);
  }

  handleDown(key:string): void {
    this.handleEvent(key, this.onDown);
  }

  handleUp(key:string): void {
    this.handleEvent(key, this.onUp);
  }

  isHandlingUp(): boolean {
    return Object.keys(this.onUp).length > 0;
  }

  isHandlingDown(): boolean {
    return Object.keys(this.onDown).length > 0;
  }

  isHandlingPress(): boolean {
    return Object.keys(this.press).length > 0;
  }

  private handleEvent(key:string, handler: { [key:string]:Function }) {
    if (handler[key] != null) handler[key]();
  }
}