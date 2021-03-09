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
import {filterItems} from '../../store/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {ItemButtons} from '../../components';

export default function Sold({userId, sellerId, atUserItemsTabs, navigation}) {
  // CHECK CURRENT SCREEN
  const memberId = atUserItemsTabs ? userId : sellerId;

  // LISTINGS
  const getSoldItems = useMemo(filterItems, []);
  const soldItems = useSelector((state) =>
    getSoldItems(state, memberId, undefined, 'sold'),
  );

  console.log('ran sold');

  return (
    <View>
      {soldItems.length === 0 && <Text>No sold items</Text>}
      <ItemButtons userId={userId} items={soldItems} navigation={navigation} />
    </View>
  );
}
