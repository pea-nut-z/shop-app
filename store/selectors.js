import React from 'react';
import {createSelector} from 'reselect';

// select all listings excluding current user's
export const selectAllListings = () =>
  createSelector(
    (listings) => listings,
    (_, members) => members,
    (_, __, userId) => userId,
    (listings, members, userId) => {
      const arr = [];
      for (let sellerId in listings) {
        sellerId = parseInt(sellerId);
        if (sellerId === userId) continue;
        for (let itemId in listings[sellerId]) {
          itemId = parseInt(itemId);
          if (listings[sellerId][itemId]['status'] !== 'Active') continue;
          const item = {
            sellerId,
            itemId,
            ...members[sellerId],
            ...listings[sellerId][itemId],
          };
          arr.push(item);
        }
      }
      arr.sort((a, b) => new Date(a.date) < new Date(b.date));
      return arr;
    },
  );

export const filterAllListingsByCategory = (listings, members, userId) =>
  createSelector(
    selectAllListings(listings, members, userId),
    (_, members) => members,
    (_, __, userId) => userId,
    (_, __, ___, selectedCategory) => selectedCategory,
    (items, __, ___, selectedCategory) =>
      items.filter((item) => item.category === selectedCategory),
  );

export const selectMemberAllItems = () =>
  createSelector(
    (state, memberId) => state.listings[memberId],
    (_, memberId) => memberId,
    (items, memberId) => {
      const arr = [];
      for (const key in items) {
        const itemId = parseInt(key);
        const item = {...items[key], itemId, sellerId: memberId};
        arr.push(item);
      }
      arr.sort((a, b) => new Date(a.date) < new Date(b.date));
      return arr;
    },
  );

export const filterItems = (state, memberId) =>
  createSelector(
    selectMemberAllItems(state, memberId),
    (_, memberId) => memberId,
    (_, __, itemId) => itemId,
    (_, __, ___, filter) => filter,
    (items, memberId, itemId, filter) => {
      switch (filter) {
        case 'four-other-items':
          return items
            .filter(
              (item) =>
                (item.itemId !== itemId && item.status === 'Active') ||
                (item.itemId !== itemId && item.status === 'Reserved'),
            )
            .slice(0, 4);
        case 'active':
          return items.filter((item) => item.status === 'Active');
        case 'sold':
          return items.filter((item) => item.status === 'Sold');
        case 'hidden':
          return items.filter((item) => item.status === 'Hidden');
        case 'active-and-reserved':
          return items.filter(
            (item) => item.status === 'Active' || item.status === 'Reserved',
          );
        default:
          new Error(`Unknown filter: ${filter}`);
      }
    },
  );

export const selectSellersAndListingsByFav = createSelector(
  (userFavs) => userFavs,
  (userFavs, members) => userFavs.map((fav) => members[fav.sellerId]),
  (userFavs, __, listings) =>
    userFavs.map((fav) => listings[fav.sellerId][fav.itemId]),
  (userFavs, members, listings) => {
    return userFavs.map((fav, index) => ({
      ...fav,
      ...members[index],
      ...listings[index],
    }));
  },
);
