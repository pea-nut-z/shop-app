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
import {filterItems} from '../../helper';

export default function Sold({items, navigation}) {
  const soldItems = filterItems(0, items, 'sold');

  return (
    <View>
      {items.length === 0 && <Text>No sold items</Text>}
      <ItemButtons items={soldItems} navigation={navigation} />
    </View>
  );
}
