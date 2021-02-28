import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {PaperProvider} from 'react-native-paper';

import {
  Home,
  Sell,
  DisplayItem,
  Categories,
  Chats,
  MyAccount,
} from './screens/';
import Tabs from './navigation/tabs';
import store from './store/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <PaperProvider> */}
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Home'}>
          {/* Home */}
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Sell" component={Sell} />
          <Stack.Screen name="DisplayItem" component={DisplayItem} />
          {/* Categories */}
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="Chats" component={Chats} />
          <Stack.Screen name="MyAccount" component={MyAccount} />
        </Stack.Navigator>
        {/* </PaperProvider> */}
      </NavigationContainer>
    </Provider>
  );
}
