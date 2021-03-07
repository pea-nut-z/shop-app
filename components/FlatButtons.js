import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {icons, SIZES, FONTS, COLORS} from '../constants';

export default function FlatButtons({options, func, navigation}) {
  return (
    <View
      style={
        {
          // alignItems: 'center',
        }
      }>
      {options.map((option, index) => {
        return (
          <TouchableOpacity
            key={`option-${index}`}
            onPress={() => func(option)}>
            <View style={styles.container}>
              {typeof option['icon'] === 'number' ? (
                <Image
                  source={option.icon}
                  resizeMode={'contain'}
                  style={{
                    width: 35,
                    height: 35,
                  }}
                />
              ) : (
                <Icon name={option['icon']} size={30} />
              )}
              <Text style={styles.text}>{option.name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    // backgroundColor: 'red',
  },
  text: {
    ...FONTS.h5,
    paddingLeft: SIZES.padding * 2,
    paddingTop: 10,
  },
});
