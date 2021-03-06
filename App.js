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
  Filters,
  CustomizeFeed,
  Profile,
  EditProfile,
  Feedback,
  Report,
} from './screens/';
import {
  bottomMainTabs,
  sellerItemsTabs,
  userItemsTabs,
  searchTabs,
  notificationsTabs,
  reviewsTabs,
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
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="reviewsTabs" component={reviewsTabs} />
          {/* SHARED */}
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="itemDetails" component={itemDetails} />
          {/* HEARDER NAVIGATE */}
          <Stack.Screen name="searchTabs" component={searchTabs} />
          {/* <Stack.Screen name="Filters" component={Filters} /> */}
          <Stack.Screen name="CustomizeFeed" component={CustomizeFeed} />
          <Stack.Screen
            name="notificationsTabs"
            component={notificationsTabs}
          />
          <Stack.Screen name="Report" component={Report} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
