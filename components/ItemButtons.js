import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';
import {icons, SIZES, FONTS, COLORS} from '../constants';
import {timeSince, getSellerAllItems} from '../helper';

import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../store/actionTypes';

export default function ItemButtons({
  items,
  navigation,
  atUserActiveItemScreen,
  atUserHiddenItemScreen,
}) {
  const dispatch = useDispatch();
  // let itemss = useSelector((state) => state['listings'][111]);
  // itemss = getSellerAllItems(items, 111);

  const getState = useSelector((state) => state['listings'][111][1]);
  console.log({getState});

  const unhidePostAlert = (sellerId, itemId) => {
    Alert.alert(
      'Post unhidden',
      '',
      [
        {
          text: 'CANCEL',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: 'UNHIDE',
          onPress: () => {
            dispatch({
              type: actions.STATUS_CHANGED,
              sellerId,
              itemId,
              payload: {
                status: 'Active',
              },
            });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View>
      {items.map((item, index) => {
        const sellerId = item.sellerId;
        const itemId = item.itemId;

        const img = item['images'][0];
        return (
          <View key={`item-${index}`}>
            <TouchableOpacity
              style={{height: 100, width: 100}}
              onPress={() =>
                navigation.navigate('itemDetails', {
                  sellerId,
                  itemId,
                })
              }>
              <Image
                source={typeof img === 'number' ? img : {uri: img}}
                resizeMode={'contain'}
                style={{
                  width: 35,
                  height: 35,
                }}
              />
              <View>
                <Text>{item.title}</Text>
                <Text>location?? • {timeSince(item.date)}</Text>
                <Text>$ {item.price}</Text>
              </View>
            </TouchableOpacity>
            {atUserActiveItemScreen && (
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: 'red',
                }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: SIZES.padding,
                  }}
                  onPress={() =>
                    dispatch({
                      type: actions.STATUS_CHANGED,
                      sellerId,
                      itemId,
                      payload: {
                        status: 'Reserved',
                      },
                    })
                  }>
                  <Text>Change to RESERVED</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{borderWidth: 1, width: '50%'}}
                  onPress={() =>
                    dispatch({
                      type: actions.STATUS_CHANGED,
                      sellerId,
                      itemId,
                      payload: {
                        status: 'Sold',
                      },
                    })
                  }>
                  <Text>Change to SOLD</Text>
                </TouchableOpacity>
              </View>
            )}
            {atUserHiddenItemScreen && (
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  // width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: SIZES.padding,
                }}
                onPress={() => unhidePostAlert(sellerId, itemId)}>
                <Text>unhide</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );
}
