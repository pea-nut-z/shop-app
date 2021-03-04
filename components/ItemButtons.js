import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {icons, SIZES, FONTS, COLORS} from '../constants';
import {timeSince} from '../helper';

export default function ItemButtons({items, navigation}) {
  const renderItem = ({item}) => {
    const sellerId = item.sellerId;
    const itemId = item.itemId;
    const img = item['images'][0];
    return (
      <TouchableOpacity
        style={{height: 100, width: 100}}
        onPress={() =>
          navigation.navigate('itemDetails', {
            sellerId,
            itemId,
          })
        }>
        <Image
          source={typeof img === 'number' ? img : {uri: img}}
          resizeMode={'contain'}
          style={{
            width: 35,
            height: 35,
          }}
        />
        <View>
          <Text>{item.title}</Text>
          <Text>location?? • {timeSince(item.date)}</Text>
          <Text>$ {item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={items}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item.itemId}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 230,
        }}
      />
      {/* <Text>Hello</Text> */}
    </View>
  );
}
