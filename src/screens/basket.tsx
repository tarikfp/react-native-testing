/* eslint-disable react/no-unstable-nested-components */
import {DefaultTheme} from '@react-navigation/native';
import * as React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BasketCard from '../components/basket-card';
import DeleteIcon from '../components/delete-icon';
import Spacing from '../components/spacing';
import {ProductListScreenProps} from '../navigation/types';
import {
  FavoritedProduct,
  useFavoriteProducts,
  useProductActions,
} from '../store/product';
import {COMMON_STYLES} from '../theme/common-styles';
import {getBasketTotalPrice} from '../utils/get-basket-total-price';
import {getWindowHeight} from '../utils/layout';

type Props = ProductListScreenProps;

const BasketScreen: React.FC<Props> = ({navigation}) => {
  const {
    increaseFavoritedProductQuantity,
    decreaseFavoritedProductQuantity,
    removeFavoritedProduct,
    resetFavoritedProducts,
  } = useProductActions();

  const favoritedProducts = useFavoriteProducts();

  React.useEffect(() => {
    if (favoritedProducts.length > 0) {
      navigation.setOptions({
        headerRight: () => <DeleteIcon onPress={resetFavoritedProducts} />,
      });
    }
  }, [favoritedProducts.length, navigation, resetFavoritedProducts]);

  const renderBasketItem = ({
    item: {product, quantity},
  }: ListRenderItemInfo<FavoritedProduct>) => {
    return (
      <BasketCard
        product={product}
        testID={`basket-card-${product.id}`}
        quantity={quantity}
        quantityTogglerUniqueID={product.id.toString()}
        onIncreaseQuantityPress={() =>
          increaseFavoritedProductQuantity(product.id)
        }
        onDecreaseQuantityPress={() => {
          if (quantity === 1) {
            removeFavoritedProduct(product.id);
          } else {
            decreaseFavoritedProductQuantity(product.id);
          }
        }}
      />
    );
  };

  const renderSeparatorComponent = () => (
    <Spacing backgroundColor={DefaultTheme.colors.background} height={16} />
  );

  const getKeyExtractor = (item: FavoritedProduct) =>
    item.product.id.toString();

  const renderListEmptyComponent = () => (
    <View style={COMMON_STYLES.flexCenter}>
      <Text>Your basket is empty</Text>
    </View>
  );

  return (
    <View style={COMMON_STYLES.flex}>
      <FlatList
        data={favoritedProducts}
        testID="basket-screen-flat-list"
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderListEmptyComponent}
        ItemSeparatorComponent={renderSeparatorComponent}
        renderItem={renderBasketItem}
        keyExtractor={getKeyExtractor}
        style={styles.root}
      />

      {favoritedProducts.length > 0 && (
        <View style={styles.summaryContainer}>
          <Text style={styles.totalPrice}>{'Total Price: '}</Text>
          <Text style={styles.priceText}>
            $ {getBasketTotalPrice(favoritedProducts)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: DefaultTheme.colors.background,
    padding: COMMON_STYLES.screenPadding,
  },
  basketItemsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  summaryContainer: {
    height: getWindowHeight(10),
    width: '100%',
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: COMMON_STYLES.screenPadding,
  },
  totalPrice: {
    fontSize: 18,
    textAlign: 'left',
  },
  priceText: {
    textAlign: 'right',
    fontSize: 18,
    width: 150,
  },
});
