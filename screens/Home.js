import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {
  COLORS,
  icons,
  // images,
  SIZES,
  FONTS,
} from '../constants';
import {Header, HeaderButton, SellButton, ItemButtons} from '../components';

import {useDispatch, useSelector} from 'react-redux';
import {allSellersItems} from '../store/reducer';
import {filterItems} from '../helper';

export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ItemButtons items={allSellersItems} navigation={navigation} />
      <SellButton navigation={navigation} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray3,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});
