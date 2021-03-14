import React from 'react';
import {View} from 'react-native';
import {Header} from '../components';
export default function Profile() {
  return (
    <View>
      <Header
        navigation={navigation}
        title={'Profile'}
        useBackBtn={true}
        useRightBtns={['ellipsis-circle-outline']}
      />
    </View>
  );
}
