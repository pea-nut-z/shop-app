import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SIZES, FONTS, COLORS} from '../constants';

export default function SellButton({navigation}) {
  return (
    <View>
      <TouchableOpacity
        style={styles.sellBtn}
        onPress={() => navigation.navigate('Sell')}>
        <Text style={styles.btnText}>+ Sell</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
