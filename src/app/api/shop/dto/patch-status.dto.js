export default class PatchStatusOrderDto {
  constructor(params, query) {
    this.id = params.id;
    this.status = query.status;
  }
}