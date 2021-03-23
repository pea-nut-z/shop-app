import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants';

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
        style={styles.btn}>
        <Icon
          name={name}
          size={25}
          style={name.includes('social') ? styles.shareBtn : null}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingLeft: 25,
    paddingVertical: 3,
  },
  shareBtn: {
    shadowOffset: {width: 5, height: 5},
    shadowColor: COLORS.darkgray,
    shadowOpacity: 2.0,
    color: COLORS.black,
    paddingLeft: 25,
    paddingVertical: 3,
  },
});
