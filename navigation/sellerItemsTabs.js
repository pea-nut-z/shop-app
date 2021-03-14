import React from 'react';
import {View} from 'react-native';
import {All, Active, Sold} from '../screens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Header} from '../components';
import {COLORS} from '../constants';
const MaterialTopTabs = createMaterialTopTabNavigator();

export default function sellerItemsTabs({route, navigation}) {
  const {userId, sellerId} = route.params;

  return (
    <>
      <Header navigation={navigation} title={'Items'} useBackBtn={true} />
      <MaterialTopTabs.Navigator
        tabBarOptions={{indicatorStyle: {backgroundColor: COLORS.primary}}}>
        <MaterialTopTabs.Screen
          name="All"
          children={() => (
            <All
              userId={userId}
              sellerId={sellerId}
              atUserItemsTabs={false}
              navigation={navigation}
            />
          )}
        />

        <MaterialTopTabs.Screen
          name="Active"
          children={() => (
            <Active
              userId={userId}
              sellerId={sellerId}
              atUserItemsTabs={false}
              navigation={navigation}
            />
          )}
        />
        <MaterialTopTabs.Screen
          name="Sold"
          children={() => (
            <Sold
              userId={userId}
              sellerId={sellerId}
              atUserItemsTabs={false}
              navigation={navigation}
            />
          )}
        />
      </MaterialTopTabs.Navigator>
    </>
  );
}
