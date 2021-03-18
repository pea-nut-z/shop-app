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
import {ItemCards} from '../../components';
import {useDispatch, useSelector} from 'react-redux';

import {selectMemberAllItems} from '../../store/selectors';

export default function AllItems({
  userId,
  sellerId,
  atUserItemsTabs,
  navigation,
}) {
  // CHECK CURRENT SCREEN
  const memberId = atUserItemsTabs ? userId : sellerId;
  // LISTINGS
  const getMemberAllItems = useMemo(selectMemberAllItems, []);
  const memberAllItems = useSelector((state) =>
    getMemberAllItems(state, memberId),
  );

  return (
    <View>
      <ItemCards
        userId={userId}
        items={memberAllItems}
        navigation={navigation}
      />
    </View>
  );
}
