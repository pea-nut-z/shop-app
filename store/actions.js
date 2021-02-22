import * as actions from './actionTypes';

export const listAdded = (title, categories, price, description) => ({
  type: actions.LIST_ADDED,
  payload: {
    title,
    categories,
    price,
    description,
  },
});
