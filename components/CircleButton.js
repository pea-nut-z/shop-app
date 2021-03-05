import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {SIZES, FONTS, COLORS} from '../constants';

// export default function CircleButton({iconSrc, name}) {
export default function CircleButton({options, func, navigation}) {
  return options.map((option, index) => {
    return (
      <View key={`option-${index}`} style={styles.container}>
        <TouchableOpacity onPress={() => func(option['name'])}>
          <View style={styles.alignCircle}>
            <View style={styles.circle}>
              <Image
                source={option.icon}
                resizeMode={'contain'}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
          </View>
          <Text style={styles.text}>{option.name}</Text>
        </TouchableOpacity>
      </View>
    );
  });
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
  text: {
    ...FONTS.h5,
  },
});
