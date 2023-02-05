import * as React from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Product} from '../api/product/types';
import {getPriceText} from '../utils/get-price-text';
import {getWindowHeight, getWindowWidth} from '../utils/layout';
import Spacing from './spacing';

type Props = Product & {
  onPress: () => void;
  isFavorited?: boolean;
  onFavoritePress: () => void;
  testID?: string;
  favoritePressableTestID?: string;
};

const ProductListCard: React.FC<Props> = ({
  title,
  image,
  price,
  rating,
  onPress,
  onFavoritePress,
  favoritePressableTestID,
  isFavorited = false,
  testID,
}) => {
  return (
    <Pressable testID={testID} onPress={onPress} style={styles.root}>
      <Image style={styles.image} resizeMode="contain" source={{uri: image}} />

      <Pressable
        testID={favoritePressableTestID}
        style={styles.heartIcon}
        onPress={onFavoritePress}>
        <MaterialCommunityIcons
          size={24}
          color={isFavorited ? 'darkslateblue' : 'grey'}
          name={isFavorited ? 'heart' : 'heart-outline'}
        />
      </Pressable>

      <Spacing height={12} />

      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>

      <Text style={styles.price}>{getPriceText(price)}</Text>

      <Text style={styles.price}>
        {rating.rate} ({rating.count})
      </Text>
    </Pressable>
  );
};

export default ProductListCard;

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFF',
    height: getWindowHeight(30),
    justifyContent: 'space-between',
    width: getWindowWidth(42.5),
    borderRadius: 8,
    padding: 16,
  },
  heartIcon: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  image: {
    height: getWindowHeight(15),
    width: getWindowWidth(35),
    marginTop: 6,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    marginTop: 4,
    textAlign: 'center',
  },
});
