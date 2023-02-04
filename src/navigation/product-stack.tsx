/* eslint-disable react/no-unstable-nested-components */
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import BasketIcon from '../components/basket-icon';
import {BasketScreen, ProductDetailScreen, ProductListScreen} from '../screens';
import {useFavoritedProductsCount} from '../store/product';
import {RouteNames} from './route-names';

const Stack = createStackNavigator();

export default function ProductStack() {
  const favoritedProductsCount = useFavoritedProductsCount();

  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName={RouteNames.productList}>
      <Stack.Screen
        name={RouteNames.productList}
        options={({navigation}) => ({
          headerTitle: 'Products',
          headerRight: headerRightProps => (
            <BasketIcon
              {...headerRightProps}
              productCount={favoritedProductsCount}
              onPress={() => navigation.navigate(RouteNames.basket)}
            />
          ),
        })}
        component={ProductListScreen as React.ComponentType}
      />
      <Stack.Screen
        options={{}}
        name={RouteNames.productDetail}
        component={ProductDetailScreen as React.ComponentType}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.ModalPresentationIOS,
        }}
        name={RouteNames.basket}
        component={BasketScreen as React.ComponentType}
      />
    </Stack.Navigator>
  );
}
