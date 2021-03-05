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

export function getSellerAllItems(items, sellerId) {
  const arr = [];
  for (const key in items) {
    const itemId = parseInt(key);
    const item = {...items[key], itemId, sellerId};
    arr.push(item);
  }
  arr.sort((a, b) => new Date(a.date) < new Date(b.date));
  return arr;
}

export function getAllSellersItems(sellers, listings) {
  const arr = [];
  for (let sellerId in listings) {
    sellerId = parseInt(sellerId);
    for (let itemId in listings[sellerId]) {
      itemId = parseInt(itemId);
      const item = {
        sellerId,
        itemId,
        ...sellers[sellerId],
        ...listings[sellerId][itemId],
      };
      arr.push(item);
    }
  }
  arr.sort((a, b) => new Date(a.date) < new Date(b.date));
  return arr;
}

export function filterItems(itemId, items, filter, selectedCategory) {
  switch (filter) {
    case 'fourOtherItems':
      return items.filter((item) => item.itemId !== itemId).slice(0, 4);
    case 'active':
      return items.filter((item) => item.status === 'Active');
    case 'sold':
      return items.filter((item) => item.status === 'Sold');
    case 'hidden':
      return items.filter((item) => item.status === 'Hidden');
    case 'getCategory':
      return items.filter((item) => item.category === selectedCategory);
    default:
      new Error(`Unknown filter: ${filter}`);
  }
}
