import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HeaderButton({userId, name, navigation}) {
  const navigateTo = (name) => {
    const keyword = name.split('-')[0];
    switch (keyword) {
      case 'search':
        return navigation.navigate('searchTabs', {
          userId,
        });
      default:
        return;
    }
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigateTo(name)}
        style={{paddingLeft: 25, paddingVertical: 3, backgroundColor: 'red'}}>
        <Icon name={name} size={25} />
      </TouchableOpacity>
    </View>
  );
}
