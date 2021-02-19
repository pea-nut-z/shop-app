import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {icons, SIZES, FONTS, COLORS} from '../constants';

export default function Chats() {
  function renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
      </View>
    );
  }
  return (
    <View>
      <SafeAreaView>{renderHeader()}</SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 57,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderWidth: 1,
    borderColor: COLORS.transparent,
    borderBottomColor: COLORS.secondary,
  },
  headerText: {
    ...FONTS.h3,
    paddingTop: 10,
  },
});
