import {combineReducers} from 'redux';
import * as actions from './actionTypes';
import * as helper from './reducerHelper';

// sync id to database
//actions (add, edit , delete)
const listings = {
  111: {
    userName: 'Test1',
    location: 'Toronto',
    rating: 60,
    items: {
      1: {
        status: 'active',
        date: 'some dates',
        Chats: 0,
        favorites: 0,
        views: 0,
        images: [],
        title: 'title',
        price: 1,
        free: true,
        negotiable: true,
        category: 'some category',
        description: 'some description',
      },
    },
  },
  222: {
    userName: 'Test2',
    location: 'Ottawa',
    rating: 19,
    items: {
      1: {
        status: 'sold',
        date: 'some dates',
        Chats: 0,
        favorites: 0,
        views: 0,
        images: [
          {
            id: 0,
            path:
              '/Users/paulinez/Library/Developer/CoreSimulator/Devices/810F8FF2-C4F8-4168-9895-B51220F0039E/data/Containers/Data/Application/2F28EA9E-3D22-4D2F-93B8-C5AE2C3DBEFE/tmp/react-native-image-crop-picker/3BE910BC-FE17-424D-A6FF-8972D6240F42.jpg',
          },

          {
            id: 0,
            path:
              '/Users/paulinez/Library/Developer/CoreSimulator/Devices/810F8FF2-C4F8-4168-9895-B51220F0039E/data/Containers/Data/Application/2F28EA9E-3D22-4D2F-93B8-C5AE2C3DBEFE/tmp/react-native-image-crop-picker/EDD0F14B-114A-4E3D-89A1-ADE028440355.jpg',
          },
        ],
        title: 'title',
        price: 10,
        free: true,
        negotiable: true,
        category: 'some category',
        description: 'some description',
      },
      2: {
        status: 'active',
        date: 'some dates',
        Chats: 0,
        favorites: 0,
        views: 0,
        images: [],
        title: 'title',
        price: 10,
        free: true,
        negotiable: true,
        category: 'some category',
        description: 'some description',
      },
    },
  },
};

export function listingsReducer(state = listings, action) {
  switch (action.type) {
    case actions.LIST_ADDED:
      return {
        ...state,
        [action.sellerId]: {
          ...state[action.sellerId],
          items: helper.addToListings(state[action.sellerId], action),
        },
      };
    default:
      return state;
  }
}

export default rootReducer = combineReducers({
  listings: listingsReducer,
});
