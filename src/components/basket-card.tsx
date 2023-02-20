import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ProductInBasket} from '../store/product';
import {getWindowHeight, getWindowWidth} from '../utils/layout';
import QuantityToggler from './quantity-toggler';

type BasketCardProps = ProductInBasket &
  React.ComponentProps<typeof QuantityToggler> & {
    testID?: string;
    quantityTogglerUniqueID?: string;
  };

const BasketCard: React.FC<BasketCardProps> = ({
  product: {title, image, price},
  testID,
  quantityTogglerUniqueID,
  ...quantityTogglerProps
}) => {
  return (
    <View testID={testID} style={styles.root}>
      <View style={styles.body}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{uri: image}}
        />
        <View style={styles.midContainer}>
          <Text numberOfLines={1}>{title}</Text>
          <Text style={styles.priceText} numberOfLines={1}>
            $ {price}
          </Text>
        </View>
      </View>

      <QuantityToggler
        {...quantityTogglerProps}
        uniqueID={quantityTogglerUniqueID}
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
    height: '100%',
    alignItems: 'center',
    marginRight: 12,
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
  midContainer: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  priceText: {
    marginTop: 4,
  },
});
