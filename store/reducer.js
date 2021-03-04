import {combineReducers} from 'redux';
import * as actions from './actionTypes';
import {getAllSellersItems} from '../helper';

// sync id to database
//actions (add, edit , delete)

const users = {
  111: {
    userName: 'Test1',
    location: 'Toronto',
    rating: 60,
  },
  222: {
    userName: 'Test2',
    location: 'Ottawa',
    rating: 19,
  },
};
const listings = {
  111: {
    1: {
      status: 'Active',
      date: new Date('2021-02-28'),
      chats: 0,
      favorites: 0,
      views: 0,
      images: [11],
      title: 'Electronics',
      price: 1,
      free: true,
      negotiable: true,
      category: 'Electronics',
      description: 'some description',
    },
  },
  222: {
    66: {
      status: 'Sold',
      date: new Date('2021-03-01'),
      chats: 0,
      favorites: 0,
      views: 0,
      images: [
        'https://i.ytimg.com/vi/H8X7FHrq278/maxresdefault.jpg',
        'https://static.wikia.nocookie.net/pokemon/images/4/49/Ash_Pikachu.png/revision/latest?cb=20200405125039',
      ],
      title: 'title666',
      price: 400,
      free: true,
      negotiable: true,
      category: "Women's fashion",
      description: 'some description',
    },
    77: {
      status: 'Active',
      date: new Date('2021-02-01'),
      chats: 0,
      favorites: 0,
      views: 0,
      images: [11],
      title: 'title777',
      price: 10,
      free: true,
      negotiable: true,
      category: 'Sports & leisure',
      description: 'some description',
    },
    88: {
      status: 'Reserved',
      date: new Date('2021-03-03'),
      chats: 0,
      favorites: 0,
      views: 0,
      images: [
        'https://cdn.vox-cdn.com/thumbor/YKOpdn84C7mLzUD_QNDI9ICvMcU=/0x0:1024x555/1200x800/filters:focal(431x197:593x359)/cdn.vox-cdn.com/uploads/chorus_image/image/64145891/Switch_SuperMarioMaker2_char_artwork_copy.0.jpg',
        'https://media.wired.com/photos/5926c126af95806129f50868/master/w_2560%2Cc_limit/SuperMarioRunTA.jpg',
      ],
      title: 'title888',
      price: 40,
      free: true,
      negotiable: true,
      category: 'Sports & leisure',
      description: 'some description',
    },
    99: {
      status: 'Reserved',
      date: new Date('2021-01-28'),
      chats: 0,
      favorites: 0,
      views: 0,
      images: [
        'https://cdn.vox-cdn.com/thumbor/YKOpdn84C7mLzUD_QNDI9ICvMcU=/0x0:1024x555/1200x800/filters:focal(431x197:593x359)/cdn.vox-cdn.com/uploads/chorus_image/image/64145891/Switch_SuperMarioMaker2_char_artwork_copy.0.jpg',
        'https://media.wired.com/photos/5926c126af95806129f50868/master/w_2560%2Cc_limit/SuperMarioRunTA.jpg',
      ],
      title: 'title999',
      price: 40,
      free: true,
      negotiable: true,
      category: 'Sports & leisure',
      description: 'some description',
    },
    55: {
      status: 'Active',
      date: new Date('2020-01-30'),
      chats: 0,
      favorites: 0,
      views: 0,
      images: [
        'https://cdn.vox-cdn.com/thumbor/YKOpdn84C7mLzUD_QNDI9ICvMcU=/0x0:1024x555/1200x800/filters:focal(431x197:593x359)/cdn.vox-cdn.com/uploads/chorus_image/image/64145891/Switch_SuperMarioMaker2_char_artwork_copy.0.jpg',
        'https://media.wired.com/photos/5926c126af95806129f50868/master/w_2560%2Cc_limit/SuperMarioRunTA.jpg',
      ],
      title: 'title555',
      price: 40,
      free: true,
      negotiable: true,
      category: 'Baby & kids',
      description: 'some description',
    },
  },
};

function usersReducer(state = users, action) {
  switch (action.type) {
    case actions.USER_ADDED:
      return state;
    default:
      return state;
  }
}

function listingsReducer(state = listings, action) {
  switch (action.type) {
    case actions.ITEM_ADDED:
      return {
        ...state,
        [action.sellerId]: {
          ...state[action.sellerId],
          [action.itemId]: {
            status: 'active',
            date: new Date(),
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
        },
      };
    default:
      return state;
  }
}

export default rootReducer = combineReducers({
  users: usersReducer,
  listings: listingsReducer,
});

export const allSellersItems = getAllSellersItems(users, listings);
