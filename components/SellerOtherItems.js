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
  categoryOptions,
  itemStatusOptions,
  icons,
  COLORS,
} from '../constants';

import {filterItems} from '../helper';

export default function SellerOtherItems({itemId, items, navigation}) {
  const otherItems = filterItems(itemId, items, 'fourOtherItems');

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
      {otherItems.map((item) => {
        const sellerId = item.sellerId;
        const itemId = item.itemId;
        const img = item['images'][0];
        return (
          <TouchableOpacity
            key={itemId}
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
                  source={typeof img === 'number' ? img : {uri: img}}
                  resizeMode={'contain'}
                  style={{
                    paddingVertical: SIZES.padding,
                    width: SIZES.width / 2 - SIZES.padding * 6,
                    height: SIZES.width / 2 - SIZES.padding * 6,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: COLORS.secondary,
                    backgroundColor:
                      typeof img === 'number' ? COLORS.secondary : COLORS.white,
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
              <Text style={{marginLeft: SIZES.padding * 2}}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
