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
import {useNavigationState} from '@react-navigation/native';

export default function Active({items, navigation}) {
  const currentScreen = useNavigationState((state) => state.routes[0].name);
  const atUserActiveItemScreen = currentScreen === 'Active' ? true : false;
  return (
    <View>
      {items.length === 0 && <Text>No active items</Text>}
      <ItemButtons
        items={items}
        navigation={navigation}
        atUserActiveItemScreen={atUserActiveItemScreen}
      />
    </View>
  );
}
