import * as React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  quantity: number;
  onIncreaseQuantityPress: () => void;
  onDecreaseQuantityPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const QuantityToggler: React.FC<Props> = ({
  quantity,
  onDecreaseQuantityPress,
  onIncreaseQuantityPress,
  style,
}) => {
  return (
    <View style={[styles.root, style]}>
      <Pressable
        onPress={onDecreaseQuantityPress}
        style={quantity === 0 ? styles.disabledActionBtn : styles.actionBtn}>
        <MaterialCommunityIcons name="minus" size={24} color="#fff" />
      </Pressable>

      <Text style={styles.quantityText}>{quantity}</Text>

      <Pressable onPress={onIncreaseQuantityPress} style={styles.actionBtn}>
        <MaterialCommunityIcons name="plus" size={24} color="#ffff" />
      </Pressable>
    </View>
  );
};

export default QuantityToggler;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  actionBtn: {
    backgroundColor: 'darkslateblue',
    borderRadius: 8,
    padding: 2,
  },
  disabledActionBtn: {
    backgroundColor: '#e1e1e1',
    borderRadius: 8,
    padding: 2,
  },
  quantityText: {
    width: 50,
    textAlign: 'center',
  },
});
