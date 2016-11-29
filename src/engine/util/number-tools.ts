'use strict';

import Rect from '../geometry/rect'
import Point from '../geometry/point'

export default class NumberTools {
  /**
   * Clamp a number between a given maximum and minimum value. Any number below the minimum will be brought up to the
   * minimum, and any number above the maximum will be brought down to the maximum.
   *
   * @param {number} num  The number to clamp.
   * @param {number} min  The minimum allowed value.
   * @param {number} max  The maximum allowed value.
   * 
   * @returns {number} The given value, modified to fit between the min and max (inclusive).
   * 
   * @author Tyler Smith
   */
  static clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
  }

  /**
   * Rounds a number. This differs from Math.round in that you can provider a number of decimal places to round to.
   * 
   * @param {number} num            The number to round.
   * @param {number} decimalPlaces  The number of decimal places to round to.
   * 
   * @returns {number} The rounded number.
   * 
   * @author Tyler Smith
   */
  static round(num: number, decimalPlaces: number = 0): number {
    if (decimalPlaces < 0) throw new Error('Decimal places must be a positive integer');

    let multiplier = Math.pow(10, Math.floor(decimalPlaces));
    return (Math.round(num * multiplier) / multiplier);
  }

  static rectContainsPoint(rect: Rect, point: Point): boolean {
    let containsX = point.x >= rect.x && point.x <= rect.width;
    let containsY = point.y >= rect.y && point.y <= rect.height;
    return containsX && containsY;
  }

  static stepTowards(from: number, to: number, step:number = 1): number {
    if (from < to ) {
      from += step;
      if (from > to) from = to;
      return from;
    } else if (from > to) {
      from -= step;
      if (from < to) from = to;
      return from;
    } else {
      return to;
    }
  }
}