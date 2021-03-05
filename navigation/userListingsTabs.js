import React from 'react';
import {Active, Sold, Hidden} from '../screens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Header} from '../components';
import {filterItems} from '../helper';

const MaterialTopTabs = createMaterialTopTabNavigator();

export default function userListingsTabs({route, navigation}) {
  const {items} = route.params;

  const activeItems = filterItems(0, items, 'active');
  const soldItems = filterItems(0, items, 'sold');
  const hiddenItems = filterItems(0, items, 'hidden');

  return (
    <MaterialTopTabs.Navigator
      style={{top: 40}}
      // tabBar={(navigation) => (
      //   <Header navigation={navigation} text={'Items'} />
      // )}
    >
      <MaterialTopTabs.Screen
        name="Active"
        children={() => <Active items={activeItems} navigation={navigation} />}
      />

      <MaterialTopTabs.Screen
        name="Sold"
        children={() => <Sold items={soldItems} navigation={navigation} />}
      />
      <MaterialTopTabs.Screen
        name="Hidden"
        children={() => <Hidden items={hiddenItems} navigation={navigation} />}
      />
    </MaterialTopTabs.Navigator>
  );
}
