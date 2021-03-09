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
import Icon from 'react-native-vector-icons/Ionicons';
import {timeSince} from '../helper';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../store/actionTypes';

export default function ItemButtons({
  userId,
  items,
  navigation,
  atUserActiveItemsScreen,
  atUserHiddenItemsScreen,
  atUserFavouritesScreen,
}) {
  const dispatch = useDispatch();

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
        const status = item.status;

        const img = item['images'][0];
        return (
          <View key={`item-${index}`}>
            <TouchableOpacity
              style={{height: 120, backgroundColor: 'pink'}}
              onPress={() =>
                navigation.navigate('itemDetails', {
                  userId,
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
                <Text>
                  {item.location} • {timeSince(item.date)}
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: 'red',
                  }}>
                  {status === 'Reserved' && (
                    <View
                      style={{
                        // padding: SIZES.padding,
                        height: 20,
                        width: 70,
                        backgroundColor: 'green',
                        // flex: 1,
                      }}>
                      <Text style={{color: 'white'}}>Reserved</Text>
                    </View>
                  )}
                  <View style={{height: 20, width: 70}}>
                    <Text>$ {item.price}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* IF ON USER ACTIVE ITEMS SCREEN */}
            {atUserActiveItemsScreen && (
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
                        status: status === 'Reserved' ? 'Active' : 'Reserved',
                      },
                    })
                  }>
                  <Text>
                    {status === 'Reserved'
                      ? 'Change to ACTIVE'
                      : 'Change to RESERVED'}
                  </Text>
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

            {/* IF ON USER HIDDEN ITEMS SCREEN */}
            {atUserHiddenItemsScreen && (
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

            {/* IF ON USER FAVOURITES SCREEN */}
            {atUserFavouritesScreen && (
              <TouchableOpacity
                onPress={() => {
                  dispatch({
                    type: actions.FAVOURITE_REMOVED,
                    userId,
                    payload: {
                      sellerId,
                      itemId,
                    },
                  });
                }}>
                <Icon name={'heart'} size={30} color={COLORS.primary} />
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );
}
