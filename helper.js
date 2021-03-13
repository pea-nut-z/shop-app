import {Category} from './screens';

export function timeSince(date) {
  //   var aDay = 24*60*60*1000;
  if (typeof date !== 'object') {
    date = new Date(date);
  }

  var seconds = Math.floor((new Date() - date) / 1000);
  var intervalType;

  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'year';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = 'hour';
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = 'minute';
          } else {
            interval = seconds;
            intervalType = 'second';
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 's';
  }

  return interval + ' ' + intervalType + ' ago';
}

//dummy
const items = [
  {
    category: 'Sports & leisure',
    chats: 0,
    date: 'Thu Feb 04 2021 20:36:28 GMT-0500 (EST)',
    description: 'yellow basketball',
    displayPic: 'https://i.ytimg.com/vi/H8X7FHrq278/maxresdefault.jpg',
    favorites: 0,
    free: true,
    images: [Array],
    itemId: 88,
    location: 'Ottawa',
    negotiable: true,
    price: 20,
    rating: 19,
    sellerId: 222,
    status: 'Sold',
    title: 'user2 , item8',
    userName: 'Test2',
    views: 0,
  },
  {
    category: 'Sports & ball',
    chats: 0,
    date: 'Sun Jan 26 2020 20:36:28 GMT-0500 (EST)',
    description: 'some description',
    displayPic: 'https://i.ytimg.com/vi/H8X7FHrq278/maxresdefault.jpg',
    favorites: 0,
    free: true,
    images: [Array],
    itemId: 77,
    location: 'Ottawa',
    negotiable: true,
    price: 10,
    rating: 19,
    sellerId: 222,
    status: 'Active',
    title: 'basket ball',
    userName: 'Test2',
    views: 0,
  },
];

// // { "furtherFilters": { "category": ["Men's fashion", "Health & beauty", "Sports & leisure"],
// // "hideSoldItems": false, "maxPrice": undefined, "minPrice": undefined, "sort": undefined } }

// // {"searchWords": ["red", "hat" ,yellow"]}
// let searchString = 'sPorts ball';
// // const searchWords = searchString.toLowerCase().split(' ');
// const searchWords = searchString.split(' ');

// // title, description, category
// const test = items.map((item) => {
//   const category = item.category.toLowerCase();
//   const description = item.description.toLowerCase();
//   const title = item.title.toLowerCase();

//   let score = 0;
//   searchWords.forEach((word) => {
//     const exp = '\\b' + word + '\\b';
//     const regex = new RegExp(exp, 'gi');

//     category.includes(word) ? ++score : score;
//     description.includes(word) ? ++score : score;
//     title.includes(word) ? ++score : score;
//   });
//   return {...item, score};
// });

// console.log({test});
// // console.log({score});
