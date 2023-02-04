import * as React from 'react';
import {Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  onPress: () => void;
  color: string;
};

const CloseIcon: React.FC<Props> = ({onPress, color}) => {
  return (
    <Pressable onPress={onPress}>
      <MaterialCommunityIcons color={color} disabled name="close" size={32} />
    </Pressable>
  );
};

export default CloseIcon;
