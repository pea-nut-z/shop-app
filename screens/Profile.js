import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {Header} from '../components';
import {SIZES, COLORS} from '../constants';

export default function Profile({route, navigation}) {
  const {userId} = route.params;

  const [popupMenu, setPopupMenu] = useState(false);

  const showPopupMenu = () => {
    setPopupMenu(true);
  };

  const hidePopupMenu = () => {
    setPopupMenu(false);
  };

  const renderPopUpMenu = () => {
    // check if navigating seller or user's profile
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditProfile', {userId});
          setPopupMenu(false);
        }}
        style={{
          height: 40,
          width: 120,
          position: 'absolute',
          backgroundColor: COLORS.white,
          borderWidth: 1,
          borderColor: COLORS.secondary,
          justifyContent: 'center',
          paddingHorizontal: SIZES.padding * 2,
          top: -50,
          right: SIZES.padding * 2,
          shadowOffset: {width: 3, height: 3},
          shadowColor: COLORS.darkgray,
          shadowOpacity: 0.6,
        }}>
        <Text>Edit</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'pink'}}>
      <Header
        userId={userId}
        navigation={navigation}
        title={'Profile'}
        showPopupMenu={showPopupMenu}
        useBackBtn={true}
        useRightBtns={['ellipsis-vertical-circle-outline']}
      />
      <View style={{}}>{popupMenu && renderPopUpMenu()}</View>
      <TouchableWithoutFeedback onPress={() => hidePopupMenu()} style={{}}>
        <View style={{flex: 1, backgroundColor: 'pink'}}></View>
      </TouchableWithoutFeedback>
    </View>
  );
}
