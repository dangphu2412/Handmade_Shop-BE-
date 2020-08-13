import { FILTER } from "../../../../constants/const";

export default class FilterDto {
  constructor(input) {
    this.key = input.key || "";
    this.value = input.value || "";
    this.page = input.page || FILTER.PAGE;
    this.amount = input.amount || FILTER.AMOUNT;
    this.order = input.order || FILTER.ORDER;
    this.by = input.by || FILTER.BY;
  }
}