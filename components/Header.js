import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SIZES, FONTS, COLORS} from '../constants';

export default function Header({text}) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderWidth: 1,
    borderColor: COLORS.transparent,
    borderBottomColor: COLORS.secondary,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    ...FONTS.h3,
    paddingTop: 10,
  },
});
