import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Header} from '../../components';

export default function Purchases({route, navigation}) {
  const {userId} = route.params;

  return (
    <View>
      <Header title={'Purchases'} useBackBtn={true} navigation={navigation} />

      {/* {items.length === 0 && <Text>No sold items</Text>} */}

      <Text>
        No purchases yet. {'\n'}
        Try chatting on a neighbour's listings.
      </Text>
    </View>
  );
}
