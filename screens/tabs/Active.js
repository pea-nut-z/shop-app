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
import {ItemButtons} from '../../components';
import {useNavigationState} from '@react-navigation/native';
import {filterItems} from '../../helper';

export default function Active({items, navigation}) {
  const currentScreen = useNavigationState((state) => state.routes[0].name);
  const atUserActiveItemScreen = currentScreen === 'Active' ? true : false;
  const activeAndReservedItems = filterItems(0, items, 'active-and-reserved');

  return (
    <View>
      {items.length === 0 && <Text>No active items</Text>}
      <ItemButtons
        items={activeAndReservedItems}
        navigation={navigation}
        atUserActiveItemScreen={atUserActiveItemScreen}
      />
    </View>
  );
}
