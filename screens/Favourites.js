import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import {UserFavsRestructed} from 'react-redux';
import {ItemButtons} from '../components';

export default function Favourites({route, navigation}) {
  const {userId} = route.params;
  // console.log({UserFavsRestructed});

  // USER'S FAVS
  const items = useSelector((state) => state['listings'][userId][1]['status']);
  console.log({items});

  // const items = useSelector((state) => state['users'][userId]);
  // const items = useSelector((state) => state['listings'][userId]);

  return (
    <SafeAreaView>
      <Text>Favourites</Text>
      {/* <ItemButtons items={UserFavsRestructed} navigation={navigation} /> */}
    </SafeAreaView>
  );
}
