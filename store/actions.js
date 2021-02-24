import * as actions from './actionTypes';

export const listAdded = (
  images,
  title,
  price,
  free,
  negotiable,
  category,
  description,
) => ({
  type: actions.LIST_ADDED,
  payload: {
    images,
    title,
    price,
    free,
    negotiable,
    category,
    description,
  },
});
