import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SIZES, FONTS, COLORS} from '../constants';

export default function BarButton({name}) {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>View profile</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: SIZES.width - SIZES.padding * 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.darkgray,
  },
  text: {...FONTS.h5},
});
