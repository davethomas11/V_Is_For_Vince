import { Keyset } from '../../engine/input-controllers/basic-keyboard-movement';

export default class PlayerConfig {

  public radius: number;
  public colorA: string;
  public colorB: string;
  public speed: number;
  public acceleration: number;
  public deceleration: number;
  public startX: number;
  public startY: number;
  public movementKeys: Keyset;
  public fireKey: string;
}