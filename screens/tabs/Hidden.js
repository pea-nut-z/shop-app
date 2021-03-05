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

export default function Hidden({items, navigation}) {
  return (
    <View>
      {items.length === 0 && <Text>No hidden items</Text>}
      <ItemButtons
        items={items}
        navigation={navigation}
        atUserHiddenItemScreen={true}
      />
    </View>
  );
}
