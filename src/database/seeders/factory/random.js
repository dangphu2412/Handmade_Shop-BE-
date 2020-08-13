export default class Ramdom {
  static randomNumber(start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
  }

  static randomDate(start, end) {
    return new Date(start.getTime() + Math.random()
    * (end.getTime() - start.getTime()))
    .toISOString();
  }
}
