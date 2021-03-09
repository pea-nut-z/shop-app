import {combineReducers} from 'redux';
import * as actions from './actionTypes';

// sync id to database
//actions (add, edit , delete)
// userId -> sellerId -> itemId

// MOCK USER
const userId = 111;

const members = {
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
      date: new Date(
        'Thu Feb 04 2021 20:36:28 GMT-0500 (Eastern Standard Time',
      ).toString(),
      chats: 0,
      favorites: 0,
      views: 0,
      images: [11],
      title: 'user1 , item1',
      price: 1,
      free: true,
      negotiable: true,
      category: 'Electronics',
      description: 'some description',
    },
    2: {
      status: 'Reserved',
      date: new Date(
        'Thu Feb 04 2021 20:36:28 GMT-0500 (Eastern Standard Time',
      ).toString(),
      chats: 0,
      favorites: 0,
      views: 0,
      images: [11],
      title: 'user1 , item2',
      price: 100,
      free: true,
      negotiable: true,
      category: 'Electronics',
      description: 'some description',
    },
  },
  222: {
    66: {
      status: 'Sold',
      date: new Date(
        'Thu Feb 09 2021 20:36:28 GMT-0500 (Eastern Standard Time',
      ).toString(),

      chats: 0,
      favorites: 0,
      views: 0,
      images: [
        'https://i.ytimg.com/vi/H8X7FHrq278/maxresdefault.jpg',
        'https://static.wikia.nocookie.net/pokemon/images/4/49/Ash_Pikachu.png/revision/latest?cb=20200405125039',
      ],
      title: 'user2 , item6',
      price: 400,
      free: true,
      negotiable: true,
      category: "Women's fashion",
      description: 'some description',
    },
    77: {
      status: 'Active',
      date: new Date(
        'Thu Jan 26 2020 20:36:28 GMT-0500 (Eastern Standard Time',
      ).toString(),
      chats: 0,
      favorites: 0,
      views: 0,
      images: [11],
      title: 'user2 , item7',
      price: 10,
      free: true,
      negotiable: true,
      category: 'Sports & leisure',
      description: 'some description',
    },
    88: {
      status: 'Reserved',
      date: new Date(
        'Thu Feb 04 2021 20:36:28 GMT-0500 (Eastern Standard Time',
      ).toString(),
      chats: 0,
      favorites: 0,
      views: 0,
      images: [
        'https://cdn.vox-cdn.com/thumbor/YKOpdn84C7mLzUD_QNDI9ICvMcU=/0x0:1024x555/1200x800/filters:focal(431x197:593x359)/cdn.vox-cdn.com/uploads/chorus_image/image/64145891/Switch_SuperMarioMaker2_char_artwork_copy.0.jpg',
        'https://media.wired.com/photos/5926c126af95806129f50868/master/w_2560%2Cc_limit/SuperMarioRunTA.jpg',
      ],
      title: 'user2 , item8',
      price: 40,
      free: true,
      negotiable: true,
      category: 'Sports & leisure',
      description: 'some description',
    },
    99: {
      status: 'Sold',
      date: new Date(
        'Thu Jun 04 2019 20:36:28 GMT-0500 (Eastern Standard Time',
      ).toString(),
      chats: 0,
      favorites: 0,
      views: 0,
      images: [
        'https://cdn.vox-cdn.com/thumbor/YKOpdn84C7mLzUD_QNDI9ICvMcU=/0x0:1024x555/1200x800/filters:focal(431x197:593x359)/cdn.vox-cdn.com/uploads/chorus_image/image/64145891/Switch_SuperMarioMaker2_char_artwork_copy.0.jpg',
        'https://media.wired.com/photos/5926c126af95806129f50868/master/w_2560%2Cc_limit/SuperMarioRunTA.jpg',
      ],
      title: 'user2 , item9',
      price: 40,
      free: true,
      negotiable: true,
      category: 'Sports & leisure',
      description: 'some description',
    },
    55: {
      status: 'Active',
      date: new Date(
        'Thu Mar 01 2021 20:36:28 GMT-0500 (Eastern Standard Time',
      ).toString(),
      chats: 0,
      favorites: 0,
      views: 0,
      images: [
        'https://cdn.vox-cdn.com/thumbor/YKOpdn84C7mLzUD_QNDI9ICvMcU=/0x0:1024x555/1200x800/filters:focal(431x197:593x359)/cdn.vox-cdn.com/uploads/chorus_image/image/64145891/Switch_SuperMarioMaker2_char_artwork_copy.0.jpg',
        'https://media.wired.com/photos/5926c126af95806129f50868/master/w_2560%2Cc_limit/SuperMarioRunTA.jpg',
      ],
      title: 'user2 , item5',
      price: 40,
      free: true,
      negotiable: true,
      category: 'Baby & kids',
      description: 'some description',
    },
  },
};

const favourites = {
  111: [
    {
      sellerId: 222,
      itemId: 77,
    },
    {
      sellerId: 222,
      itemId: 66,
    },
  ],
  222: [
    {
      sellerId: 111,
      itemId: 1,
    },
  ],
};

function usersReducer(state = members, action) {
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
            status: 'Active',
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
        },
      };
    case actions.STATUS_CHANGED:
      return {
        ...state,
        [action.sellerId]: {
          ...state[action.sellerId],
          [action.itemId]: {
            ...state[action.sellerId][action.itemId],
            status: action.payload.status,
          },
        },
      };
    default:
      return state;
  }
}

function favouritesReducer(state = favourites, action) {
  switch (action.type) {
    case actions.FAVOURITE_ADDED:
      return {
        ...state,
        [action.userId]: state[action.userId].concat({
          sellerId: action.payload.sellerId,
          itemId: action.payload.itemId,
        }),
      };

    case actions.FAVOURITE_REMOVED:
      return {
        ...state,
        [action.userId]: state[action.userId].filter(
          (item) => item.itemId !== action.payload.itemId,
        ),
      };
    default:
      return state;
  }
}

export default rootReducer = combineReducers({
  members: usersReducer,
  listings: listingsReducer,
  favourites: favouritesReducer,
});
