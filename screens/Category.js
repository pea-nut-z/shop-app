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
import {
  icons,
  SIZES,
  FONTS,
  COLORS,
  viewOptions,
  locationOptions,
  infoOptions,
} from '../constants';
import {filterAllListingsByCategory} from '../store/selectors';
import {Header, ItemButtons} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';

export default function Category({route, navigation}) {
  // MOCK USERID
  const userId = 111;
  const {selectedCategory} = route.params;
  const getItemsByCategory = useMemo(filterAllListingsByCategory, []);
  const itemsByCategory = useSelector((state) =>
    getItemsByCategory(state.listings, state.members, userId, selectedCategory),
  );
  console.log({itemsByCategory});

  return (
    <View
      style={{
        flex: 1,
      }}>
      {/* HEADER */}
      <Header
        navigation={navigation}
        title={selectedCategory}
        backBtnNeeded={true}
        iconButton1={'search-outline'}
      />

      <KeyboardAwareScrollView extraHeight={0} enableOnAndroid>
        {itemsByCategory.length === 0 ? (
          <Text>Oops, no listings under this category.</Text>
        ) : (
          <ItemButtons
            userId={userId}
            items={itemsByCategory}
            navigation={navigation}
          />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}
