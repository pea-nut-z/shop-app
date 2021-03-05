import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {icons, SIZES, FONTS, COLORS} from '../constants';
import {
  Header,
  Subheader,
  HeaderButton,
  CircleButton,
  BarButton,
  FlatButtons,
} from '../components';
import {categoryOptions} from '../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function Categories({navigation}) {
  const buttonFunc = (option) => {
    navigation.navigate('Category', {
      selectedCategory: option.name,
    });
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView enableOnAndroid>
        <Header text={'Categories'} />
        {/* <View style={styles.headerButtons}>
        <HeaderButton iconSrc={icons.search} />
      </View> */}
        <FlatButtons
          options={categoryOptions}
          func={buttonFunc}
          navigation={navigation}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerButtons: {
    position: 'absolute',
    top: SIZES.height * 0.07,
    right: SIZES.padding * 2,
  },

  subHeader: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    ...FONTS.h4,
    fontWeight: 'bold',
  },
  // categories: {
  //   flexDirection: 'row',
  //   paddingVertical: SIZES.padding,
  //   paddingHorizontal: SIZES.padding * 2,
  // },
  // categoryText: {
  //   ...FONTS.h5,
  //   paddingLeft: SIZES.padding * 2,
  //   paddingTop: 10,
  // },
});
