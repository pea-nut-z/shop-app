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
import {filterMemberItems} from '../../store/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {ItemCards} from '../../components';

export default function Sold({userId, sellerId, atUserItemsTabs, navigation}) {
  // CHECK CURRENT SCREEN
  const memberId = atUserItemsTabs ? userId : sellerId;

  // LISTINGS
  const getSoldItems = useMemo(filterMemberItems, []);
  const soldItems = useSelector((state) =>
    getSoldItems(state, memberId, undefined, 'sold'),
  );

  console.log('ran sold');

  return (
    <View>
      {soldItems.length === 0 && <Text>No sold items</Text>}
      <ItemCards userId={userId} items={soldItems} navigation={navigation} />
    </View>
  );
}
