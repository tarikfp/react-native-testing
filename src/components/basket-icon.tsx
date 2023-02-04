import * as React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  onPress: () => void;
  productCount: number;
};

const BasketIcon: React.FC<Props> = ({onPress, productCount}) => {
  return (
    <Pressable onPress={onPress}>
      {productCount > 0 && (
        <View style={styles.productCountTextContainer}>
          <Text style={styles.productCountText}>{productCount}</Text>
        </View>
      )}

      <MaterialCommunityIcons
        disabled
        name="basket"
        color="darkslateblue"
        size={28}
      />
    </Pressable>
  );
};

export default BasketIcon;

const styles = StyleSheet.create({
  productCountText: {
    color: 'white',
    fontSize: 12,
  },
  productCountTextContainer: {
    top: -5,
    backgroundColor: 'darkslateblue',
    borderRadius: 999,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    right: -10,
    position: 'absolute',
  },
});
