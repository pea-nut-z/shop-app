import React, {useState} from 'react';
import {View} from 'react-native';
import {AllReviews, Buyers, Sellers} from '../screens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Header} from '../components';
import {COLORS} from '../constants';
const MaterialTopTabs = createMaterialTopTabNavigator();

export default function reviewsTabs({route, navigation}) {
  const {userId} = route.params;

  return (
    <>
      <View>
        <Header title={'Reviews'} navigation={navigation} useBackBtn={true} />
      </View>
      <MaterialTopTabs.Navigator
        tabBarOptions={{indicatorStyle: {backgroundColor: COLORS.primary}}}>
        <MaterialTopTabs.Screen
          name="All"
          children={() => (
            <AllReviews userId={userId} navigation={navigation} />
          )}
        />
        <MaterialTopTabs.Screen
          name="From buyers"
          children={() => <Buyers userId={userId} navigation={navigation} />}
        />
        <MaterialTopTabs.Screen
          name="From sellers"
          children={() => <Sellers userId={userId} navigation={navigation} />}
        />
      </MaterialTopTabs.Navigator>
    </>
  );
}
