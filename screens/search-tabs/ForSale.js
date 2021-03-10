import React, {useMemo} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {
  Header,
  Subheader,
  HeaderButton,
  CircleButton,
  BarButton,
  FlatButtons,
} from '../../components';
import {selectAllListings} from '../../store/selectors';
import {useSelector} from 'react-redux';

export default function ForSale({userId, navigation, submittedSearchString}) {
  console.log({userId});
  console.log({submittedSearchString});

  const getAllListings = useMemo(selectAllListings, []);
  const allListings = useSelector((state) =>
    getAllListings(state.listings, state.members, userId),
  );

  return (
    <View>
      <Text>For Sale</Text>
      {/* ADD SEARCH ALERT */}

      {/* FILTER */}

      {/* LISTINGS */}
    </View>
  );
}
