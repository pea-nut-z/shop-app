import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Header, MemberInfo, MemberRating, ModalAlert} from '../components';
import {SIZES, COLORS, FONTS} from '../constants';
import Tooltip from 'rn-tooltip';
import Icon from 'react-native-vector-icons/Ionicons';
import * as actions from '../store/actionTypes';
import {set} from 'react-native-reanimated';

export default function Profile({route, navigation}) {
  const {sellerId, userId} = route.params;

  // SELECTORS
  const seller = useSelector((state) => state.members[sellerId]);
  const numOfItems = useSelector(
    (state) => Object.keys(state.listings[sellerId]).length,
  );
  const blockList = useSelector((state) => {
    if (!atCurrentUserProfile) {
      return state.restrictions[userId]['block'];
    }
  });
  const hideList = useSelector((state) => {
    if (!atCurrentUserProfile) {
      return state.restrictions[userId]['hide'];
    }
  });

  const atCurrentUserProfile = sellerId === userId ? true : false;
  const itemTabs = atCurrentUserProfile ? 'userItemsTabs' : 'sellerItemsTabs';
  const sellerIsBlocked = blockList.includes(sellerId) ? true : false;

  const [popupMenu, setPopupMenu] = useState(false);
  const [blockAlert, setBlockAlert] = useState(false);
  const [hideAlert, setHideAlert] = useState(false);
  const [unblockMsg, setUnblockMsg] = useState(false);
  const [unhideMsg, setUnhideMsg] = useState(false);

  const dispatch = useDispatch();

  const showPopoutMenu = () => {
    setPopupMenu(true);
  };

  const hidePopoutMenu = () => {
    setPopupMenu(false);
  };

  const closeAlertModal = () => {
    setBlockAlert(false);
    setHideAlert(false);
  };

  const closeMsgModal = () => {
    setUnblockMsg(false);
    setUnhideMsg(false);
  };
  const onClickOption = (option) => {
    if (option === 'Report') navigation.navigate('Report', {sellerId, userId});
    if (option === 'Block') setBlockAlert(true);
    if (option === 'Unblock') {
      setUnblockMsg(true);
      dispatch({
        type: actions.BLOCK_REMOVED,
        userId,
        sellerId,
      });
    }
    if (option === 'Hide this seller') setHideAlert(true);
    if (option === "Unhide this seller's posts") {
      setUnhideMsg(true);
      dispatch({
        type: actions.HIDE_REMOVED,
        userId,
        sellerId,
      });
    }

    // CONFIRMATION
    if (option === 'block-confirmed') {
      closeAlertModal();
      dispatch({
        type: actions.BLOCK_ADDED,
        userId,
        sellerId,
      });
    }
    if (option === 'hide-confirmed') {
      closeAlertModal();
      dispatch({
        type: actions.HIDE_ADDED,
        userId,
        sellerId,
      });
    }
    if (option === 'cancel') closeAlertModal();
  };

  const renderPopoutMenu = () => {
    if (atCurrentUserProfile) {
      return (
        <View style={{...styles.popupMenuContainer}}>
          <TouchableOpacity
            style={{
              ...styles.popupMenuOption,
            }}
            onPress={() => {
              navigation.navigate('EditProfile', {userId});
            }}
            style={{
              ...styles.popupMenuOption,
            }}>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      const hideOption = hideList.includes(sellerId)
        ? "Unhide this seller's posts"
        : 'Hide this seller';

      const options = sellerIsBlocked
        ? ['Report', 'Unblock']
        : ['Report', 'Block', hideOption];

      return (
        <View style={{...styles.popupMenuContainer}}>
          {options.map((option) => {
            return (
              <TouchableOpacity
                key={option}
                style={{
                  ...styles.popupMenuOption,
                }}
                onPress={() => {
                  onClickOption(option);
                  hidePopoutMenu(false);
                }}
                style={{
                  ...styles.popupMenuOption,
                }}>
                <Text>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
  };

  const renderUserMoreRatings = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: SIZES.padding * 2,
        }}>
        <View style={{flexDirection: 'row', width: '50%'}}>
          <Icon name={'heart-outline'} size={25} color={COLORS.primary} />
          <View>
            <Text>Recommended - %</Text>
            <Text>No data yet</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', width: '50%'}}>
          <Icon name={'chatbubble-outline'} size={25} color={COLORS.primary} />
          <View>
            <Text>Response - %</Text>
            <Text>No data yet</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: 'pink',
      }}>
      <Header
        sellerId={sellerId}
        navigation={navigation}
        title={'Profile'}
        showPopoutMenu={showPopoutMenu}
        hidePopoutMenu={hidePopoutMenu}
        useBackBtn={true}
        useRightBtns={['ellipsis-vertical-circle-outline']}
      />

      {sellerIsBlocked && (
        <View
          style={{
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            height: 30,
          }}>
          <Text style={{color: COLORS.white}}>This user is blocked</Text>
        </View>
      )}

      <ModalAlert
        visibleVariable={blockAlert}
        closeModal={closeAlertModal}
        onClickOption={onClickOption}
        message={`Are you sure you want to block ${seller.username}? Their posts won't be visible to you and they won't be able to chat with you.`}
        options={['CANCEL', 'BLOCK']}
        actions={['cancel', 'block-confirmed']}
      />
      <ModalAlert
        visibleVariable={hideAlert}
        closeModal={closeAlertModal}
        onClickOption={onClickOption}
        message={`Hide ${seller.username} and all of ${seller.username}'s post ?
        `}
        options={['CANCEL', 'YES, HIDE']}
        actions={['cancel', 'hide-confirmed']}
      />
      <ModalAlert
        visibleVariable={unblockMsg}
        closeModal={closeMsgModal}
        onClickOption={onClickOption}
        message={`${seller.username} was unblocked`}
      />
      <ModalAlert
        visibleVariable={unhideMsg}
        closeModal={closeMsgModal}
        onClickOption={onClickOption}
        message={`${seller.username}'s posts have been unhidden`}
      />

      <View
        style={{
          position: 'absolute',
          top: 60,
          right: SIZES.padding * 2,
          zIndex: 1,
        }}>
        {popupMenu && renderPopoutMenu()}
      </View>
      <TouchableWithoutFeedback onPress={() => hidePopoutMenu()}>
        <View
          style={{
            flex: 1,
          }}>
          {/* MEMBER INFO */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: SIZES.padding * 3,
              paddingHorizontal: SIZES.padding * 2,
            }}>
            <MemberInfo
              picture={seller.displayPic}
              name={seller.username}
              location={seller.location}
            />

            <MemberRating
              rating={seller.rating}
              explanation={true}
              numOfReviews={seller.numOfReviews}
            />
          </View>

          {/* RATE BUTTON  */}
          {!atCurrentUserProfile && (
            <View style={{paddingHorizontal: SIZES.padding * 2}}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  height: 30,
                  borderColor: COLORS.secondary,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: SIZES.padding * 3,
                }}>
                <Text style={styles.boldText}>Rate</Text>
              </TouchableOpacity>
            </View>
          )}

          {renderUserMoreRatings()}

          {/* ACTITVITY */}
          <View style={{flex: 1, backgroundColor: 'green'}}>
            <Text>Verified 'NUM OF TIMES HERE!!!!' in {seller.location}</Text>
            <Text>Joined {seller.joined} (ACTIVE SINCE WHEN???)</Text>
          </View>

          {/* ITEMS */}
          <TouchableOpacity
            onPress={() => navigation.navigate(itemTabs, {userId, sellerId})}
            style={{
              flex: 1,
              backgroundColor: 'yellow',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>
              {numOfItems} item{numOfItems > 1 ? 's' : null}
            </Text>
            <Icon name={'chevron-forward-outline'} size={25} />
          </TouchableOpacity>

          {/* FEEDBACK */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Feedback', {sellerId})}
            style={{
              flex: 1,
              backgroundColor: 'pink',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text>Feedback</Text>
              <Text>No positive feedback yet</Text>
            </View>
            <Icon name={'chevron-forward-outline'} size={25} />
          </TouchableOpacity>

          {/* REVIEWS */}
          <TouchableOpacity
            onPress={() => navigation.navigate('reviewsTabs', {sellerId})}
            style={{
              flex: 1,
              // backgroundColor: 'green',
              borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text>0 reviews</Text>
              <Text>No reviews yet</Text>
            </View>
            <Icon name={'chevron-forward-outline'} size={25} />
          </TouchableOpacity>
          <SafeAreaView />
          {/* ENDS */}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  popupMenuContainer: {
    backgroundColor: COLORS.white,
    shadowOffset: {width: 3, height: 3},
    shadowColor: COLORS.darkgray,
    shadowOpacity: 0.6,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    paddingVertical: SIZES.padding / 2,
  },
  popupMenuOption: {
    height: 40,
    minWidth: 100,
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding / 2,
  },
  confirmationContainer: {
    width: SIZES.width - SIZES.padding * 8,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    justifyContent: 'space-between',
  },
  confirmationBtn: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: SIZES.padding,
  },
  confirmationText: {
    ...FONTS.body2,
    marginVertical: SIZES.padding,
  },
  boldText: {
    ...FONTS.h4,
  },
});
