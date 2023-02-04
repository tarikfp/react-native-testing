import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {FavoritedProduct} from '../store/product';
import {COMMON_STYLES} from '../theme/common-styles';
import {getWindowHeight, getWindowWidth} from '../utils/layout';
import QuantityToggler from './quantity-toggler';

type BasketCardProps = FavoritedProduct &
  React.ComponentProps<typeof QuantityToggler>;

const BasketCard: React.FC<BasketCardProps> = ({
  product: {title, image},
  ...quantityTogglerProps
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.body}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{uri: image}}
        />
        <Text style={COMMON_STYLES.flex} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <QuantityToggler
        {...quantityTogglerProps}
        style={styles.quantityToggler}
      />
    </View>
  );
};

export default BasketCard;

const styles = StyleSheet.create({
  root: {
    height: getWindowHeight(12.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  quantityToggler: {
    flex: 0.5,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    justifyContent: 'space-between',
  },
  image: {
    width: getWindowWidth(8),
    height: getWindowHeight(8),
    marginRight: 12,
  },
  rightContainer: {
    flex: 0.35,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionBtn: {
    backgroundColor: '#e2e2e2',
    borderRadius: 8,
    padding: 2,
  },
});
