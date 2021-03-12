import React, {useState} from 'react';
import {View} from 'react-native';
import {ForSale, User} from '../screens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Header} from '../components';
import {COLORS} from '../constants';
const MaterialTopTabs = createMaterialTopTabNavigator();

export default function searchTabs({route, navigation}) {
  const {userId} = route.params;

  const [submittedSearchString, setSubmittedSearchString] = useState('');
  const submitSearchString = (str) => {
    setSubmittedSearchString(str);
  };

  return (
    <>
      <Header
        navigation={navigation}
        submitSearchString={submitSearchString}
        backBtnNeeded={true}
        displayTextInput={true}
      />
      <MaterialTopTabs.Navigator
        tabBarOptions={{indicatorStyle: {backgroundColor: COLORS.primary}}}>
        <MaterialTopTabs.Screen
          name="For Sale"
          children={() => (
            <ForSale
              userId={userId}
              navigation={navigation}
              submittedSearchString={submittedSearchString}
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
