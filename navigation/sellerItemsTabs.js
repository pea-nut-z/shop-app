import React from 'react';
import {All, Active, Sold} from '../screens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const MaterialTopTabs = createMaterialTopTabNavigator();

export default function sellerItemsTabs({seller, items}) {
  return (
    <MaterialTopTabs.Navigator>
      <MaterialTopTabs.Screen
        name="All"
        component={All}
        options={{seller, items}}
      />
      <MaterialTopTabs.Screen name="Active" component={Active} />
      <MaterialTopTabs.Screen name="Sold" component={Sold} />
    </MaterialTopTabs.Navigator>
  );
}
