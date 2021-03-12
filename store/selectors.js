import React from 'react';
import {createSelector} from 'reselect';

// ALL MEMBERS - LISTINGS excluding current user's

export const selectListings = () =>
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

export const filterListings = (listings, members, userId) =>
  createSelector(
    selectListings(listings, members, userId),
    (_, members) => members,
    (_, __, userId) => userId,
    (_, __, ___, filter) => filter,
    (_, __, ___, ____, value) => value,
    (items, __, ___, filter, value) => {
      switch (filter) {
        case 'active':
          return items.filter((item) => item.status === 'Active');
        case 'category':
          return items.filter(
            (item) => item.category === value && item.status === 'Active',
          );
        case 'string':
          return items.filter((item) => {
            const string = value.trim();
            const regex = new RegExp(string, 'gi');
            return (
              item.title.match(regex) ||
              item.description.match(regex) ||
              item.category.match(regex)
            );
          });
        default:
          new Error(`Unknown filter: ${filter}`);
      }
    },
  );

export const filterSearchedListings = (
  listings,
  members,
  userId,
  filter1,
  value,
) =>
  createSelector(
    filterListings(listings, members, userId, filter1, value),
    (_, members) => members,
    (_, __, userId) => userId,
    (_, __, ___, filter1) => filter1,
    (_, __, ___, ____, value) => value,
    (_, __, ___, ____, _____, filter2) => filter2,
    (items, __, ___, ____, _____, filter2) => {
      switch (filter2) {
        case 'sold-items':
          return items.filter((item) => item.status !== 'Sold');
        default:
          return items;
      }
    },
  );

export const selectMembers = () =>
  createSelector(
    (state) => state.members,
    (members) => {
      const arr = [];
      for (let memberId in members) {
        // memberId = parseInt(memberId);
        const member = {
          memberId,
          ...members[memberId],
        };
        arr.push(member);
      }
      return arr;
    },
  );

export const filterMembers = (state) =>
  createSelector(
    selectMembers(state),
    (_, filter) => filter,
    (_, __, value) => value,
    (members, filter, value) => {
      switch (filter) {
        case 'string':
          return members.filter((member) => {
            const string = value.trim();
            const regex = new RegExp(string, 'gi');
            return member.memberId.match(regex) || member.userName.match(regex);
          });
        default:
          new Error(`Unknown filter: ${filter}`);
      }
    },
  );

// INDIVIDUAL MEMBER - ITEMS
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

export const filterMemberItems = (state, memberId) =>
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

// FAVOURITES
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
