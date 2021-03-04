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
import {
  icons,
  SIZES,
  FONTS,
  COLORS,
  listingOptions,
  locationOptions,
  infoOptions,
} from '../constants';
import {
  Header,
  HeaderButton,
  CircleButton,
  ItemButtons,
  FlatButtons,
} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function MyAccount({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <KeyboardAwareScrollView extraHeight={100} enableOnAndroid> */}
      {/* HEADER */}
      <Header text={'Me'} />
      <View style={styles.headerButton}>
        <HeaderButton iconSrc={icons.settings} />
      </View>

      {/* PROFILE DISPLAY */}

      {/* VIEW PROFILE BUTTON */}
      <View style={styles.profileButton}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>View profile</Text>
        </TouchableOpacity>
      </View>

      {/* CIRCLE BUTTONS */}
      <View style={styles.circleButtons}>
        {listingOptions.map((button) => {
          return (
            <CircleButton
              key={button.name}
              iconSrc={button.icon}
              name={button.name}
            />
          );
        })}
      </View>

      {/* FLAT BUTTONS */}
      <FlatButtons options={locationOptions} navigation={navigation} />
      <FlatButtons options={infoOptions} navigation={navigation} />
      {/* </KeyboardAwareScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    position: 'absolute',
    top: SIZES.height * 0.07,
    right: SIZES.padding * 2,
  },

  profileButton: {
    // position: 'absolute',
    // top: SIZES.height * 0.2,
    // paddingVertical: SIZES.padding,
    // paddingHorizontal: SIZES.padding * 2,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: SIZES.width - SIZES.padding * 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.darkgray,
  },
  btnText: {...FONTS.h5},

  circleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // position: 'absolute',
    paddingVertical: SIZES.padding,
    height: SIZES.height * 0.12,
    // top: SIZES.height * 0.5,
  },
});
