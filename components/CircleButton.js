import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {SIZES, FONTS, COLORS} from '../constants';

export default function CircleButton({iconSrc, name}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.alignCircle}>
          <View style={styles.circle}>
            <Image
              source={iconSrc}
              resizeMode={'contain'}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </View>
        </View>
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZES.width / 3,
  },
  alignCircle: {
    alignItems: 'center',
  },
  circle: {
    width: 45,
    height: 45,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SIZES.padding,
  },
  name: {
    ...FONTS.h5,
  },
});
