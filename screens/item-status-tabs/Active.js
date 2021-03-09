import React, {useMemo} from 'react';
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
import {ItemButtons} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {filterItems} from '../../store/selectors';

export default function Active({
  userId,
  sellerId,
  atUserItemsTabs,
  navigation,
}) {
  // CHECK CURRENT SCREEN
  const memberId = atUserItemsTabs ? userId : sellerId;

  // LISTINGS
  const getActiveItems = useMemo(filterItems, []);
  const activeAndReservedItems = useSelector((state) =>
    getActiveItems(state, memberId, undefined, 'active-and-reserved'),
  );

  // console.log('ran active');

  return (
    <View>
      {activeAndReservedItems.length === 0 && <Text>No active items</Text>}
      <ItemButtons
        userId={userId}
        items={activeAndReservedItems}
        navigation={navigation}
        atUserActiveItemsScreen={atUserItemsTabs}
      />
    </View>
  );
}
