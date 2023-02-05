import * as React from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Product, useGetAllProducts} from '../api/product';
import ProductListCard from '../components/product-list-card';
import ScreenLoading from '../components/screen-loading';
import useRefreshByUser from '../hooks/useRefreshByUser';
import {RouteNames} from '../navigation/route-names';
import {ProductListScreenProps} from '../navigation/types';
import {useFavoriteProducts, useProductActions} from '../store/product';
import {COMMON_STYLES} from '../theme/common-styles';

type Props = ProductListScreenProps;

const ProductListScreen: React.FC<Props> = ({navigation}) => {
  const {data, isLoading, refetch, isError, isSuccess} = useGetAllProducts();

  const {isRefetchingByUser, refetchByUser} = useRefreshByUser(refetch);

  const {addFavoriteProduct, removeFavoritedProduct} = useProductActions();
  const favoritedProducts = useFavoriteProducts();

  const onFavoriteProductPress = React.useCallback(
    (product: Product) => () => {
      // product is already favorited
      if (
        favoritedProducts.find(
          favoritedProduct => favoritedProduct.product.id === product.id,
        )
      ) {
        removeFavoritedProduct(product.id);
      } else {
        addFavoriteProduct(product);
      }
    },
    [addFavoriteProduct, favoritedProducts, removeFavoritedProduct],
  );

  const onProductCardPress = React.useCallback(
    (productId: number) => () => {
      navigation.navigate(RouteNames.productDetail, {id: productId});
    },
    [navigation],
  );

  if (isLoading) {
    return <ScreenLoading />;
  }

  return (
    <SafeAreaView style={COMMON_STYLES.flex} edges={['bottom']}>
      {isError && (
        <View style={COMMON_STYLES.flexCenter}>
          <Text>An error occurred</Text>
        </View>
      )}

      <ScrollView
        testID="product-list-scroll-view"
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
          />
        }
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        style={styles.root}>
        <View style={styles.productsContainer}>
          {isSuccess &&
            data?.map(product => (
              <ProductListCard
                key={product.id}
                {...product}
                testID={`product-list-card-${product.id}`}
                favoritePressableTestID={`favorite-pressable-${product.id}`}
                isFavorited={
                  typeof favoritedProducts.find(
                    favoritedProduct =>
                      favoritedProduct.product.id === product.id,
                  ) !== 'undefined'
                }
                onFavoritePress={onFavoriteProductPress(product)}
                onPress={onProductCardPress(product.id)}
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    padding: COMMON_STYLES.screenPadding,
  },
  productsContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: COMMON_STYLES.screenPadding,
  },
});