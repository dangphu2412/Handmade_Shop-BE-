export default class Ramdom {
  static randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
  }
}
