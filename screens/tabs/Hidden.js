import React, {useEffect} from 'react';
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
import {filterItems} from '../../helper';
import {useDispatch, useSelector} from 'react-redux';

export default function Hidden({items, navigation}) {
  const hiddenItems = filterItems(0, items, 'hidden');

  return (
    <View>
      {items.length === 0 && <Text>No hidden items</Text>}
      <ItemButtons
        // items={items}
        items={hiddenItems}
        navigation={navigation}
        atUserHiddenItemScreen={true}
      />
    </View>
  );
}
