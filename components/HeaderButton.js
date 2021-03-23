import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from '../constants';

export default function HeaderButton({
  userId,
  name,
  showPopoutMenu,
  navigation,
}) {
  const navigateTo = (keyword) => {
    switch (keyword) {
      case 'search':
        return navigation.navigate('searchTabs', {
          userId,
        });
      case 'funnel':
        return navigation.navigate('CustomizeFeed', {
          userId,
        });
      case 'notifications':
        return navigation.navigate('notificationsTabs', {
          userId,
        });
      // case 'edit':
      //   return navigation.navigate('EditProfile', {
      //     userId,
      //   });
      default:
        return;
    }
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          const keyword = name.split('-')[0];
          keyword === 'ellipsis' ? showPopoutMenu() : navigateTo(keyword);
        }}
        style={{paddingLeft: 25, paddingVertical: 3}}>
        <Icon name={name} size={25} />
      </TouchableOpacity>
    </View>
  );
}
