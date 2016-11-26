'use strict';

export default class NumberTools {
  static clamp(number, min, max) {
    return Math.min(Math.max(number, min), max);
  }
}