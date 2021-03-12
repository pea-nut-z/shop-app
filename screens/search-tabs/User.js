import React, {useEffect, useMemo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ItemCards} from '../../components';
import {filterMembers} from '../../store/selectors';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

export default function User({useId, navigation, submittedSearchString}) {
  const focused = useIsFocused();

  const getMembers = useMemo(filterMembers, []);
  const members = useSelector((state) => {
    if (focused && submittedSearchString) {
      return getMembers(state, 'string', submittedSearchString);
    }
  });

  const renderMemberCards = () => {
    if (focused && submittedSearchString && members) {
      return members.map((member, index) => {
        return (
          <TouchableOpacity
            key={`member-${index}`}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image
                source={{
                  uri: member.displayPic,
                }}
                resizeMode={'contain'}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
            </View>
            <View>
              <Text>
                {member.userName} #{member.memberId}
              </Text>
              <Text>{member.location}</Text>
            </View>
          </TouchableOpacity>
        );
      });
    }
  };

  return <View>{renderMemberCards()}</View>;
}
