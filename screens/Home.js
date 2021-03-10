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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {selectAllListings} from '../store/selectors';

export default function Home({navigation}) {
  // MOCK USER
  const userId = 111;

  const getAllListings = useMemo(selectAllListings, []);
  const allListings = useSelector((state) =>
    getAllListings(state.listings, state.members, userId),
  );

  return (
    <View style={styles.container}>
      <Header
        userId={userId}
        navigation={navigation}
        title={'Location'}
        iconButton1={'search-outline'}
        iconButton2={'filter-outline'}
        iconButton3={'notifications-outline'}
      />
      <KeyboardAwareScrollView extraHeight={0} enableOnAndroid>
        <ItemButtons
          userId={userId}
          items={allListings}
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
