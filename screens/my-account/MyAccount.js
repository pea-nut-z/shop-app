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
  viewOptions,
  locationOptions,
  infoOptions,
} from '../../constants';
import {
  Header,
  HeaderButton,
  CircleButton,
  ItemCards,
  FlatButtons,
  MemberInfo,
} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {timeSince, restructSellerItemsObj} from '../../helper';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MyAccount({navigation}) {
  // MOCK USERID
  const userId = 111;

  const userInfo = useSelector((state) => state.members[userId]);
  const renderProfilePicAndBtn = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Profile', {
            sellerId: userId,
            userId,
          })
        }
        style={{
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.padding * 2,
        }}>
        <MemberInfo
          picture={userInfo.displayPic}
          name={userInfo.username}
          location={userInfo.location}
          id={userId}
        />
        {/* VIEW PROFILE BUTTON */}
        <View style={styles.button}>
          <Text style={styles.btnText}>View profile</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCamerabtn = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('EditProfile', {userId})}
        style={{
          height: 35,
          width: 35,
          backgroundColor: COLORS.lightGray2,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: COLORS.secondary,
          borderRadius: 50,
          position: 'absolute',
          top: 90,
          left: 220,
        }}>
        <Icon name={'camera'} size={25} color={COLORS.darkgray} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header title={'My Account'} useRightBtns={['settings-outline']} />
      <KeyboardAwareScrollView extraHeight={0} enableOnAndroid>
        {/* PROFILE DISPLAY */}
        <View>
          {renderProfilePicAndBtn()}
          {renderCamerabtn()}
        </View>

        {/* CIRCLE BUTTONS */}
        <View style={styles.circleButtons}>
          <CircleButton
            options={viewOptions}
            userId={userId}
            navigation={navigation}
          />
        </View>

        {/* FLAT BUTTONS */}
        <FlatButtons options={locationOptions} navigation={navigation} />
        <FlatButtons options={infoOptions} navigation={navigation} />
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileButton: {
    // position: 'absolute',
    // top: SIZES.height * 0.2,
    // paddingVertical: SIZES.padding,
    // paddingHorizontal: SIZES.padding * 2,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.padding,
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
    paddingVertical: SIZES.padding,
    height: SIZES.height * 0.12,
  },
});
