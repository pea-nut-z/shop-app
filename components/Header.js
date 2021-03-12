import React, {useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import {SIZES, FONTS, COLORS} from '../constants';
import {BackButton, ImageScrollView, HeaderButton} from './index';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header({
  userId,
  navigation,
  submitSearchString,
  backBtnNeeded,
  isImgProvided,
  title,
  displayTextInput,
  RightButtons,
}) {
  const [searchString, setSearchString] = useState('');

  function renderBackBtn(navigation) {
    return (
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back-outline"
          size={25}
          style={isImgProvided ? styles.backBtnWithImg : null}
        />
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView
      style={{backgroundColor: isImgProvided ? 'transparent' : 'white'}}>
      <View
        style={isImgProvided ? styles.headerWithImg : styles.headerWithoutImg}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* BACK BUTTON */}
          {backBtnNeeded && renderBackBtn(navigation)}

          {/* SEARCH INPUT  */}
          {displayTextInput && (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.lightGray,
              }}>
              <Icon name={'search-outline'} size={20} style={{marginLeft: 4}} />
              <TextInput
                value={searchString}
                onChangeText={(text) => setSearchString(text)}
                onSubmitEditing={() => submitSearchString(searchString)}
                underlineColorAndroid="transparent"
                clearButtonMode="always"
                style={{
                  flex: 1,
                  width: '90%',
                  padding: 9,
                  fontSize: 18,
                }}
              />
            </View>
          )}

          {/* TITLE */}
          {title && (
            <Text
              style={{
                ...styles.title,
                marginLeft: navigation ? SIZES.padding : 0,
              }}>
              {title}
            </Text>
          )}
        </View>

        {/* RIGHT BUTTONS */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {RightButtons &&
            RightButtons.map((buttonName, index) => {
              return (
                <HeaderButton
                  key={`button-${index}`}
                  userId={userId}
                  name={buttonName}
                  navigation={navigation}
                />
              );
            })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWithoutImg: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderWidth: 1,
    borderColor: COLORS.transparent,
    borderBottomColor: COLORS.secondary,
    alignItems: 'center',
    flexDirection: 'row',
    width: SIZES.width,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
  },
  headerWithImg: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    alignItems: 'center',
    flexDirection: 'row',
    width: SIZES.width,
    backgroundColor: COLORS.transparent,
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 35,
    height: 35,
    justifyContent: 'center',
  },
  backBtnWithImg: {
    shadowOffset: {width: 3, height: 3},
    shadowColor: COLORS.darkgray,
    shadowOpacity: 1.0,
    color: COLORS.white,
  },
  title: {
    ...FONTS.h3,
  },
});
