import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ItemCards} from '../../components';
import {furtherFilterListings} from '../../store/selectors';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {SIZES, COLORS} from '../../constants';
import {useIsFocused} from '@react-navigation/native';

export default function ForSale({
  userId,
  navigation,
  submittedSearchString,
  filters,
}) {
  const [hideSoldItems, setHideSoldItems] = useState(false);
  const focused = useIsFocused();
  filters = {...filters, hideSoldItems}; // add one more to filters

  const getItems = useMemo(furtherFilterListings, []);
  const items = useSelector((state) => {
    if (focused && submittedSearchString) {
      return getItems(
        state.listings,
        state.members,
        userId,
        'string',
        submittedSearchString,
        filters,
      );
    }
  });
  console.log({items});

  const renderMoreFiltersBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Filters')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 35,
          paddingHorizontal: SIZES.padding * 2,
          backgroundColor: 'yellow',
        }}>
        <Icon name={'funnel-outline'} size={20} />
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

  const renderNoResultsMsg = () => {
    if (focused && submittedSearchString && !items) {
      return (
        <View>
          <Text>No results</Text>
          <View style={{backgroundColor: COLORS.secondary}}>
            <Text>Tips</Text>
            <Text>
              •Make sure your keyword was entered correctly.{'\n'}
              •Search in more general terms, e.g. bag instead of red bag.{'\n'}
              •Add search alerts and get notified of new listings.
            </Text>
          </View>
        </View>
      );
    }
  };

  return (
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
      <View>{renderNoResultsMsg()}</View>
      <View>
        {items && (
          <View>
            <ItemCards userId={userId} items={items} navigation={navigation} />
          </View>
        )}
      </View>
    </View>
  );
}
