import React from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import {icons, COLORS, SIZES, FONTS} from '../constants';
import Tooltip from 'rn-tooltip';

export default function MemberRating({
  rating,
  explanation,
  numOfReviews,
  atItemDetails,
}) {
  const styleVariables = atItemDetails ? styles.itemDetails : styles.profile;
  const textVariables = atItemDetails
    ? styles.itemDetailsText
    : styles.profileText;

  const emojiName =
    rating <= 2 ? icons.unamused : rating >= 4 ? icons.excited : icons.happy;

  const numerOfStars = [1, 2, 3, 4, 5];

  return (
    <View
      style={{
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      {/* <NUM OF REVIEWS */}
      <Text style={textVariables}>
        {numOfReviews} Review{numOfReviews > 1 ? 's' : null}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* STARS */}
        <View
          style={{
            flexDirection: 'row',
          }}>
          {numerOfStars.map((num, index) => {
            return rating >= num ? (
              <Icon
                key={`star-${index}`}
                name={'star'}
                size={styleVariables.height}
                color={COLORS.primary}
              />
            ) : (
              <Icon
                key={`star-${index}`}
                name={'star-outline'}
                size={styleVariables.height}
                color={COLORS.primary}
              />
            );
          })}
        </View>
        {/*  EMOJI */}
        <Image source={emojiName} resizeMode="contain" style={styleVariables} />
      </View>

      {/* TOOLTIP */}
      <Tooltip
        popover={
          <Text style={{color: COLORS.white}}>
            The review rating is calculated by using an average.
          </Text>
        }
        backgroundColor={COLORS.primary}
        containerStyle={{flexDirection: 'row'}}
        withOverlay={false}
        width={150}
        height={80}>
        <View
          style={{
            marginTop: SIZES.padding / 2,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{textDecorationLine: 'underline'}}>ShopApp Rating</Text>
          <Text> ⓘ</Text>
        </View>
      </Tooltip>
    </View>
  );
}

const styles = StyleSheet.create({
  profileText: {
    ...FONTS.h4,
    textAlign: 'center',
  },
  profile: {
    width: 35,
    height: 35,
    marginLeft: SIZES.padding / 2,
  },
  itemDetailsText: {
    ...FONTS.body4,
    textAlign: 'center',
  },
  itemDetails: {
    width: 25,
    height: 25,
    marginLeft: SIZES.padding / 2,
  },
});
