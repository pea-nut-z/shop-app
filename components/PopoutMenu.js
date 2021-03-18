import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import {SIZES, COLORS} from '../constants';

export default function PopoutMenu({
  navigation,
  options,
  hidePopoutMenu,
  showBlockConfirmation,
  showHideConfirmation,
  sellerId,
  userId,
}) {
  return (
    <View style={{...styles.popupMenuContainer}}>
      {options.map((option) => {
        return (
          <TouchableOpacity
            key={option}
            style={{
              ...styles.popupMenuOption,
            }}
            onPress={() => {
              if (option === 'Report')
                navigation.navigate(option, {sellerId, userId});
              if (option === 'Block') showBlockConfirmation();
              if (option === 'Hide this seller') showHideConfirmation();
              hidePopoutMenu();
            }}
            style={{
              ...styles.popupMenuOption,
            }}>
            <Text>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  popupMenuContainer: {
    width: 140,
    backgroundColor: COLORS.white,
    shadowOffset: {width: 3, height: 3},
    shadowColor: COLORS.darkgray,
    shadowOpacity: 0.6,
    borderWidth: 1,

    borderColor: COLORS.secondary,
  },
  popupMenuOption: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
});
