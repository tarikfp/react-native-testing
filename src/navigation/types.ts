import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteNames} from './route-names';

export type ProductStackParamList = {
  [RouteNames.productList]: undefined;
  [RouteNames.basket]: undefined;
  [RouteNames.productDetail]: {id: number};
};

export type ProductListScreenProps = NativeStackScreenProps<
  ProductStackParamList,
  RouteNames.productList
>;

export type ProductDetailScreenProps = NativeStackScreenProps<
  ProductStackParamList,
  RouteNames.productDetail
>;

export type BasketScreen = NativeStackScreenProps<
  ProductStackParamList,
  RouteNames.basket
>;
