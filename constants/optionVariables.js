import {icons} from '.';

export const recordList = [
  {
    icon: icons.listings,
    name: 'Listings',
  },
  {
    icon: icons.bag,
    name: 'Purchases',
  },
  {
    icon: icons.heart,
    name: 'Favourites',
  },
];

export const categoryList = [
  {
    name: 'Electronics',
    icon: icons.electronics,
  },
  {
    name: 'Furniture',
    icon: icons.furniture,
  },
  {
    name: 'Home, garden & DIY',
    icon: icons.garden,
  },
  {
    name: 'Baby & kids',
    icon: icons.baby,
  },
  {
    name: "Women's fashion",
    icon: icons.womenFashion,
  },
  {
    name: "Men's fashion",
    icon: icons.menFashion,
  },
  {
    name: 'Health & beauty',
    icon: icons.beauty,
  },
  {
    name: 'Sports & leisure',
    icon: icons.sports,
  },
  {
    name: 'Games, hobbies & crafts',
    icon: icons.games,
  },
  {
    name: 'Books, music & tickets',
    icon: icons.books,
  },
  {
    name: 'Pets stuff',
    icon: icons.pets,
  },
  {
    name: 'Musical instruments',
    icon: icons.musical,
  },
  {
    name: 'Vehicles & parts',
    icon: icons.vehicles,
  },
  {
    name: 'Other',
    icon: icons.other,
  },
  {
    name: 'Wanted',
    icon: icons.wanted,
  },
];

export const categoryDropDown = categoryList.map((category) => ({
  label: category.name,
  value: category.name,
}));

export const itemStatusDropDown = [
  {
    label: 'Active',
    value: 'Active',
  },
  {
    label: 'Reserved',
    value: 'Reserved',
  },
  {
    label: 'Sold',
    value: 'Sold',
  },
];
