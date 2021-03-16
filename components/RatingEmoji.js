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
  const emojiName =
    rating < 20 ? icons.unamused : rating > 50 ? icons.excited : icons.happy;

  return (
    <View>
      <Image
        source={emojiName}
        resizeMode="contain"
        style={{
          width: 25,
          height: 25,
        }}
      />
    </View>
  );
}
