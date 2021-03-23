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
import {ModalAlert} from '../components';
import {SIZES, FONTS, COLORS} from '../constants';
import {BackButton, ImageScrollView, HeaderButton} from './index';
import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import * as actions from '../store/actionTypes';

export default function Header({
  userId,
  navigation,
  title,
  saveDraft,
  showPopoutMenu,
  hidePopoutMenu,
  submitSearchString,
  showSearchHistory,
  clearFilterFields,
  searchString,
  getSearchString,
  toggleFilterScreen,
  useImgStyle,
  useBackBtn,
  useSearchBar,
  useRightBtns,
  useSearchHistory,
}) {
  const [recentSearches, setRecentSearches] = useState(['baseball', 'fashion']);
  const [searchFieldAlert, setSearchFieldAlert] = useState(false);
  const [backBtnAlert, setBackBtnAlert] = useState(false);

  const dispatch = useDispatch();

  const renderBackBtn = () => {
    return (
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          if (title === 'Filter') {
            toggleFilterScreen();
          } else if (title === 'Edit Post') {
            setBackBtnAlert(true);
          } else if (title === 'Post For Sale') {
            saveDraft();
          } else {
            navigation.goBack();
          }
        }}>
        <Icon
          name="arrow-back-outline"
          size={25}
          style={useImgStyle ? styles.backBtnWithImg : null}
        />
      </TouchableOpacity>
    );
  };

  const closeModal = () => {
    setBackBtnAlert(false);
    setSearchFieldAlert(false);
  };

  const onClickOption = (actions) => {
    closeModal();
    switch (actions) {
      case 'yes':
        navigation.goBack();
      default:
        return;
    }
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
          onFocus={() => {
            showSearchHistory();
            setSearchFieldAlert(false);
          }}
          onChangeText={(text) => getSearchString(text)}
          onSubmitEditing={() => {
            if (searchString.trim()) {
              submitSearchString(searchString);
              setRecentSearches([searchString, ...recentSearches]);
            } else {
              setSearchFieldAlert(true);
            }
            clearFilterFields();
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
        <View style={styles.searchBoxContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 40,
            }}>
            <Text style={styles.regularText}>Recent searches</Text>
            <TouchableOpacity
              style={{
                width: 80,
              }}
              onPress={() => setRecentSearches([])}>
              <Text
                style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  color: COLORS.darkgray,
                  ...FONTS.body4,
                }}>
                Delete All
              </Text>
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView enableOnAndroid style={{maxHeight: 400}}>
            {recentSearches.map((item, index) => {
              return (
                <TouchableOpacity
                  key={`item-${index}`}
                  style={styles.searchContainer}
                  onPress={() => {
                    getSearchString(item);
                    submitSearchString(item);
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.searchIcon}>
                      <Icon name={'pricetag-outline'} size={20} />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        marginLeft: SIZES.padding,
                      }}>
                      <Text style={styles.regularText}>{item}</Text>
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
            <ModalAlert
              visibleVariable={backBtnAlert}
              closeModal={closeModal}
              onClickOption={onClickOption}
              message={'Quit editing post?'}
              options={['No', 'Yes']}
              actions={['no', 'yes']}
            />

            {/* SEARCH INPUT  */}
            {useSearchBar && renderSearchBar()}
            <ModalAlert
              visibleVariable={searchFieldAlert}
              closeModal={closeModal}
              onClickOption={onClickOption}
              message={'Search field is empty'}
            />

            {/* TITLE */}
            {title && (
              <Text
                style={{
                  ...styles.regularText,
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
  regularText: {
    ...FONTS.body4,
  },
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
    shadowOffset: {width: 5, height: 5},
    shadowColor: COLORS.darkgray,
    shadowOpacity: 2.0,
    color: COLORS.black,
  },
  searchBoxContainer: {
    width: '100%',
    position: 'absolute',
    top: 109,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding * 2,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  searchIcon: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginRight: SIZES.padding,
  },
});
