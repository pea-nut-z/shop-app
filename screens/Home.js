import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {
  COLORS,
  icons,
  // images,
  SIZES,
  FONTS,
} from '../constants';
import {Header, HeaderButton, SellButton} from '../components';

export default function Home({navigation}) {
  function renderHeader() {
    return (
      <View style={{flexDirection: 'row', height: 50}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '90%',
              height: '100%',
              backgroundColor: COLORS.lightGray3,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3}}>SEARCH</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.search}
            resizeMode={'contain'}
            style={{
              width: 35,
              height: 35,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  // Dummy Data
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
      description: 'Microwave',
      location: 'Church Yonge Corridor',
      time: '24 mins. ago',
      price: '$50',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      description: 'Popcorn',
      location: 'Church Yonge Corridor',
      time: '31 mins. ago',
      price: '$10',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      description: 'Facial Care',
      location: 'Mount Pleasant West',
      time: '44 mins. ago',
      price: '$80',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
      description: 'Microwave',
      location: 'Church Yonge Corridor',
      time: '24 mins. ago',
      price: '$50',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      description: 'Microwave',
      location: 'Church Yonge Corridor',
      time: '24 mins. ago',
      price: '$50',
    },
  ];

  function renderItemsForSale() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            width: SIZES.width * 0.9,
            height: SIZES.height / 5,
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor: 'grey',
            // selectedCategory?.id == item.id ? COLORS.white : COLORS.lightGray,
            bottomBorder: 'solid black',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          // onPress={() => onSelectCategory(item)}
        >
          <Text
            style={{
              maxHeight: 30,
              margin: SIZES.padding,
              // color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
              ...FONTS.body5,
            }}>
            {item.description}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{padding: SIZES.padding * 2}}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingVertical: SIZES.padding * 2,
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* {renderHeader()} */}
      {renderItemsForSale()}
      <SellButton navigation={navigation} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray3,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});
