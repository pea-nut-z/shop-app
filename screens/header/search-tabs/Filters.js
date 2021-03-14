import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {Header} from '../../../components';
import {COLORS, categoryOptions, SIZES} from '../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import CurrencyInput from 'react-native-currency-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function Filters({navigation}) {
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  //   console.log({minPrice});
  //   console.log({maxPrice});
  //   console.log({sort});

  const clearFields = () => {
    setCategories([]);
    setSort(null);
    setMinPrice(null);
    setMaxPrice(null);
  };

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} useBackBtn={true} title={'Filter'} />

      {/* CATEGORIES */}
      <KeyboardAwareScrollView>
        <View
          style={{
            height: SIZES.height * 0.45,
            //   backgroundColor: 'red'
          }}>
          <Text>Categories</Text>
          {categoryOptions.map((option, index) => {
            return (
              <TouchableOpacity
                key={`option-${index}`}
                onPress={() =>
                  categories.includes(option.name)
                    ? setCategories([
                        ...categories.filter((name) => name !== option.name),
                      ])
                    : setCategories([...categories, option.name])
                }
                style={{flexDirection: 'row'}}>
                <Icon
                  name="checkmark-circle-outline"
                  size={25}
                  color={
                    categories.includes(option.name)
                      ? COLORS.primary
                      : COLORS.secondary
                  }
                />
                <Text>{option.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* SORT */}
        <View>
          <Text>Sort</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() =>
                sort === 'Relevance' ? setSort(sort) : setSort('Relevance')
              }
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name={sort === 'Relevance' ? 'ellipse' : 'ellipse-outline'}
                size={25}
                color={sort === 'Relevance' ? COLORS.primary : null}
              />
              <Text>Relevance</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                sort === 'Most recent' ? setSort(sort) : setSort('Most recent')
              }
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name={sort === 'Most recent' ? 'ellipse' : 'ellipse-outline'}
                size={25}
                color={sort === 'Most recent' ? COLORS.primary : null}
              />
              <Text>Most recent</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Price */}
        <View>
          <Text>Price</Text>
          <View
            style={{
              backgroundColor: 'green',
              flexDirection: 'row',
              paddingHorizontal: SIZES.padding * 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <CurrencyInput
              value={minPrice}
              onChangeValue={setMinPrice}
              // defaultValue={price}
              // unit="$  "
              delimiter=""
              separator=""
              precision={0}
              maxValue={9999999}
              ignoreNegative={true}
              placeholder="0"
              // placeholderTextColor={
              //   free ? COLORS.primary : price ? COLORS.black : COLORS.secondary
              // }
              style={{
                backgroundColor: 'red',
                width: SIZES.width / 2 - SIZES.padding * 8,
                height: 40,
              }}
            />
            <Text>~</Text>
            <CurrencyInput
              value={maxPrice}
              onChangeValue={setMaxPrice}
              // defaultValue={price}
              // unit="$  "
              delimiter=""
              separator=""
              precision={0}
              maxValue={9999999}
              ignoreNegative={true}
              placeholder="No limit"
              // placeholderTextColor={
              //   free ? COLORS.primary : price ? COLORS.black : COLORS.secondary
              // }
              style={{
                backgroundColor: 'red',
                width: SIZES.width / 2 - SIZES.padding * 8,
                height: 40,
              }}
            />
          </View>
        </View>

        {/* SEARCH RANGE */}
      </KeyboardAwareScrollView>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => clearFields()}
          style={{
            width: SIZES.width / 2,
            height: 65,
            backgroundColor: COLORS.secondary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Clear fields</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('searchTabs', {
              filters: {
                categories,
                sort,
                minPrice,
                maxPrice,
              },
            });
          }}
          style={{
            width: SIZES.width / 2,
            height: 65,
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: COLORS.white}}>Apply filter</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView />
    </View>
  );
}
