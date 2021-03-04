import React from 'react';
import {All, Active, Sold} from '../screens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Header} from '../components';
const MaterialTopTabs = createMaterialTopTabNavigator();
import {filterItems} from '../helper';

export default function sellerItemsTabs({route, navigation}) {
  const {items} = route.params;
  const activeItems = filterItems(0, items, 'active');
  const soldItems = filterItems(0, items, 'sold');

  return (
    <MaterialTopTabs.Navigator
      style={{top: 40}}
      // tabBar={(navigation) => (
      //   <Header navigation={navigation} text={'Items'} />
      // )}
    >
      <MaterialTopTabs.Screen
        name="All"
        children={() => <All items={items} navigation={navigation} />}
      />

      <MaterialTopTabs.Screen
        name="Active"
        children={() => <Active items={activeItems} navigation={navigation} />}
      />
      <MaterialTopTabs.Screen
        name="Sold"
        children={() => <Sold items={soldItems} navigation={navigation} />}
      />
    </MaterialTopTabs.Navigator>
  );
}
