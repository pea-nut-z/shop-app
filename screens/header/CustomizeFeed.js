import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {categoryOptions, COLORS} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actionTypes';
import {Header} from '../../components';

export default function CustomizeFeed({route, navigation}) {
  const {userId} = route.params;
  // const [feeds, setFeeds] = useState([])

  const feed = useSelector((state) => state.feeds[userId]);
  const dispatch = useDispatch();

  return (
    <View>
      <Header
        navigation={navigation}
        useBackBtn={true}
        title={'Customize feed'}
      />
      <Text>
        Personalized your feed.{'\n'}
        Choose the categories you want to see on the Home feed.
      </Text>
      <Text>At leadt one category must be chosen</Text>
      <View>
        {categoryOptions.map((option, index) => {
          return (
            <TouchableOpacity
              key={`option-${index}`}
              onPress={() => {
                dispatch({
                  type: feed.includes(option.name)
                    ? actions.FEED_REMOVED
                    : actions.FEED_ADDED,
                  userId,
                  // payload: {
                  feed: option.name,
                  // },
                });
              }}>
              <Icon
                name="checkmark-circle-outline"
                size={25}
                color={
                  feed.includes(option.name) ? COLORS.primary : COLORS.secondary
                }
              />
              <Text>{option.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
