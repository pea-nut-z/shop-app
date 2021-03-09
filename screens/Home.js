import React, {useMemo} from 'react';
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
import {createSelector} from 'reselect';

import {selectAllListings} from '../store/selectors';

export default function Home({navigation}) {
  // MOCK USER
  const userId = 111;

  const getSellersItems = useMemo(selectAllListings, []);
  const sellersItems = useSelector((state) =>
    getSellersItems(state.listings, state.members, userId),
  );

  // const sellersItems = useSelector((state) =>
  //   selectAllListings(state.listings, state.members, userId),
  // );

  return (
    <SafeAreaView style={styles.container}>
      <ItemButtons
        userId={userId}
        items={sellersItems}
        navigation={navigation}
      />
      {/* <SellButton userId={userId} navigation={navigation} /> */}

      {/* SELL BUTTON */}
      <View>
        <TouchableOpacity
          style={styles.sellBtn}
          onPress={() =>
            navigation.navigate('Sell', {
              userId,
            })
          }>
          <Text style={styles.btnText}>+ Sell</Text>
        </TouchableOpacity>
      </View>
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
  sellBtn: {
    position: 'absolute',
    bottom: SIZES.height * 0.08,
    right: SIZES.width * 0.04,
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 25,
  },
  btnText: {color: COLORS.white, ...FONTS.body2},
});
