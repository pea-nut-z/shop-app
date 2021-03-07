import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  FlatList,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';

import {
  Header,
  BackButton,
  ImageScrollView,
  ScrollViewDots,
  RatingEmoji,
  SellerOtherItems,
} from '../components';

import {
  FONTS,
  SIZES,
  categoryOptions,
  itemStatusOptions,
  COLORS,
} from '../constants';
import {timeSince, restructSellerItemsObj} from '../helper';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as actions from '../store/actionTypes';

export default function itemDetails({route, navigation}) {
  // MOCK USERID
  const userId = 111;

  const {sellerId, itemId} = route.params;
  const dispatch = useDispatch();

  // SELLER INFO
  const seller = useSelector((state) => state['users'][sellerId]);

  // SELLER'S LISTINGS
  const items = useSelector((state) => state['listings'][sellerId]);
  const sellerAllItems = restructSellerItemsObj(items, sellerId);

  // USER'S FAVOURITES
  const favs = useSelector((state) => state['favourites'][userId]);
  const isFav = favs.find((item) => item['itemId'] === itemId);

  // CUREENT ITEM INFO
  const item = items[itemId];
  const itemImages = item['images'];
  const imagesProvided = typeof item['images'][0] === 'number' ? false : true;

  const [itemStatus, setItemStatus] = useState(item.status);

  return (
    <View>
      {/* HEADER */}
      <View
        style={{
          zIndex: 1,
          position: 'absolute',
        }}>
        <Header navigation={navigation} images={imagesProvided} />
      </View>
      <KeyboardAwareScrollView extraHeight={0} enableOnAndroid style={{}}>
        {/* IMAGES */}
        {imagesProvided && <ImageScrollView images={itemImages} />}
        {!imagesProvided && <View style={{height: 105}} />}

        {/* RENDER SELLER INFO */}
        <View
          style={{
            height: SIZES.height * 0.08,
            backgroundColor: 'red',
          }}>
          <View>
            {
              <Image
                source={{
                  uri: 'https://i.ytimg.com/vi/H8X7FHrq278/maxresdefault.jpg',
                }}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                }}
              />
            }
          </View>
          <View>
            <Text style={{}}>{seller.userName}</Text>
            <Text>{seller.location}</Text>
          </View>
          <View>
            <Text>{seller.rating}</Text>
            <RatingEmoji rating={seller.rating} />
          </View>
        </View>

        {/* RENDER ITEM INFO */}
        {/* RENDER STATUS DROPDOWN ONLY TO SELLER */}
        <View
          style={{minHeight: SIZES.height * 0.21, backgroundColor: 'green'}}>
          <DropDownPicker
            items={itemStatusOptions}
            containerStyle={{
              width: 100,
              height: 40,
              margin: SIZES.padding * 2,
            }}
            placeholder={itemStatus}
            onChangeItem={(item) => setItemStatus(item.value)}
            dropDownMaxHeight={itemStatusOptions.length * SIZES.height}
            // style={{
            //   height: 4,
            // }}
            labelStyle={{
              ...FONTS.body5,
            }}
            itemStyle={{
              justifyContent: 'flex-start',
              paddingHorizontal: SIZES.padding,
              //   height: '50%',
            }}
          />

          <Text>{item.title}</Text>
          <Text>
            {item.category} • {timeSince(item.date)}
          </Text>
          <Text>{item.description}</Text>
          <Text>
            {item.chats} chats • {item.favorites} favourites • {item.views}{' '}
            views
          </Text>
        </View>

        {/* REPORT THIS POST  */}
        <View
          style={{
            height: SIZES.height * 0.08,
            backgroundColor: 'yellow',
          }}>
          <Text>Report Seller</Text>
        </View>

        {/* OTHER ITEMS FROM SELLER */}
        {sellerAllItems.length === 1 && (
          <View
            style={{
              height: SIZES.height * 0.6,
              backgroundColor: 'pink',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: SIZES.padding * 2,
              }}>
              <Text>Other items by {seller.userName}</Text>

              {/* SEE ALL ITEMS BUTTON */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('sellerItemsTabs', {
                    items: sellerAllItems,
                  });
                }}>
                <Text>See all</Text>
              </TouchableOpacity>
            </View>
            {/* FOUR OTHER ITEMS */}
            <SellerOtherItems
              itemId={itemId}
              items={sellerAllItems}
              navigation={navigation}
            />
            <SafeAreaView />
          </View>
        )}
      </KeyboardAwareScrollView>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            dispatch({
              type: isFav ? actions.FAVOURITE_REMOVED : actions.FAVOURITE_ADDED,
              userId,
              payload: {
                sellerId,
                itemId,
              },
            });
          }}>
          <Icon
            name={isFav ? 'heart' : 'heart-outline'}
            size={30}
            color={isFav ? COLORS.primary : null}
          />
        </TouchableOpacity>

        <View>
          <Text>$ {item.price}</Text>
          <Text>Make Offer</Text>
        </View>
        {/* <View> */}
        <TouchableOpacity
          style={{
            borderColor: 'black',
            borderWidth: 1,
            backgroundColor: COLORS.primary,
          }}>
          <Text style={{color: COLORS.white}}>Chat</Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </View>
  );
}
