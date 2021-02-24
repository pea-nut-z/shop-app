import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
  Alert,
  FlatList,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {COLORS, SIZES, FONTS, categoryList} from '../constants';
import {Header} from '../components';
import CurrencyInput from 'react-native-currency-input';
import Textarea from 'react-native-textarea';
import DropDownPicker from 'react-native-dropdown-picker';
import store from '../store/store';
import {listAdded} from '../store/actions';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function Sell({navigation}) {
  const [numOfImg, setNumOfImg] = useState(0);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState();
  const [free, setFree] = useState(false);
  const [negotiable, setNegotiable] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Categories');
  const [description, setDescription] = useState('');
  const maxNumOfImg = 10;

  const dropDownList = categoryList.map((category) => ({
    label: category.name,
    value: category.name,
  }));

  useEffect(() => {
    if (price === 0) {
      setFree(true);
      setPrice(null);
    }
  }, [price]);

  function choosePhotoFromLibrary() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      setNumOfImg(numOfImg + 1);
      setImages([...images, {id: numOfImg, path: image.path}]);
    });
  }

  function renderImage({item}) {
    return (
      <View style={styles.imgContainer}>
        <ImageBackground
          source={{
            uri: item.path,
          }}
          style={styles.img}></ImageBackground>
        <TouchableOpacity
          onPress={() => deleteImg(item)}
          style={styles.deleteImgBtn}>
          <Icon name="close-circle" size={25} />
        </TouchableOpacity>
      </View>
    );
  }

  function deleteImg(item) {
    const filtered = images.filter((img) => {
      return img.id !== item.id;
    });
    setImages(filtered);
    setNumOfImg(numOfImg - 1);
  }

  function onDone() {
    if (!title) {
      Alert.alert('Enter a title');
    } else if (selectedCategory === 'Categories') {
      Alert.alert('Select a category');
    } else if (!description) {
      Alert.alert('Enter a description');
    } else if (description.length < 20) {
      Alert.alert('Tell us a bit more - minimum 20 characters');
    } else {
      store.dispatch(
        listAdded(
          images,
          title,
          price,
          free,
          negotiable,
          selectedCategory,
          description,
        ),
      );
      console.log(store.getState());
    }
  }

  return (
    <>
      {/* <KeyboardAwareView animated={true} useNative={true}> */}
      <SafeAreaView>
        <Header navigation={navigation} text={'Post For Sale'} />
        {/* DONE BUTTON */}
        <TouchableOpacity onPress={onDone} style={styles.doneBtn}>
          <Text style={{...FONTS.body2}}>Done</Text>
        </TouchableOpacity>
        {/* PCITURE UPLOAD */}
        <KeyboardAwareScrollView extraHeight={100} enableOnAndroid>
          <View
            style={{
              ...styles.container,
              ...styles.uploadImgContainer,
            }}>
            <TouchableOpacity
              onPress={() => {
                numOfImg < maxNumOfImg
                  ? choosePhotoFromLibrary()
                  : Alert.alert('Choose up to 10 images');
              }}
              style={styles.uploadImgBtn}>
              <Icon name="camera" size={25} color={COLORS.secondary} />
              <Text>
                {numOfImg} / {maxNumOfImg}
              </Text>
            </TouchableOpacity>
            <FlatList
              data={images}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(img) => `${img.id}`}
              renderItem={renderImage}
            />
          </View>
          {/* TITLE */}
          <TextInput
            maxLength={64}
            onChangeText={setTitle}
            placeholder="Title"
            style={{...styles.container, ...styles.regularHeight}}
          />
          {/* PRICE */}
          <CurrencyInput
            value={price}
            onChangeValue={setPrice}
            // defaultValue={price}
            unit="$  "
            delimiter=","
            separator="."
            precision={2}
            maxValue={9999999.99}
            ignoreNegative={true}
            placeholder="$ Enter price"
            placeholderTextColor={
              free ? COLORS.primary : price ? COLORS.black : COLORS.secondary
            }
            style={{
              ...styles.container,
              ...styles.regularHeight,
            }}
          />
          {/* FREE LABEL */}
          {free && (
            <TouchableOpacity
              onPress={() => {
                setFree(false);
              }}
              style={styles.freeLabel}>
              <Text style={{color: COLORS.primary}}>Free X</Text>
            </TouchableOpacity>
          )}
          {/* NEGOTIABLE */}
          <TouchableOpacity
            style={styles.checkMarkContainer}
            onPress={() => {
              setNegotiable(!negotiable);
            }}>
            <Icon
              name="checkmark-circle-outline"
              size={25}
              color={negotiable ? COLORS.primary : COLORS.secondary}
            />
            <Text
              style={{
                ...FONTS.body3,
                color: negotiable ? COLORS.black : COLORS.secondary,
              }}>
              Negotiable
            </Text>
          </TouchableOpacity>
          {/* CATEGORIES */}
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
            labelStyle={{
              ...FONTS.body3,
            }}
            itemStyle={{
              justifyContent: 'flex-start',
              paddingHorizontal: SIZES.padding * 2,
            }}
          />
          {/* DESCRIPTION */}
          <View style={{height: 450}}>
            <Textarea
              containerStyle={{
                ...styles.container,
                ...styles.textareaContainer,
              }}
              onChangeText={setDescription}
              maxLength={600}
              placeholder={'Describe your item in as much detail as you can.'}
              underlineColorAndroid={'transparent'}
              style={styles.textarea}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  doneBtn: {
    height: 35,
    justifyContent: 'center',
    position: 'absolute',
    top: SIZES.height * 0.07,
    right: SIZES.padding * 2,
  },
  container: {
    width: SIZES.width,
    paddingHorizontal: SIZES.padding * 2,
    borderWidth: 1,
    borderColor: COLORS.transparent,
    borderBottomColor: COLORS.secondary,
    ...FONTS.body3,
    // flex: 1,
  },
  uploadImgContainer: {
    height: SIZES.height * 0.132,
    alignItems: 'center',
    flexDirection: 'row',
  },
  uploadImgBtn: {
    height: SIZES.width / 5,
    width: SIZES.width / 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginRight: SIZES.padding,
  },
  imgContainer: {
    height: SIZES.width / 5,
    width: SIZES.width / 5,
    marginRight: SIZES.padding,
  },
  img: {
    height: '100%',
    width: '100%',
  },
  deleteImgBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  regularHeight: {
    height: SIZES.height * 0.066,
    justifyContent: 'center',
  },
  freeLabel: {
    height: 30,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    position: 'absolute',
    top: SIZES.height * 0.332,
    marginLeft: SIZES.padding * 3.45,
    backgroundColor: COLORS.lightGray3,
  },
  checkMarkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: SIZES.height * 0.217,
    right: SIZES.padding * 2,
  },
  checkMark: {
    width: 20,
    height: 20,
    marginRight: SIZES.padding,
  },
  dropDown: {
    position: 'absolute',
    top: 0,
  },
  textareaContainer: {
    top: SIZES.height * 0.066,
    height: SIZES.height * 0.43,
  },
  textarea: {
    textAlignVertical: 'top',
    ...FONTS.body3,
  },
});
