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
import {ListButtons} from '../../components';

export default function All({items, navigation}) {
  return (
    <View>
      <Text>All Tab</Text>
      <ListButtons items={items} navigation={navigation} />
    </View>
  );
}
