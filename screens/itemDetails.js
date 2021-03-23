import React, {useState, useMemo, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Header,
  ImageScrollView,
  MemberInfo,
  MemberRating,
  SellerOtherItems,
  Border,
} from '../components';
import {
  FONTS,
  SIZES,
  categoryOptions,
  itemStatusOptions,
  COLORS,
} from '../constants';
import {timeSince} from '../helper';
import * as actions from '../store/actionTypes';
import {selectMemberAllItems} from '../store/selectors';

export default function itemDetails({route, navigation}) {
  const {userId, sellerId, itemId} = route.params;

  // SELLER INFO
  const seller = useSelector((state) => state.members[sellerId]);

  // CURRENT ITEM INFO
  const item = useSelector((state) => {
    return state.listings[sellerId][itemId];
  });

  const itemImages = item.images;
  const useImgStyle = typeof item.images[0] === 'number' ? false : true;

  // USER'S FAVOURITES
  const favs = useSelector((state) => state.favourites[userId]);
  const isFav = favs.find((item) => item.itemId === itemId);

  // SELLER'S LISTINGS
  const getSellerAllItems = useMemo(selectMemberAllItems, []);
  const sellerAllItems = useSelector((state) =>
    getSellerAllItems(state, sellerId),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: actions.ITEM_VIEW_INCREMENTED,
      sellerId,
      itemId,
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* HEADER */}
      <View
        style={{
          zIndex: 1,
          position: 'absolute',
        }}>
        <Header
          navigation={navigation}
          useImgStyle={useImgStyle}
          useBackBtn={true}
          useRightBtns={[
            'share-social-outline',
            // 'ellipsis-vertical-circle-outline',
          ]}
        />
      </View>
      <KeyboardAwareScrollView
        enableOnAndroid
        showsVerticalScrollIndicator={false}>
        {/* HEADER ADJESTMENT */}
        {useImgStyle && <ImageScrollView images={itemImages} />}
        {!useImgStyle && <View style={{height: 105}} />}

        {/* SELLER INFO */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile', {userId, sellerId})}
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
          }}>
          <MemberInfo
            picture={seller.displayPic}
            name={seller.username}
            location={seller.location}
            atItemDetails={true}
          />

          <MemberRating
            rating={seller.rating}
            explanation={true}
            numOfReviews={seller.numOfReviews}
            atItemDetails={true}
          />
        </TouchableOpacity>

        <Border />

        {/* RENDER ITEM INFO */}
        {/* RENDER STATUS DROPDOWN ONLY TO SELLER */}
        <View
          style={{
            minHeight: SIZES.height * 0.21,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
          }}>
          {userId === sellerId && (
            <DropDownPicker
              items={itemStatusOptions}
              containerStyle={{
                width: 100,
                height: 40,
                margin: SIZES.padding * 2,
              }}
              placeholder={item.status}
              onChangeItem={(item) => {
                // setItemStatus(item.value);
                dispatch({
                  type: actions.ITEM_STATUS_CHANGED,
                  sellerId,
                  itemId,
                  status: item.value,
                });
              }}
              dropDownMaxHeight={itemStatusOptions.length * SIZES.height}
              labelStyle={{
                ...FONTS.body5,
              }}
              itemStyle={{
                justifyContent: 'flex-start',
                paddingHorizontal: SIZES.padding,
              }}
            />
          )}

          <Text style={{paddingVertical: SIZES.padding, ...FONTS.h4}}>
            {item.title}
          </Text>
          <Text
            style={{
              paddingBottom: SIZES.padding,
              color: COLORS.secondary,
              ...FONTS.body4,
            }}>
            {item.category} • {timeSince(item.date)}
          </Text>
          <Text style={{paddingVertical: SIZES.padding, ...FONTS.body4}}>
            {item.description}
          </Text>
          <Text
            style={{
              paddingVertical: SIZES.padding,
              color: COLORS.secondary,
              ...FONTS.body4,
            }}>
            {item.chats} chats • {item.favourites} favourites • {item.views}{' '}
            views
          </Text>
        </View>

        <Border />

        {/* REPORT THIS POST  */}
        {sellerId === userId && (
          <TouchableOpacity
            style={{
              height: 60,
              justifyContent: 'center',
              paddingHorizontal: SIZES.padding * 2,
            }}>
            <Text style={{...FONTS.h4}}>Report this post</Text>
          </TouchableOpacity>
        )}

        <Border />

        {/* OTHER ITEMS FROM SELLER */}
        {sellerAllItems.length !== 1 && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: SIZES.padding * 2,
                paddingVertical: SIZES.padding,
              }}>
              <Text style={{...FONTS.h4}}>
                Other items by {seller.username}
              </Text>

              {/* SEE ALL ITEMS BUTTON */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('sellerItemsTabs', {
                    userId,
                    sellerId,
                  });
                }}>
                <Text style={{color: COLORS.darkgray, ...FONTS.body4}}>
                  See all
                </Text>
              </TouchableOpacity>
            </View>
            {/* FOUR OTHER ITEMS */}
            <SellerOtherItems
              sellerId={sellerId}
              itemId={itemId}
              navigation={navigation}
            />
          </View>
        )}
      </KeyboardAwareScrollView>

      {/* FOOTER BUTTON */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding * 2,
          paddingVertical: SIZES.padding,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <TouchableOpacity
              style={{
                paddingRight: SIZES.padding * 2,
                borderRightWidth: 1,
                borderRightColor: COLORS.secondary,
              }}
              onPress={() => {
                dispatch({
                  type: isFav
                    ? actions.FAVOURITE_REMOVED
                    : actions.FAVOURITE_ADDED,
                  userId,
                  sellerId,
                  itemId,
                });
              }}>
              <Icon
                name={isFav ? 'heart' : 'heart-outline'}
                size={30}
                color={isFav ? COLORS.primary : null}
              />
            </TouchableOpacity>
          </View>

          <View style={{paddingHorizontal: SIZES.padding * 2}}>
            <Text style={{...FONTS.body4}}>$ {item.price}</Text>
            {item.negotiable ? (
              <TouchableOpacity>
                <Text style={{color: COLORS.primary, ...FONTS.body4}}>
                  Make Offer
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={{...FONTS.body4}}>Non-negotiable</Text>
            )}
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.primary,
              height: 40,
              width: 70,
            }}>
            <Text style={{color: COLORS.white, ...FONTS.body4}}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SafeAreaView />
    </View>
  );
}
