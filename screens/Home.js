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
import {Header, HeaderButton, SellButton, ItemCards} from '../components';

import {useDispatch, useSelector} from 'react-redux';
import {createSelector} from 'reselect';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {filterListings} from '../store/selectors';

export default function Home({navigation}) {
  // MOCK USER
  const userId = 111;

  const getActiveListings = useMemo(filterListings, []);
  const activeListings = useSelector((state) =>
    getActiveListings(state.listings, state.members, userId, 'active'),
  );

  return (
    <View style={styles.container}>
      <Header
        userId={userId}
        navigation={navigation}
        title={'Location'}
        RightButtons={['search-outline', 'filter', 'notifications-outline']}
      />
      <KeyboardAwareScrollView extraHeight={0} enableOnAndroid>
        <ItemCards
          userId={userId}
          items={activeListings}
          navigation={navigation}
        />

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
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: COLORS.lightGray3,
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
