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
import {Header, HeaderButton, CircleButton, BarButton} from '../components';
import {categoryButtonList} from '../buttonLists';

export default function Categories() {
  const [categories, setCategories] = React.useState(categoryButtonList);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [list, setList] = React.useState();

  function onSelectCategory(category) {
    // navigate to the filtered list

    //filter list of products for sale
    // let filteredList = products.filter((prod) =>
    //   prod.categories.includes(category.id),
    // );
    // setList(filteredList);
    // there category here should be the whole obj

    setSelectedCategory(category);
  }

  function renderCategories() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={styles.categories}
          onPress={() => onSelectCategory(item)}>
          <Image
            source={item.icon}
            resizeMode={'contain'}
            style={{
              width: 35,
              height: 35,
            }}
          />
          <View>
            <Text style={styles.categoryText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View>
        <Text style={styles.subHeader}>For Sale</Text>
        <FlatList
          data={categoryButtonList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item.name}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: 230,
          }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <Header text={'Categories'} />
      <View style={styles.headerButtons}>
        <HeaderButton iconSrc={icons.search} />
      </View>

      {renderCategories()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerButtons: {
    position: 'absolute',
    top: SIZES.height * 0.07,
    right: SIZES.padding * 2,
  },

  subHeader: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    ...FONTS.h4,
    fontWeight: 'bold',
  },
  categories: {
    flexDirection: 'row',
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
  },
  categoryText: {
    ...FONTS.h5,
    paddingLeft: SIZES.padding * 2,
    paddingTop: 10,
  },
});
