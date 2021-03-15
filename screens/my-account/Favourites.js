import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Header, ItemCards} from '../../components';
import {selectSellersAndListingsByFav} from '../../store/selectors';
import {createSelector} from 'reselect';

export default function Favourites({route, navigation}) {
  const {userId} = route.params;

  // USER'S FAVOURITES
  const favs = useSelector((state) =>
    selectSellersAndListingsByFav(
      state.favourites[userId],
      state.members,
      state.listings,
    ),
  );

  return (
    <View>
      <Header title={'Favourites'} useBackBtn={true} navigation={navigation} />
      <ItemCards
        userId={userId}
        items={favs}
        navigation={navigation}
        atUserFavouritesScreen={true}
      />
    </View>
  );
}
