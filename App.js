import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Home,
  Sell,
  itemDetails,
  Categories,
  Category,
  Chats,
  MyAccount,
  Purchases,
  Favourites,
} from './screens/';
import {
  bottomMainTabs,
  sellerItemsTabs,
  userItemsTabs,
  searchTabs,
} from './navigation';
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
          {/* HOME */}
          <Stack.Screen name="Home" component={bottomMainTabs} />
          <Stack.Screen name="Sell" component={Sell} />
          <Stack.Screen name="itemDetails" component={itemDetails} />
          <Stack.Screen name="sellerItemsTabs" component={sellerItemsTabs} />
          {/* CATEGORIES */}
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="Category" component={Category} />
          {/* CHATS */}
          <Stack.Screen name="Chats" component={Chats} />
          {/* MY ACCOUNT */}
          <Stack.Screen name="MyAccount" component={MyAccount} />
          <Stack.Screen name="userItemsTabs" component={userItemsTabs} />
          <Stack.Screen name="Purchases" component={Purchases} />
          <Stack.Screen name="Favourites" component={Favourites} />
          {/* HEARDER NAVIGATE */}
          <Stack.Screen name="searchTabs" component={searchTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
