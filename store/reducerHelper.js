import * as actions from './actionTypes';

export const addToListings = (state, action) => {
  switch (action.type) {
    case actions.ITEM_ADDED:
      return {
        ...state.items,
        [action.itemId]: {
          status: 'active',
          date: new Date().toString(),
          chats: 0,
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
      };
    default:
      return state;
  }
};
