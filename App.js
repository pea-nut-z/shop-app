import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, Sell, Categories, Chats, MyAccount} from './screens/';
import Tabs from './navigation/tabs';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}>
        {/* Home */}
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Sell" component={Sell} />
        {/* Categories */}
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="MyAccount" component={MyAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
