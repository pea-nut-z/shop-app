import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  FONTS,
  SIZES,
  categoryOptions,
  itemStatusOptions,
  COLORS,
} from '../constants';

export default function MemberInfo({picture, name, location, id}) {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      {picture !== 'N/A' ? (
        <Image
          source={{uri: picture}}
          resizeMode={'contain'}
          style={{
            width: 110,
            height: 110,
            borderWidth: 1,
            borderColor: COLORS.secondary,
            borderRadius: 100,
          }}
        />
      ) : (
        <Icon
          name={'person-circle-outline'}
          size={110}
          color={COLORS.secondary}
        />
      )}

      <Text style={styles.boldText}>
        {name} • {location}
        {id && ` • #${id}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  boldText: {
    ...FONTS.h4,
    textAlign: 'center',
  },
  regularText: {
    ...FONTS.body3,
    textAlign: 'center',
  },
});
