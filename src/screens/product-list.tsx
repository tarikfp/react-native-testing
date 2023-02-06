import {DefaultTheme} from '@react-navigation/native';
import * as React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Product, useGetAllProducts} from '../api/product';
import ProductListCard from '../components/product-list-card';
import ScreenLoading from '../components/screen-loading';
import Spacing from '../components/spacing';
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

  const renderItemSeparator = () => (
    <Spacing
      backgroundColor={DefaultTheme.colors.background}
      height={COMMON_STYLES.screenPadding}
    />
  );

  const getKeyExtractor = (item: Product) => item.id.toString();

  const renderItem = ({item: product}: ListRenderItemInfo<Product>) => {
    return (
      <ProductListCard
        {...product}
        testID={`product-list-card-${product.id}`}
        favoritePressableTestID={`favorite-pressable-${product.id}`}
        isFavorited={
          typeof favoritedProducts.find(
            favoritedProduct => favoritedProduct.product.id === product.id,
          ) !== 'undefined'
        }
        onFavoritePress={onFavoriteProductPress(product)}
        onPress={onProductCardPress(product.id)}
      />
    );
  };

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

      {isSuccess && (
        <FlatList<Product>
          data={data}
          testID="product-list-scroll-view"
          refreshControl={
            <RefreshControl
              refreshing={isRefetchingByUser}
              onRefresh={refetchByUser}
            />
          }
          renderItem={renderItem}
          numColumns={2}
          ItemSeparatorComponent={renderItemSeparator}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          keyExtractor={getKeyExtractor}
          style={styles.root}
        />
      )}
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
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
