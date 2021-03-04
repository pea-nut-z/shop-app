import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {PaperProvider} from 'react-native-paper';

import {
  Home,
  Sell,
  itemDetails,
  Categories,
  Category,
  Chats,
  MyAccount,
} from './screens/';
import {bottomMainTabs, sellerItemsTabs} from './navigation';
import store from './store/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Home'}>
          {/* Home */}
          <Stack.Screen name="Home" component={bottomMainTabs} />
          <Stack.Screen name="Sell" component={Sell} />
          <Stack.Screen name="itemDetails" component={itemDetails} />
          {/* Categories */}
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="Chats" component={Chats} />
          <Stack.Screen name="MyAccount" component={MyAccount} />
          <Stack.Screen name="sellerItemsTabs" component={sellerItemsTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
