export default class PatchStatusOrderDto {
  constructor(params, query, adminId) {
    this.id = params.id;
    this.status = query.status;
    this.adminId = adminId;
  }
}