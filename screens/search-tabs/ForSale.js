import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ItemCards} from '../../components';
import {filterSearchedListings} from '../../store/selectors';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {SIZES, COLORS} from '../../constants';
import {useIsFocused} from '@react-navigation/native';

export default function ForSale({userId, navigation, submittedSearchString}) {
  const [filterScreen, renderFilterScreen] = useState(false);
  const [moreFilters, setMorefilters] = useState(false);
  const [hideSoldItems, setHideSoldItems] = useState(false);
  const focused = useIsFocused();

  const getItems = useMemo(filterSearchedListings, []);
  const items = useSelector((state) => {
    if (focused && submittedSearchString) {
      if (hideSoldItems) {
        return getItems(
          state.listings,
          state.members,
          userId,
          'string',
          submittedSearchString,
          'sold-items',
        );
      }

      return getItems(
        state.listings,
        state.members,
        userId,
        'string',
        submittedSearchString,
      );
    }
  });

  const renderMoreFiltersBtn = () => {
    return (
      <TouchableOpacity
        onPress={
          () => navigation.navigate('Filters')
          // renderFilterScreen(true)
        }
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 35,
          paddingHorizontal: SIZES.padding * 2,
          backgroundColor: 'yellow',
        }}>
        <Icon name={'filter'} size={20} />
        <Text>Filter</Text>
      </TouchableOpacity>
    );
  };
  const renderHideSoldItemsBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => setHideSoldItems(!hideSoldItems)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 35,
          paddingHorizontal: SIZES.padding * 2,
          // backgroundColor: 'red',
        }}>
        <Icon
          name="checkmark-circle-outline"
          size={25}
          color={hideSoldItems ? COLORS.primary : COLORS.secondary}
        />
        <Text>Hide sold items</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {!filterScreen && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'green',
              justifyContent: 'space-between',
            }}>
            {renderMoreFiltersBtn()}
            {renderHideSoldItemsBtn()}
          </View>
          <View>
            {items && (
              <ItemCards
                userId={userId}
                items={items}
                navigation={navigation}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
}
