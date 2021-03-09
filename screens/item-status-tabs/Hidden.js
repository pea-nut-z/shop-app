import React, {useEffect, useMemo} from 'react';
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

export default function Hidden({userId, navigation}) {
  // USER'S LISTINGS
  const getHiddenItems = useMemo(filterItems, []);
  const hiddenItems = useSelector((state) =>
    getHiddenItems(state, userId, undefined, 'hidden'),
  );
  console.log('ran hidden');

  return (
    <View>
      {hiddenItems.length === 0 && <Text>No hidden items</Text>}
      <ItemButtons
        userId={userId}
        items={hiddenItems}
        navigation={navigation}
        atUserHiddenItemsScreen={true}
      />
    </View>
  );
}
