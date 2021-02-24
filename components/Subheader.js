import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SIZES, FONTS} from '../constants';

export default function Subheader({text}) {
  return (
    <View>
      <Text style={styles.subheader}>{text}</Text>
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
