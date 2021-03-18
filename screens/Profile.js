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
import {PopoutMenu, Header, MemberInfo, MemberRating} from '../components';
import {SIZES, COLORS, FONTS} from '../constants';
import Tooltip from 'rn-tooltip';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import * as actions from '../store/actionTypes';

export default function Profile({route, navigation}) {
  const {sellerId, userId} = route.params;
  const atCurrentUserProfile = sellerId === userId ? true : false;
  const itemTabs = atCurrentUserProfile ? 'userItemsTabs' : 'sellerItemsTabs';

  const [popupMenu, setPopupMenu] = useState(false);
  const [blockConfirmation, setBlockConfirmation] = useState(false);
  const [hideConfirmation, setHideConfirmation] = useState(false);

  const seller = useSelector((state) => state.members[sellerId]);
  const numOfItems = useSelector(
    (state) => Object.keys(state.listings[sellerId]).length,
  );

  const blacklist = useSelector((state) => state.blackLists[userId]);

  console.log({blacklist});

  const dispatch = useDispatch();

  const showPopoutMenu = () => {
    setPopupMenu(true);
  };

  const hidePopoutMenu = () => {
    setPopupMenu(false);
  };

  const showBlockConfirmation = () => {
    setBlockConfirmation(true);
  };

  const showHideConfirmation = () => {
    setHideConfirmation(true);
  };

  const renderBlockConfirmation = () => {
    return (
      <Modal
        style={{alignItems: 'center'}}
        isVisible={blockConfirmation}
        onBackdropPress={() => setBlockConfirmation(false)}>
        <View
          style={{
            ...styles.confirmationContainer,
          }}>
          <Text style={styles.confirmationText}>
            Are you sure you want to block {seller.username}? Their posts won't
            be visible to you and they won't be able to chat with you.
          </Text>
          <View>
            <TouchableOpacity
              onPress={() => {
                console.warn('User blocked.');

                setBlockConfirmation(false);
                dispatch({
                  type: actions.BLACKLIST_ADDED,
                  userId,
                  payload: {
                    sellerId,
                  },
                });
              }}
              style={{
                ...styles.confirmationBtn,
                backgroundColor: COLORS.primary,
              }}>
              <Text>BLOCK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setBlockConfirmation(false)}
              style={{
                ...styles.confirmationBtn,
                borderColor: COLORS.secondary,
                borderWidth: 1,
              }}>
              <Text>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderHideConfirmation = () => {
    return (
      <Modal
        style={{alignItems: 'center'}}
        isVisible={hideConfirmation}
        onBackdropPress={() => setHideConfirmation(false)}>
        <View
          style={{
            ...styles.confirmationContainer,
          }}>
          <Text style={styles.confirmationText}>
            Hide {seller.username} and all of {seller.username}'s post ?
          </Text>
          <View>
            <TouchableOpacity
              onPress={() => setHideConfirmation(false)}
              style={{
                ...styles.confirmationBtn,
                backgroundColor: COLORS.primary,
              }}>
              <Text>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.confirmationBtn,
                borderColor: COLORS.secondary,
                borderWidth: 1,
              }}>
              <Text>YES, HIDE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderPopoutMenu = () => {
    return atCurrentUserProfile ? (
      <PopoutMenu
        navigation={navigation}
        options={['Edit']}
        hidePopoutMenu={hidePopoutMenu}
        sellerId={seller}
        userId={userId}
      />
    ) : (
      <PopoutMenu
        navigation={navigation}
        options={['Report', 'Block', 'Hide this seller']}
        hidePopoutMenu={hidePopoutMenu}
        showBlockConfirmation={showBlockConfirmation}
        showHideConfirmation={showHideConfirmation}
        sellerId={seller}
        userId={userId}
      />
    );
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
      <View>{renderBlockConfirmation()}</View>
      <View>{renderHideConfirmation()}</View>
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
