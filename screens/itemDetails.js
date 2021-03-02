import React, {useState} from 'react';
import {connect} from 'react-redux';
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
  DisplaySellerOtherItems,
} from '../components';

import {FONTS, SIZES, categoryList, itemStatusDropDown} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {timeSince} from '../helper';

function itemDetails({listings, route, navigation}) {
  const [itemStatus, setItemStatus] = useState('Active');
  const {sellerId, itemId} = route.params;

  // SELLER INFO
  const seller = listings[sellerId];
  //  ITEM INFO
  const items = seller['items'];
  const item = seller['items'][itemId];
  const itemImages = item['images'];
  const imagesProvided = itemImages.length === 0 ? false : true;

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
      <KeyboardAwareScrollView extraHeight={0} enableOnAndroid>
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
            items={itemStatusDropDown}
            containerStyle={{
              width: 100,
              height: 40,
              margin: SIZES.padding * 2,
            }}
            placeholder={itemStatus}
            onChangeItem={(item) => setItemStatus(item.value)}
            dropDownMaxHeight={itemStatusDropDown.length * SIZES.height}
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

            {/* SEE ALL ITEM BUTTON */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('sellerItemsTabs', {
                  seller,
                  items,
                });
              }}>
              <Text>See all</Text>
            </TouchableOpacity>
          </View>
          <DisplaySellerOtherItems
            sellerId={sellerId}
            itemId={itemId}
            items={items}
            navigation={navigation}
          />
          <SafeAreaView />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    listings: state.listings,
  };
}

export default connect(mapStateToProps)(itemDetails);
