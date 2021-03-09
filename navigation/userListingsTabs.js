import React, {useEffect, useMemo} from 'react';

import {Active, Sold, Hidden} from '../screens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Header} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {selectMemberAllItems} from '../store/selectors';

const MaterialTopTabs = createMaterialTopTabNavigator();

export default function userListingsTabs({route, navigation}) {
  const {userId} = route.params;

  return (
    <MaterialTopTabs.Navigator
      style={{top: 40}}
      // tabBar={(navigation) => (
      //   <Header navigation={navigation} text={'Items'} />
      // )}
    >
      <MaterialTopTabs.Screen
        name="Active"
        children={() => (
          <Active
            userId={userId}
            atUserItemsTabs={true}
            navigation={navigation}
          />
        )}
      />
      <MaterialTopTabs.Screen
        name="Sold"
        children={() => (
          <Sold
            userId={userId}
            atUserItemsTabs={true}
            navigation={navigation}
          />
        )}
      />
      <MaterialTopTabs.Screen
        name="Hidden"
        children={() => <Hidden userId={userId} navigation={navigation} />}
      />
    </MaterialTopTabs.Navigator>
  );
}
