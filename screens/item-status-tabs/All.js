import React, {useMemo} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';

import {selectMemberAllItems} from '../../store/selectors';

export default function All({userId, sellerId, atUserItemsTabs, navigation}) {
  // CHECK CURRENT SCREEN
  const memberId = atUserItemsTabs ? userId : sellerId;
  // LISTINGS
  const getAllItems = useMemo(selectMemberAllItems, []);
  const allItems = useSelector((state) => getAllItems(state, memberId));

  return (
    <View>
      <ItemButtons userId={userId} items={allItems} navigation={navigation} />
    </View>
  );
}
