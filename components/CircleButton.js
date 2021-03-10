import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SIZES, FONTS, COLORS} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CircleButton({options, userId, navigation}) {
  const navigateTo = (name) => {
    switch (name) {
      case 'Listings':
        return navigation.navigate('userItemsTabs', {
          userId,
        });
      case 'Purchases':
        return navigation.navigate('Purchases', {
          userId,
        });
      case 'Favourites':
        return navigation.navigate('Favourites', {
          userId,
        });
      default:
        return;
    }
  };

  return options.map((option, index) => {
    return (
      <View key={`option-${index}`} style={styles.container}>
        <TouchableOpacity onPress={() => navigateTo(option.name)}>
          <View style={styles.alignCircle}>
            <View style={styles.circle}>
              <Icon name={option.icon} size={25} />
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
