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
    displayPic: 'https://i.ytimg.com/vi/H8X7FHrq278/maxresdefault.jpg',
    rating: 60,
  },
  222: {
    userName: 'Test2',
    location: 'Ottawa',
    displayPic: 'https://i.ytimg.com/vi/H8X7FHrq278/maxresdefault.jpg',
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
      title: 'women sweater',
      price: 400,
      free: true,
      negotiable: true,
      category: "Women's fashion",
      description: 'some description',
    },
    77: {
      status: 'Active',
      date: new Date(
        'Thu Jan 26 2021 20:36:28 GMT-0500 (Eastern Standard Time',
      ).toString(),
      chats: 0,
      favorites: 0,
      views: 0,
      images: [11],
      title: "women's basketball",
      price: 10,
      free: true,
      negotiable: true,
      category: 'Sports & leisure',
      description: 'some description',
    },
    88: {
      status: 'Sold',
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
      title: "women's ball",
      price: 20,
      free: true,
      negotiable: true,
      category: 'Sports & leisure',
      description: 'yellow basketball',
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
      title: "Men's sweater",
      price: 19,
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
      title: 'bye',
      price: 40,
      free: true,
      negotiable: true,
      category: 'Baby & kids',
      description: 'cans',
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

const feeds = {
  111: [
    'Electronics',
    'Furniture',
    'Home, garden & DIY',
    'Baby & kids',
    "Women's fashion",
    "Men's fashion",
    'Health & beauty',
    'Sports & leisure',
    'Games, hobbies & crafts',
    'Books, music & tickets',
    'Pets stuff',
    'Musical instruments',
    'Vehicles & parts',
    'Other',
    'Wanted',
  ],
  222: ['Electronics'],
};

const usersReducer = (state = members, action) => {
  switch (action.type) {
    case actions.USER_ADDED:
      return state;
    default:
      return state;
  }
};

const listingsReducer = (state = listings, action) => {
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
};

const favouritesReducer = (state = favourites, action) => {
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
};

const feedsReducer = (state = feeds, action) => {
  const initialFeed = [
    'Electronics',
    'Furniture',
    'Home, garden & DIY',
    'Baby & kids',
    "Women's fashion",
    "Men's fashion",
    'Health & beauty',
    'Sports & leisure',
    'Games, hobbies & crafts',
    'Books, music & tickets',
    'Pets stuff',
    'Musical instruments',
    'Vehicles & parts',
    'Other',
    'Wanted',
  ];
  switch (action.type) {
    case actions.FEED_ADDED:
      return {
        ...state,
        [action.userId]: [...state[action.userId], action.payload.feed],
      };
    case actions.FEED_REMOVED:
      return {
        ...state,
        [action.userId]: state[action.userId].filter(
          (item) => item !== action.payload.feed,
        ),
      };
    default:
      return state;
  }
};
export default rootReducer = combineReducers({
  members: usersReducer,
  listings: listingsReducer,
  favourites: favouritesReducer,
  feeds: feedsReducer,
});
