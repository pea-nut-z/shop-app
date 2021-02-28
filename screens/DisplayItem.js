import React from 'react';
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
import {
  Header,
  BackButton,
  ImageScrollView,
  ScrollViewDots,
  RatingEmoji,
} from '../components';

import {FONTS, SIZES} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {timeSince} from '../helper';

function DisplayItem({listings, route, navigation}) {
  const {sellerId, itemId} = route.params;

  // SELLER INFO
  const seller = listings[sellerId];
  //  ITEM INFO
  const items = seller['items'];
  const item = seller['items'][itemId];
  const itemImages = item['images'];
  const imagesProvided = itemImages.length === 0 ? false : true;

  //   console.log({items});

  function renderSellerOtherItems(items) {
    for (const key in items) {
      let itemImages = items[key]['images'];
      if (itemImages.length === 0) continue;
      let itemFirstImg = items[key]['images'][0];
      let image = JSON.parse(JSON.stringify(itemFirstImg));
      console.log({image});
    }

    // items.forEach((item) => {
    //   <Image
    //     source={{
    //       uri: ,
    //     }}
    //     resizeMode="contain"
    //     style={{
    //       width: 40,
    //       height: 40,
    //       borderRadius: 100,
    //     }}
    //   />
    //   let image = item['images'];
    //   if (image.length === 0) return;
    //   image = JSON.parse(JSON.stringify(image));
    //   console.log({image});
    // });
  }

  return (
    // <View>
    //   <Text>Test</Text>
    // </View>

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
        <View
          style={{minHeight: SIZES.height * 0.16, backgroundColor: 'green'}}>
          {/* <DropDownPicker
            items={dropDownList}
            placeholder="Categories"
            onChangeItem={(item) => setCategory(item.value)}
            dropDownMaxHeight={dropDownList.length * SIZES.height}
            style={{
              ...styles.container,
              ...styles.dropDown,
              ...styles.regularHeight,
            }}
            labelStyle={{
              ...FONTS.body3,
            }}
            itemStyle={{
              justifyContent: 'flex-start',
              paddingHorizontal: SIZES.padding * 2,
            }}
          /> */}

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
          }}></View>
        {/* OTHER ITEMS FROM SELLER */}
        <View
          style={{
            //   height: SIZES.height * 0.24,
            backgroundColor: 'pink',
          }}>
          <Text>Other items by {seller.userName}</Text>
          <View>{renderSellerOtherItems(items)}</View>
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

export default connect(mapStateToProps)(DisplayItem);
