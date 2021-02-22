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
import {icons, SIZES, FONTS, COLORS, recordList} from '../constants';
import {Header, HeaderButton, CircleButton, BarButton} from '../components';
// import {recordList} from '../constants/buttonLists';

export default function MyAccount() {
  return (
    <View>
      <SafeAreaView>
        <Header text={'Me'} />
        <View style={styles.headerButton}>
          <HeaderButton iconSrc={icons.settings} />
        </View>
        <View style={styles.profileButton}>
          <BarButton />
        </View>
        <View style={styles.circleButtons}>
          {recordList.map((list) => {
            return (
              <CircleButton
                key={list.name}
                iconSrc={list.icon}
                name={list.name}
              />
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    position: 'absolute',
    top: SIZES.height * 0.07,
    right: SIZES.padding * 2,
  },

  profileButton: {
    position: 'absolute',
    top: SIZES.height * 0.2,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
  },

  circleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    paddingVertical: SIZES.padding,
    height: SIZES.height * 0.12,
    top: SIZES.height * 0.5,
  },
});
