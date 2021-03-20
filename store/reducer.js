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
    // displayPic: 'https://i.ytimg.com/vi/H8X7FHrq278/maxresdefault.jpg',
    displayPic: 'N/A',
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
      status: 'Hidden',
      date: new Date(
        'Thu Feb 04 2021 20:36:28 GMT-0500 (Eastern Standard Time',
      ).toString(),
      chats: 0,
      favourites: 0,
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
      status: 'Active',
      date: new Date(
        'Thu Feb 04 2021 20:36:28 GMT-0500 (Eastern Standard Time',
      ).toString(),
      chats: 0,
      favourites: 0,
      views: 0,
      images: [11],
      title: "user1's product",
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
      favourites: 0,
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
      favourites: 0,
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
      favourites: 0,
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
      favourites: 0,
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
      favourites: 0,
      views: 0,
      images: [
        'https://cdn.vox-cdn.com/thumbor/YKOpdn84C7mLzUD_QNDI9ICvMcU=/0x0:1024x555/1200x800/filters:focal(431x197:593x359)/cdn.vox-cdn.com/uploads/chorus_image/image/64145891/Switch_SuperMarioMaker2_char_artwork_copy.0.jpg',
        'https://media.wired.com/photos/5926c126af95806129f50868/master/w_2560%2Cc_limit/SuperMarioRunTA.jpg',
      ],
      title: 'bye',
      price: 40,
      free: true,
      negotiable: false,
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
      favourites: 0,
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
      status: 'Sold',
      date: new Date(
        'Thu Jan 26 2021 20:36:28 GMT-0500 (Eastern Standard Time',
      ).toString(),
      chats: 0,
      favourites: 0,
      views: 0,
      images: [11],
      title: 'hat',
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
      itemId: 1,
    },
    {
      sellerId: 222,
      itemId: 2,
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

const restrictions = {
  111: {
    block: [],
    blockedBy: [],
    hide: [],
  },
  333: {
    block: [111],
    blockedBy: [],
    hide: [],
  },
  222: {
    block: [],
    blockedBy: [111],
    hide: [],
  },
};

const usersReducer = (state = members, action) => {
  const {userId, username, image} = action;

  switch (action.type) {
    case actions.USER_ADDED:
      // display pic is 'N/A'
      return state;
    case actions.USERNAME_CHANGED:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          username: username,
        },
      };
    case actions.USER_DISPLAYPIC_CHANGED:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          displayPic: image,
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
  // console.log('action', action.type);
  const {
    userId,
    sellerId,
    itemId,
    images,
    title,
    price,
    free,
    negotiable,
    category,
    description,
    status,
  } = action;

  switch (action.type) {
    case actions.ITEM_ADDED:
      return {
        ...state,
        [sellerId]: {
          ...state[sellerId],
          [itemId]: {
            status: 'Active',
            date: new Date().toString(),
            chats: 0,
            favourites: 0,
            views: 0,
            images: images,
            title: title,
            price: price,
            free: free,
            negotiable: negotiable,
            category: category,
            description: description,
          },
        },
      };
    case actions.ITEM_STATUS_CHANGED:
      return {
        ...state,
        [sellerId]: {
          ...state[sellerId],
          [itemId]: {
            ...state[sellerId][itemId],
            status: status,
          },
        },
      };
    case actions.FAVOURITE_ADDED:
      return {
        ...state,
        [sellerId]: {
          ...state[sellerId],
          [itemId]: {
            ...state[sellerId][itemId],
            favourites: ++state[sellerId][itemId]['favourites'],
          },
        },
      };
    case actions.FAVOURITE_REMOVED:
      return {
        ...state,
        [sellerId]: {
          ...state[sellerId],
          [itemId]: {
            ...state[sellerId][itemId],
            favourites: --state[sellerId][itemId]['favourites'],
          },
        },
      };
    case actions.ITEM_VIEW_INCREMENTED:
      return {
        ...state,
        [sellerId]: {
          ...state[sellerId],
          [itemId]: {
            ...state[sellerId][itemId],
            views: ++state[sellerId][itemId]['views'],
          },
        },
      };
    default:
      return state;
  }
};

const favouritesReducer = (state = favourites, action) => {
  const {userId, sellerId, itemId} = action;

  switch (action.type) {
    case actions.FAVOURITE_ADDED:
      return {
        ...state,
        [userId]: state[userId].concat({
          sellerId: sellerId,
          itemId: itemId,
        }),
      };

    case actions.FAVOURITE_REMOVED:
      return {
        ...state,
        [userId]: state[userId].filter((item) => item.itemId !== itemId),
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
  const {userId, feed} = action;
  switch (action.type) {
    case actions.FEED_ADDED:
      return {
        ...state,
        [userId]: [...state[userId], feed],
      };
    case actions.FEED_REMOVED:
      return {
        ...state,
        [userId]: state[userId].filter((item) => item !== feed),
      };
    default:
      return state;
  }
};

const restrictionsReducer = (state = restrictions, action) => {
  const {userId, sellerId} = action;

  switch (action.type) {
    case actions.BLOCK_ADDED:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          block: [...state[userId]['block'], sellerId],
        },

        [sellerId]: {
          ...state[sellerId],
          blockedBy: [...state[sellerId]['blockedBy'], userId],
        },
      };

    case actions.BLOCK_REMOVED:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          block: state[userId]['block'].filter((id) => id !== sellerId),
        },
        [sellerId]: {
          ...state[sellerId],
          blockedBy: state[sellerId]['blockedBy'].filter((id) => id !== userId),
        },
      };

    case actions.HIDE_ADDED:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          hide: [...state[userId]['hide'], sellerId],
        },
      };
    case actions.HIDE_REMOVED:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          hide: state[userId]['hide'].filter((id) => id !== sellerId),
        },
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
  restrictions: restrictionsReducer,
});
