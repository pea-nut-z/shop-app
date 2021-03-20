import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {Header} from '../../components';
import {SIZES, FONTS, COLORS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

import Modal from 'react-native-modal';
import * as actions from '../../store/actionTypes';

export default function EditProfile({route, navigation}) {
  const {userId} = route.params;
  const currentPic = useSelector(
    (state) => state.members[userId]['displayPic'],
  );
  const currentName = useSelector((state) => state.members[userId]['username']);
  const userInfo = useSelector((state) => state.members[userId]);
  const [displayPic, setDisplayPic] = useState(currentPic);
  const [username, setUsername] = useState(currentName);
  const [popupMenu, setPopupMenu] = useState(false);
  const dispatch = useDispatch();

  const renderDoneBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          displayPic !== currentPic &&
            dispatch({
              type: actions.USER_DISPLAYPIC_CHANGED,
              userId,
              // payload: {
              image: displayPic,
              // },
            });
          username !== currentName &&
            dispatch({
              type: actions.USERNAME_CHANGED,
              userId,
              // payload: {
              username,
              // },
            });
          navigation.goBack();
        }}
        style={{
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.primary,
        }}>
        <Text style={{fontSize: 25, color: COLORS.white}}>Done</Text>
      </TouchableOpacity>
    );
  };
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      setDisplayPic(image.path);
      setPopupMenu(false);
    });
  };

  const renderPopUpMenu = () => {
    return (
      <Modal isVisible={popupMenu} onBackdropPress={() => setPopupMenu(false)}>
        <TouchableOpacity
          onPress={() => choosePhotoFromLibrary()}
          style={{
            height: 65,
            backgroundColor: 'pink',
            //   backgroundColor: COLORS.white,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.padding * 2,
          }}>
          <Icon name={'image-outline'} size={35} />
          <Text style={{marginLeft: SIZES.padding * 2}}>Choose from album</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setDisplayPic('N/A');
            setPopupMenu(false);
          }}
          style={{
            height: 65,
            backgroundColor: COLORS.white,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.padding * 2,
          }}>
          <Icon name={'trash-outline'} size={35} />
          <Text style={{marginLeft: SIZES.padding * 2}}>
            Delete profile photo
          </Text>
        </TouchableOpacity>
      </Modal>
    );
  };
  const renderPicBtn = () => {
    return (
      <TouchableOpacity onPress={() => setPopupMenu(!popupMenu)}>
        {displayPic !== 'N/A' ? (
          <Image
            source={{uri: displayPic}}
            resizeMode={'contain'}
            style={{
              width: 150,
              height: 150,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: COLORS.secondary,
              borderRadius: 100,
            }}
          />
        ) : (
          <Icon
            name={'person-circle-outline'}
            size={160}
            color={COLORS.secondary}
          />
        )}
        <View
          style={{
            height: 45,
            width: 45,
            backgroundColor: COLORS.lightGray2,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: COLORS.secondary,
            borderRadius: 50,
            position: 'absolute',
            top: 110,
            left: 110,
          }}>
          <Icon name={'camera'} size={30} color={COLORS.darkgray} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header
        title={'Edit Profile'}
        useBackBtn={true}
        navigation={navigation}
      />
      <View
        style={{
          paddingVertical: SIZES.padding * 2,
          alignItems: 'center',
        }}>
        {renderPicBtn()}
      </View>
      <View>{renderPopUpMenu()}</View>
      <View>
        <TextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          underlineColorAndroid="transparent"
          onSubmitEditing={() => Keyboard.dismiss}
          style={{
            marginHorizontal: SIZES.padding * 2,
            height: 50,
            borderRadius: 10,
            borderWidth: 1,
            padding: 9,
            fontSize: 18,
          }}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'green',
        }}>
        {renderDoneBtn()}
      </KeyboardAvoidingView>
      <SafeAreaView />
    </View>
  );
}
