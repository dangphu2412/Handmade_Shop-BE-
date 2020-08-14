export default class PatchStatusOrderDto {
  constructor(params, query, adminId) {
    this.id = parseInt(params.id, 10);
    this.status = query.status;
    this.adminId = adminId;
  }
}