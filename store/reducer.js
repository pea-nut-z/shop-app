import {combineReducers} from 'redux';
import * as actions from './actionTypes';
import {dateWithoutTime} from '../helper';
// sync id to database
//actions (add, edit , delete)
// userId -> sellerId -> itemId

// MOCK USER
const userId = 111;
const dateTime = new Date();
const members = {
  111: {
    username: 'User1',
    location: 'Toronto',
    // displayPic: 'https://i.ytimg.com/vi/H8X7FHrq278/maxresdefault.jpg',
    displayPic: 'N/A',
    joined: dateWithoutTime(),
    rating: 3,
    numOfReviews: 3,
  },
  222: {
    username: 'User2',
    location: 'Ottawa',
    displayPic: 'https://i.ytimg.com/vi/H8X7FHrq278/maxresdefault.jpg',
    // displayPic: 'N/A',
    joined: dateWithoutTime(),
    rating: 2,
    numOfReviews: 10,
  },
  333: {
    username: 'User3',
    location: 'Ottawa',
    displayPic:
      'https://ih1.redbubble.net/image.171880009.2437/flat,750x,075,f-pad,750x1000,f8f8f8.u3.jpg',
    joined: dateWithoutTime(),
    rating: 5,
    numOfReviews: 100,
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
    1: {
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
    2: {
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
    3: {
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
    4: {
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
    5: {
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
      description:
        'Fdsfiphsdpifhjspdifhspdifhsdipfohsdpfihsdfpisdhfspidfhspdifhspdifhspdifhspdifhspdifhdspifhspd’fihspdfihsdp’fhspdfhspdfhspdfhspdfhspdfhspdfhspdifhs’pdfhsdpfhsdpfshdpfhs THE END',
    },
  },
  333: {
    1: {
      status: 'Active',
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
      title: 'Hat',
      price: 400,
      free: true,
      negotiable: true,
      category: "Women's fashion",
      description: "it's a hat",
    },
    2: {
      status: 'Active',
      date: new Date(
        'Thu Jan 26 2021 20:36:28 GMT-0500 (Eastern Standard Time',
      ).toString(),
      chats: 0,
      favorites: 0,
      views: 0,
      images: [11],
      title: 'Dress',
      price: 10,
      free: true,
      negotiable: true,
      category: 'Sports & leisure',
      description: "it's a dress",
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

const blacklists = {
  111: [222],
};

const usersReducer = (state = members, action) => {
  switch (action.type) {
    case actions.USER_ADDED:
      // display pic is 'N/A'
      return state;
    case actions.USERNAME_CHANGED:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          username: action.payload.username,
        },
      };
    case actions.USER_DISPLAYPIC_CHANGED:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          displayPic: action.payload.image,
        },
      };
    // case actions.DISPLAYPIC_DELETED:
    //   return {
    //     ...state,
    //     [action.userId]: {
    //       ...state[action.userId],
    //       displayPic: '',
    //     },
    //   };
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
    case actions.ITEM_STATUS_CHANGED:
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

const blackListsReducer = (state = blacklists, action) => {
  switch (action.type) {
    case actions.BLACKLIST_ADDED:
      return {
        ...state,
        [action.userId]: [...state[action.userId], action.payload.sellerId],
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
  feeds: feedsReducer,
  blackLists: blackListsReducer,
});
