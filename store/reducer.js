import * as actions from './actionTypes';

// sync id to database
//actions (add, edit , delete)
const initialState = [];
const listId = 0;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.LIST_ADDED:
      return [
        ...state,
        {
          id: ++listId,
          title: action.payload.description,
          categories: action.payload.categories,
          price: action.payload.price,
          description: action.payload.description,
        },
      ];

    default:
      return state;
  }
}
