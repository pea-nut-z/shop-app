import React, {useEffect} from 'react';

import {Active, Sold, Hidden} from '../screens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Header} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {restructSellerItemsObj} from '../helper';

const MaterialTopTabs = createMaterialTopTabNavigator();

export default function userListingsTabs({route, navigation}) {
  const {userId} = route.params;

  // USER INFO
  const items = useSelector((state) => state['listings'][userId]);
  const userAllItems = restructSellerItemsObj(items, userId);

  return (
    <MaterialTopTabs.Navigator
      style={{top: 40}}
      // tabBar={(navigation) => (
      //   <Header navigation={navigation} text={'Items'} />
      // )}
    >
      <MaterialTopTabs.Screen
        name="Active"
        children={() => <Active items={userAllItems} navigation={navigation} />}
      />

      <MaterialTopTabs.Screen
        name="Sold"
        children={() => <Sold items={userAllItems} navigation={navigation} />}
      />
      <MaterialTopTabs.Screen
        name="Hidden"
        children={() => <Hidden items={userAllItems} navigation={navigation} />}
      />
    </MaterialTopTabs.Navigator>
  );
}
