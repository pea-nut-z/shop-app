import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
export default function HeaderButton({iconSrc}) {
  return (
    <View>
      <TouchableOpacity>
        <Image
          source={iconSrc}
          resizeMode={'contain'}
          style={{
            width: 35,
            height: 35,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
