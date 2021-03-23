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
} from '../../constants';
import {selectListings, filterListings} from '../../store/selectors';
import {Header, ItemCards} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';

export default function Category({route, navigation}) {
  const {userId, selectedCategory} = route.params;
  const getItemsByCategory = useMemo(filterListings, []);
  const itemsByCategory = useSelector((state) =>
    getItemsByCategory(
      userId,
      state.listings,
      state.members,
      state.restrictions,
      state.feeds,
      'category',
      selectedCategory,
    ),
  );

  return (
    <View style={{flex: 1}}>
      <Header
        navigation={navigation}
        title={selectedCategory}
        useBackBtn={true}
        useRightBtns={['search-outline', 'notifications-outline']}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={
          itemsByCategory.length === 0 ? styles.noItemsContainer : null
        }
        enableOnAndroid>
        {itemsByCategory.length === 0 ? (
          <Text style={{color: COLORS.secondary, ...FONTS.body2}}>
            Oops, no listings under this category.
          </Text>
        ) : (
          <ItemCards
            userId={userId}
            items={itemsByCategory}
            navigation={navigation}
          />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
