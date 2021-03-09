import React, {useMemo} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {allSellersItems} from '../store/reducer';
import {filterAllListingsByCategory} from '../store/selectors';
import {ItemButtons} from '../components';
import {useDispatch, useSelector} from 'react-redux';

export default function Category({route, navigation}) {
  // MOCK USERID
  const userId = 111;
  const {selectedCategory} = route.params;
  const getItemsByCategory = useMemo(filterAllListingsByCategory, []);
  const itemsByCategory = useSelector((state) =>
    getItemsByCategory(state.listings, state.members, userId, selectedCategory),
  );
  return (
    <SafeAreaView>
      <ItemButtons
        userId={userId}
        items={itemsByCategory}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}
