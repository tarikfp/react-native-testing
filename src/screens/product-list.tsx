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
import {useProductActions, useProductsInBasket} from '../store/product';
import {COMMON_STYLES} from '../theme/common-styles';

type Props = ProductListScreenProps;

const ProductListScreen: React.FC<Props> = ({navigation}) => {
  const {data, isLoading, refetch, isError, isSuccess} = useGetAllProducts();

  const {isRefetchingByUser, refetchByUser} = useRefreshByUser(refetch);

  const {addProductToBasket, removeProductFromBasket} = useProductActions();
  const productsInBasket = useProductsInBasket();

  const onAddToBasketPress = React.useCallback(
    (product: Product) => () => {
      if (
        productsInBasket.find(
          productInBasket => productInBasket.product.id === product.id,
        )
      ) {
        removeProductFromBasket(product.id);
      } else {
        addProductToBasket(product);
      }
    },
    [addProductToBasket, productsInBasket, removeProductFromBasket],
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
        basketButtonTestID={`basket-button-${product.id}`}
        isInBasket={
          typeof productsInBasket.find(
            productInBasket => productInBasket.product.id === product.id,
          ) !== 'undefined'
        }
        onAddToBasketPress={onAddToBasketPress(product)}
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
          accessibilityLabel="product-list-flat-list"
          testID="product-list-flat-list"
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
          style={COMMON_STYLES.flex}
        />
      )}
    </SafeAreaView>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    padding: COMMON_STYLES.screenPadding,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
