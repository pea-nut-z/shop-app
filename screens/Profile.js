import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Header, RatingEmoji} from '../components';
import {SIZES, COLORS} from '../constants';
import Tooltip from 'rn-tooltip';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Profile({route, navigation}) {
  const {userId} = route.params;
  const userInfo = useSelector((state) => state.members[userId]);
  const [popupMenu, setPopupMenu] = useState(false);

  const numOfItems = useSelector(
    (state) => Object.keys(state.listings[userId]).length,
  );
  console.log({numOfItems});

  const showPopupMenu = () => {
    setPopupMenu(true);
  };

  const hidePopupMenu = () => {
    setPopupMenu(false);
  };

  const renderPopUpMenu = () => {
    // check if navigating seller or user's profile
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditProfile', {userId});
          setPopupMenu(false);
        }}
        style={{
          height: 40,
          width: 120,
          position: 'absolute',
          backgroundColor: COLORS.white,
          borderWidth: 1,
          borderColor: COLORS.secondary,
          justifyContent: 'center',
          paddingHorizontal: SIZES.padding * 2,
          top: -50,
          right: SIZES.padding * 2,
          shadowOffset: {width: 3, height: 3},
          shadowColor: COLORS.darkgray,
          shadowOpacity: 0.6,
        }}>
        <Text>Edit</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'pink'}}>
      <Header
        userId={userId}
        navigation={navigation}
        title={'Profile'}
        showPopupMenu={showPopupMenu}
        useBackBtn={true}
        useRightBtns={['ellipsis-vertical-circle-outline']}
      />
      <View>{popupMenu && renderPopUpMenu()}</View>
      <TouchableWithoutFeedback onPress={() => hidePopupMenu()}>
        <View style={{flex: 1, backgroundColor: 'pink'}}>
          <View
            style={{flex: 1, flexDirection: 'row', backgroundColor: 'green'}}>
            {userInfo.displayPic !== 'N/A' ? (
              <Image
                source={{uri: userInfo.displayPic}}
                resizeMode={'contain'}
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: COLORS.secondary,
                  borderRadius: 50,
                }}
              />
            ) : (
              <Icon
                name={'person-circle-outline'}
                size={100}
                color={COLORS.secondary}
              />
            )}
            <View style={{justifyContent: 'center'}}>
              <Text>{userInfo.username}</Text>
              <Text>#{userId}</Text>
            </View>
          </View>
          <View style={{flex: 1, backgroundColor: 'yellow'}}>
            <View>
              <Tooltip
                popover={
                  <Text>
                    This is calculated using a mix of reviews, praises and
                    disapprovals. Everyone starts at 30!
                  </Text>
                }
                backgroundColor={COLORS.primary}
                containerStyle={{flexDirection: 'row'}}
                withOverlay={false}
                width={200}
                height={100}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{textDecorationLine: 'underline'}}>
                    ShopApp Rating
                  </Text>
                  <Text> ⓘ</Text>
                </View>
              </Tooltip>
            </View>
            <View style={{flexDirection: 'row'}}>
              {/* RATING BAR */}
              <RatingEmoji rating={userInfo.rating} />
              <Text>{userInfo.rating}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: SIZES.padding * 2,
            }}>
            <View style={{flexDirection: 'row', width: '50%'}}>
              <Icon name={'heart-outline'} size={25} color={COLORS.primary} />
              <View>
                <Text>Recommended - %</Text>
                <Text>No data yet</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', width: '50%'}}>
              <Icon
                name={'chatbubble-outline'}
                size={25}
                color={COLORS.primary}
              />
              <View>
                <Text>Response - %</Text>
                <Text>No data yet</Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1, backgroundColor: 'green'}}>
            <Text>Verified 'NUM OF TIMES HERE!!!!' in {userInfo.location}</Text>
            <Text>Joined {userInfo.joined} (ACTIVE SINCE WHEN???)</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('userItemsTabs', {userId})}
            style={{
              flex: 1,
              backgroundColor: 'yellow',
              flexDirection: 'row',
              paddingHorizontal: SIZES.padding * 2,
              justifyContent: 'space-between',
            }}>
            <Text>{numOfItems} items</Text>
            <Icon name={'chevron-forward-outline'} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Feedback', {userId})}
            style={{
              flex: 1,
              backgroundColor: 'pink',
              flexDirection: 'row',
              paddingHorizontal: SIZES.padding * 2,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text>Feedback</Text>
              <Text>No positive feedback yet</Text>
            </View>
            <Icon name={'chevron-forward-outline'} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'green',
              flexDirection: 'row',
              paddingHorizontal: SIZES.padding * 2,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text>0 reviews</Text>
              <Text>No reviews yet</Text>
            </View>
            <Icon name={'chevron-forward-outline'} size={25} />
          </TouchableOpacity>
          <SafeAreaView />

          {/* ENDS */}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
