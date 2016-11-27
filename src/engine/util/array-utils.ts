export default class ArrayUtils {

  static remove <T> (object:T, array:Array<T>):boolean {
    let index = array.indexOf(object);
    if (index != -1) {
      array.splice(index, 1);
      return true;
    }
    return false;
  }

  static addToSet <T> (object:T, array:Array<T>):boolean {
    let index = array.indexOf(object);
    if (index == -1) {
      array.push(object);
      return true;
    }
    return false;
  }
}