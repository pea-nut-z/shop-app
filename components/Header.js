import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import {SIZES, FONTS, COLORS} from '../constants';
import {BackButton, ImageScrollView, HeaderButton} from './index';
import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function Header({
  userId,
  navigation,
  title,
  showPopoutMenu,
  hidePopoutMenu,
  submitSearchString,
  showSearchHistory,
  useImgStyle,
  useBackBtn,
  useSearchBar,
  useRightBtns,
  useSearchHistory,
}) {
  const [searchString, setSearchString] = useState('');
  const [recentSearches, setRecentSearches] = useState(['test', '2']);

  const renderBackBtn = () => {
    return (
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back-outline"
          size={25}
          style={useImgStyle ? styles.backBtnWithImg : null}
        />
      </TouchableOpacity>
    );
  };

  const renderSearchBar = () => {
    return (
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
          onFocus={() => showSearchHistory()}
          onChangeText={(text) => setSearchString(text)}
          onSubmitEditing={() => {
            submitSearchString(searchString);
            setRecentSearches([searchString, ...recentSearches]);
          }}
          underlineColorAndroid="transparent"
          clearButtonMode="always"
          autoFocus={true}
          style={{
            flex: 1,
            width: '90%',
            padding: 9,
            fontSize: 18,
          }}
        />
      </View>
    );
  };

  const renderRecentSearches = () => {
    if (recentSearches.length !== 0 && !searchString) {
      return (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            top: 109,
            backgroundColor: 'red',
            paddingHorizontal: SIZES.padding * 2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 40,
            }}>
            <Text>RECENT SEARCHES</Text>
            <TouchableOpacity
              style={{
                width: 80,
                backgroundColor: 'green',
              }}
              onPress={() => setRecentSearches([])}>
              <Text style={{textAlign: 'center'}}>Delete All</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView enableOnAndroid style={{maxHeight: 400}}>
            {recentSearches.map((item, index) => {
              return (
                <TouchableOpacity
                  key={`item-${index}`}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 50,
                  }}
                  onPress={() => {
                    setSearchString(item);
                    submitSearchString(item);
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        // backgroundColor: 'pink',
                        height: 30,
                        width: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: COLORS.secondary,
                      }}>
                      <Icon name={'pricetag-outline'} size={20} />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        marginLeft: SIZES.padding,
                      }}>
                      <Text>{item}</Text>
                    </View>
                  </View>
                  <View>
                    <Button
                      title="x"
                      color={COLORS.secondary}
                      onPress={() => {
                        const newSearches = recentSearches.filter(
                          (previousItem) => previousItem !== item,
                        );
                        setRecentSearches(newSearches);
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </KeyboardAwareScrollView>
        </View>
      );
    }
  };

  const renderRightBtn = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {useRightBtns &&
          useRightBtns.map((buttonName, index) => {
            return (
              <HeaderButton
                key={`button-${index}`}
                userId={userId}
                name={buttonName}
                navigation={navigation}
                showPopoutMenu={showPopoutMenu}
              />
            );
          })}
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{backgroundColor: useImgStyle ? 'transparent' : 'white'}}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (hidePopoutMenu) hidePopoutMenu();
        }}>
        <View
          style={useImgStyle ? styles.headerWithImg : styles.headerWithoutImg}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* BACK BUTTON */}
            {useBackBtn && renderBackBtn()}

            {/* SEARCH INPUT  */}
            {useSearchBar && renderSearchBar()}

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
          {useRightBtns && renderRightBtn()}
        </View>
      </TouchableWithoutFeedback>
      {useSearchHistory && renderRecentSearches()}
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
