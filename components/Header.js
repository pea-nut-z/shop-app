import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {SIZES, FONTS, COLORS} from '../constants';
import {BackButton, ImageScrollView, ScrollViewDots} from './index';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header({navigation, images, text}) {
  function renderBackBtn(navigation) {
    return (
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back-outline"
          size={25}
          color={images ? COLORS.white : COLORS.black}
        />
      </TouchableOpacity>
    );
  }
  return (
    <SafeAreaView>
      <View style={images ? styles.headerWithImg : styles.headerWithoutImg}>
        {/* BACK BUTTON */}
        {navigation && renderBackBtn(navigation)}

        {/* TEXT*/}
        {text && (
          <Text
            style={{
              ...styles.text,
              marginLeft: navigation ? SIZES.padding : 0,
            }}>
            {text}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWithoutImg: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderWidth: 1,
    borderColor: COLORS.transparent,
    borderBottomColor: COLORS.secondary,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerWithImg: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.transparent,
  },
  backBtn: {
    width: 35,
    height: 35,
    justifyContent: 'center',
  },
  text: {
    ...FONTS.h3,
  },
});
