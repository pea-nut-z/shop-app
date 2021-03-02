import React from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  FlatList,
} from 'react-native';
import {
  FONTS,
  SIZES,
  categoryList,
  itemStatusDropDown,
  icons,
  COLORS,
} from '../constants';

export default function DisplaySellerOtherItems({
  sellerId,
  itemId,
  items,
  navigation,
}) {
  function renderItems() {
    const otherItems = [];
    for (const key in items) {
      const otherItemId = parseInt(key);
      // display 4 other items only
      if (otherItems.length === 4) break;
      // Skip current displayed item
      if (otherItemId === itemId) continue;

      let img = items[key]['images'][0];
      let title = items[key]['title'];
      let price = items[key]['price'];
      let category = items[key]['category'];
      let imgPath;

      // use icon as image if item doesn't have images provided
      if (!img) {
        categoryList.find((obj) => {
          if (obj.name === category) imgPath = obj.icon;
        });
      } else {
        imgPath = img['path'];
      }
      let item = {otherItemId, imgPath, title, price};
      otherItems.push(item);
    }

    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        {otherItems.map((item, index) => {
          const itemId = item.otherItemId;
          return (
            <TouchableOpacity
              key={`otherItems-${index}`}
              onPress={() => {
                navigation.navigate('itemDetails', {
                  sellerId,
                  itemId,
                });
              }}>
              <View
                style={{
                  width: SIZES.width / 2 - SIZES.padding * 2,
                  height: SIZES.width / 2,
                  backgroundColor: 'yellow',
                  justifyContent: 'center',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={
                      typeof item.imgPath === 'number'
                        ? item.imgPath
                        : {uri: item.imgPath}
                    }
                    resizeMode={'contain'}
                    style={{
                      paddingVertical: SIZES.padding,

                      width: SIZES.width / 2 - SIZES.padding * 6,
                      height: SIZES.width / 2 - SIZES.padding * 6,
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: COLORS.secondary,
                      backgroundColor:
                        typeof item.imgPath === 'number'
                          ? COLORS.secondary
                          : COLORS.white,
                    }}
                  />
                </View>

                <Text
                  style={{
                    marginLeft: SIZES.padding * 2,
                    marginVertical: SIZES.padding / 2,
                  }}>
                  {item.title}
                </Text>
                <Text style={{marginLeft: SIZES.padding * 2}}>
                  ${item.price}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return <View>{renderItems()}</View>;
}
