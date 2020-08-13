/* eslint-disable no-param-reassign */
export const pagination = ({ page = 1, amount = 10 }, items = []) => {
  page = parseInt(page, 10);
  amount = parseInt(amount, 10);
  const limit = amount;
  const offset = (page - 1) * amount;
  return items.slice(offset, limit + offset);
};

export const initModule = () => console.log('Initializing array');
