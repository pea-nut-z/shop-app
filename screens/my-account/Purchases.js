import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function Purchases({route, navigation}) {
  const {userId} = route.params;

  return (
    <SafeAreaView>
      {/* {items.length === 0 && <Text>No sold items</Text>} */}

      <Text>Purchases</Text>
    </SafeAreaView>
  );
}
