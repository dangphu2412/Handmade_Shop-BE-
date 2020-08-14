export default class FilterOrderDetailDto {
  constructor(userId, params, query) {
    this.userId = userId;
    this.key = query.key;
    this.id = params.id;
    this.page = query.page;
    this.amount = query.amount;
    this.order = query.order;
    this.by = query.by;
  }
}
