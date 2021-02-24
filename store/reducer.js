import * as actions from './actionTypes';

// sync id to database
//actions (add, edit , delete)
const initialState = [];
let listId = 0;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.LIST_ADDED:
      return [
        ...state,
        {
          id: ++listId,
          status: active,
          date: new Date(),
          Chats: 0,
          favorites: 0,
          views: 0,
          images: action.payload.images,
          title: action.payload.title,
          price: action.payload.price,
          free: action.payload.free,
          negotiable: action.payload.negotiable,
          category: action.payload.category,
          description: action.payload.description,
        },
      ];

    default:
      return state;
  }
}
