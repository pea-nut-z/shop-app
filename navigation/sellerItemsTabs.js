import React from 'react';
import {All, Active, Sold} from '../screens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Header} from '../components';
const MaterialTopTabs = createMaterialTopTabNavigator();

export default function sellerItemsTabs({route, navigation}) {
  const {userId, sellerId} = route.params;

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
  );
}
