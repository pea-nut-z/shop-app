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
import {ItemButtons} from '../../components';

export default function Sold({items, navigation}) {
  return (
    <View>
      <Text>Sold Tab</Text>
      <ItemButtons items={items} navigation={navigation} />
    </View>
  );
}
