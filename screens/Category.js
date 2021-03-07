import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {allSellersItems} from '../store/reducer';
import {filterItems} from '../helper';
import {ItemButtons} from '../components';

export default function Category({route, navigation}) {
  const {selectedCategory} = route.params;
  const itemsByCategory = filterItems(
    0,
    allSellersItems,
    'get-category',
    selectedCategory,
  );
  return (
    <SafeAreaView>
      <ItemButtons items={itemsByCategory} navigation={navigation} />
    </SafeAreaView>
  );
}
