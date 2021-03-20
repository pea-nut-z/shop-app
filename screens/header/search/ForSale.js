import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import {ItemCards} from '../../../components';
import {furtherFilterListings} from '../../../store/selectors';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {SIZES, COLORS} from '../../../constants';
import {useIsFocused} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function ForSale({
  userId,
  navigation,
  submittedSearchString,
  hideSearchHistory,
  toggleFilterScreen,
  hideSoldItems,
  toggleHideSoldItemsBtn,
  filters,
}) {
  const focused = useIsFocused();
  const getItems = useMemo(furtherFilterListings, []);
  const items = useSelector((state) => {
    if (focused && submittedSearchString) {
      return getItems(
        userId,
        state.listings,
        state.members,
        state.restrictions,
        state.feeds,
        'string',
        submittedSearchString,
        filters,
      );
    }
  });

  const renderFilterBtn = () => {
    let isFilterUsed = Object.values(filters);
    isFilterUsed = isFilterUsed.some(
      (value) =>
        value !== undefined &&
        value !== false &&
        value !== true &&
        value?.length !== 0 &&
        value,
    );

    return (
      <TouchableOpacity
        onPress={() => toggleFilterScreen()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 35,
          paddingHorizontal: SIZES.padding * 2,
          backgroundColor: 'yellow',
        }}>
        <Icon
          name={'funnel-outline'}
          size={20}
          color={isFilterUsed ? COLORS.primary : null}
        />
        <Text>Filter</Text>
      </TouchableOpacity>
    );
  };
  const renderHideSoldItemsBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => toggleHideSoldItemsBtn()}
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
    <View style={{backgroundColor: 'pink', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'green',
          justifyContent: 'space-between',
        }}>
        {renderFilterBtn()}
        {renderHideSoldItemsBtn()}
      </View>
      <View>{renderNoResultsMsg()}</View>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={() => hideSearchHistory()}>
        <KeyboardAwareScrollView
          style={{paddingBottom: 130, flex: 1}}
          enableOnAndroid>
          {items && (
            <ItemCards userId={userId} items={items} navigation={navigation} />
          )}
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
}
