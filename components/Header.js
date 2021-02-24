import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SIZES, FONTS, COLORS, icons} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header({navigation, text}) {
  return (
    <View style={styles.header}>
      <View style={{flexDirection: 'row'}}>
        {/* BACK BUTTON */}
        {navigation && (
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={25} />
          </TouchableOpacity>
        )}
        {/* TEXT*/}
        <Text
          style={{...styles.text, marginLeft: navigation ? SIZES.padding : 0}}>
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderWidth: 1,
    borderColor: COLORS.transparent,
    borderBottomColor: COLORS.secondary,
    alignItems: 'center',
    flexDirection: 'row',
  },
  backButtonContainer: {
    width: 35,
    height: 35,
    justifyContent: 'center',
  },
  backButton: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },
  text: {
    ...FONTS.h3,
    marginTop: 10,
  },
});
