import * as React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {COMMON_STYLES} from '../theme/common-styles';

const ScreenLoading: React.FC = () => {
  return (
    <View style={COMMON_STYLES.flexCenter}>
      <ActivityIndicator
        testID="screen-loader"
        size="large"
        color="darkslateblue"
      />
    </View>
  );
};

export default ScreenLoading;
