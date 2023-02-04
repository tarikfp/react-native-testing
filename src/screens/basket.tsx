import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteNames} from '../navigation/route-names';
import {ProductListScreenProps} from '../navigation/types';
import {useFavoriteProducts, useProductActions} from '../store/product';
import {COMMON_STYLES} from '../theme/common-styles';

type Props = ProductListScreenProps;

const BasketScreen: React.FC<Props> = ({navigation}) => {
  const {updateProductQuantity} = useProductActions();
  const favoritedProducts = useFavoriteProducts();

  const onProductCardPress = React.useCallback(
    (productId: number) => () => {
      navigation.navigate(RouteNames.productDetail, {id: productId});
    },
    [navigation],
  );

  return (
    <SafeAreaView style={COMMON_STYLES.flex} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        style={styles.root}>
        <View style={styles.productsContainer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BasketScreen;

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
