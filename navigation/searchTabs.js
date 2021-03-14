import React, {useState} from 'react';
import {View, Keyboard} from 'react-native';
import {ForSale, User} from '../screens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Header} from '../components';
import {COLORS} from '../constants';
const MaterialTopTabs = createMaterialTopTabNavigator();

export default function searchTabs({route, navigation}) {
  const {userId, filters} = route.params;

  const [submittedSearchString, setSubmittedSearchString] = useState('');
  const submitSearchString = (str) => {
    setSubmittedSearchString(str);
  };

  const [searchHistoryView, setSearchHistoryView] = useState(true);
  console.log({searchHistoryView});

  const hideSearchHistory = () => {
    setSearchHistoryView(false);
    Keyboard.dismiss();
  };

  const showSearchHistory = () => {
    setSearchHistoryView(true);
  };

  return (
    <>
      <View style={{zIndex: 1}}>
        <Header
          navigation={navigation}
          submitSearchString={submitSearchString}
          showSearchHistory={showSearchHistory}
          useBackBtn={true}
          useSearchBar={true}
          useSearchHistory={searchHistoryView}
        />
      </View>
      <MaterialTopTabs.Navigator
        tabBarOptions={{indicatorStyle: {backgroundColor: COLORS.primary}}}>
        <MaterialTopTabs.Screen
          name="For Sale"
          children={() => (
            <ForSale
              userId={userId}
              navigation={navigation}
              submittedSearchString={submittedSearchString}
              hideSearchHistory={hideSearchHistory}
              filters={filters}
            />
          )}
        />
        <MaterialTopTabs.Screen
          name="User"
          children={() => (
            <User
              userId={userId}
              navigation={navigation}
              submittedSearchString={submittedSearchString}
            />
          )}
        />
      </MaterialTopTabs.Navigator>
    </>
  );
}
