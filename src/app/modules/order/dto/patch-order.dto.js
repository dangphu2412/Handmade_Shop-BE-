export default class PatchStatusOrderDto {
  constructor(userId, params, query) {
    this.userId = userId;
    this.id = params.id;
    this.status = query.status;
  }
}