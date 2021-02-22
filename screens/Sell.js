import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
} from 'react-native';
import {COLORS, SIZES, FONTS, categoryList, icons} from '../constants';
import {Header} from '../components';
import CurrencyInput from 'react-native-currency-input';
import Textarea from 'react-native-textarea';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Sell() {
  const [price, setPrice] = useState();
  const [title, setTitle] = useState('');
  const [negotiable, setNegotiable] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Categories');
  const [description, setDescription] = useState('');
  console.log({title});

  const dropDownList = categoryList.map((category) => ({
    label: category.name,
    value: category.name,
  }));

  return (
    <>
      <SafeAreaView>
        <Header text={'Post For Sale'} />
        <View style={{...styles.container, ...styles.mediumHeight}} />
        <TextInput
          maxLength={64}
          onChangeText={setTitle}
          placeholder="Title"
          style={{...styles.container, ...styles.regularHeight}}
        />
        <CurrencyInput
          value={price}
          onChangeValue={setPrice}
          unit="$"
          delimiter=","
          separator="."
          precision={2}
          maxValue={9999999.99}
          ignoreNegative={true}
          placeholder="$ Enter price"
          style={{...styles.container, ...styles.regularHeight}}
        />
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => {
            setNegotiable(!negotiable);
          }}>
          <Image
            source={icons.check}
            resizeMode={'contain'}
            style={{
              width: 15,
              height: 15,
              marginRight: SIZES.padding,
              tintColor: negotiable ? COLORS.primary : COLORS.secondary,
            }}
          />
          <Text style={{color: negotiable ? COLORS.black : COLORS.secondary}}>
            Negotiable
          </Text>
        </TouchableOpacity>
        <DropDownPicker
          items={dropDownList}
          placeholder="Categories"
          onChangeItem={(item) => setSelectedCategory(item.value)}
          dropDownMaxHeight={dropDownList.length * SIZES.height}
          style={{
            ...styles.container,
            ...styles.dropDown,
            ...styles.regularHeight,
          }}
          itemStyle={{
            justifyContent: 'flex-start',
            paddingHorizontal: SIZES.padding * 2,
          }}
        />
        <Textarea
          onChangeText={setDescription}
          defaultValue={description}
          maxLength={600}
          placeholder={'Describe your item in as much detail as you can.'}
          underlineColorAndroid={'transparent'}
          containerStyle={{
            ...styles.container,
            ...styles.textarea,
          }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    paddingHorizontal: SIZES.padding * 2,
    borderWidth: 1,
    borderColor: COLORS.transparent,
    borderBottomColor: COLORS.secondary,
  },
  regularHeight: {
    height: SIZES.height * 0.066,
    justifyContent: 'center',
  },
  mediumHeight: {
    height: SIZES.height * 0.132,
  },
  checkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    top: SIZES.height * 0.335,
    right: SIZES.padding * 2,
  },
  dropDown: {
    position: 'absolute',
    top: 0,
  },
  textarea: {
    height: SIZES.height * 0.53,
    top: SIZES.height * 0.066,
    textAlignVertical: 'top',
  },
});
