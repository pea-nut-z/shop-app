import React from 'react';
import {All, Active, Sold} from '../screens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Header} from '../components';
const MaterialTopTabs = createMaterialTopTabNavigator();

export default function sellerItemsTabs({route}) {
  const {items} = route.params;
  return (
    <MaterialTopTabs.Navigator
      style={{top: 40}}
      // tabBar={(navigation) => (
      //   <Header navigation={navigation} text={'Items'} />
      // )}
    >
      <MaterialTopTabs.Screen
        name="All"
        children={() => (
          <All
            // sellerId={sellerId}
            items={items}
          />
        )}
      />

      <MaterialTopTabs.Screen name="Active" component={Active} />
      <MaterialTopTabs.Screen name="Sold" component={Sold} />
    </MaterialTopTabs.Navigator>
  );
}
