import {DefaultTheme} from '@react-navigation/native';
import * as React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BasketCard from '../components/basket-card';
import Spacing from '../components/spacing';
import {ProductListScreenProps} from '../navigation/types';
import {
  FavoritedProduct,
  useFavoriteProducts,
  useProductActions,
} from '../store/product';
import {COMMON_STYLES} from '../theme/common-styles';
import {getWindowHeight} from '../utils/layout';

const getBasketTotalPrice = (favoritedProducts: Array<FavoritedProduct>) => {
  return favoritedProducts
    .reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0)
    .toFixed(2);
};

type Props = ProductListScreenProps;

const BasketScreen: React.FC<Props> = () => {
  const {
    increaseFavoritedProductQuantity,
    decreaseFavoritedProductQuantity,
    removeFavoritedProduct,
  } = useProductActions();

  const favoritedProducts = useFavoriteProducts();
  const {bottom} = useSafeAreaInsets();

  const renderBasketItem = ({
    item: {product, quantity},
  }: ListRenderItemInfo<FavoritedProduct>) => {
    return (
      <BasketCard
        key={product.id}
        product={product}
        quantity={quantity}
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

  const renderListEmptyComponent = () => (
    <View style={COMMON_STYLES.flexCenter}>
      <Text>Your basket is empty</Text>
    </View>
  );

  return (
    <View style={COMMON_STYLES.flex}>
      <FlatList
        data={favoritedProducts}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderListEmptyComponent}
        ItemSeparatorComponent={renderSeparatorComponent}
        renderItem={renderBasketItem}
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
