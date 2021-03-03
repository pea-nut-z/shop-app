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

export function putItemObjsInArr(items, sellerId) {
  const arr = [];
  for (const key in items) {
    const itemId = parseInt(key);
    const item = {...items[key], itemId, sellerId};
    arr.push(item);
  }
  return arr;
}

export function filterItems(itemId, items, filter) {
  switch (filter) {
    case 'fourOtherItems':
      return items.filter((item) => item.itemId !== itemId).slice(0, 4);
    case 'all':
      return items;
    case 'active':
      return items.filter((item) => item.status === 'active');
    case 'sold':
      return items.filter((item) => item.status === 'sold');
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
}
