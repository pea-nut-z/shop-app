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
  const navigateTo = (option) => {
    navigation.navigate('Category', {
      selectedCategory: option.name,
    });
  };

  return (
    <View style={{flex: 1}}>
      <Header
        navigation={navigation}
        title={'Categories'}
        iconButton1={'search-outline'}
        iconButton2={'notifications-outline'}
      />
      <KeyboardAwareScrollView style={{paddingBottom: 130}} enableOnAndroid>
        <View style={{paddingBottom: 30}}>
          <Text style={styles.subheader}>For Sale</Text>

          <FlatButtons
            options={categoryOptions}
            navigateTo={navigateTo}
            navigation={navigation}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  subheader: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    ...FONTS.h4,
  },
});
