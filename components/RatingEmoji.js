import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  FlatList,
} from 'react-native';
import {icons} from '../constants';
export default function RatingEmoji({rating}) {
  return (
    <View>
      {rating > 50 && (
        <Image
          source={icons.excited}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
          }}
        />
      )}
      {rating < 20 && (
        <Image
          source={icons.unamused}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
          }}
        />
      )}
      {
        <Image
          source={icons.happy}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
          }}
        />
      }
    </View>
  );
}
