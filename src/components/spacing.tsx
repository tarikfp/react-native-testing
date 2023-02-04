import * as React from 'react';
import {View} from 'react-native';

type Props = {
  height?: number;
  width?: number;
  backgroundColor?: string;
};

const Spacing: React.FC<Props> = ({
  height,
  width,
  backgroundColor = '#ffff',
}) => {
  return <View style={{height, width, backgroundColor}} />;
};

export default Spacing;
