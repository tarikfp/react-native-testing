/* eslint-disable react/no-unstable-nested-components */
import {HeaderBackButton} from '@react-navigation/elements';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BasketIcon from '../components/basket-icon';
import CloseIcon from '../components/close-icon';
import {BasketScreen, ProductDetailScreen, ProductListScreen} from '../screens';
import {useProductsInBasketCount} from '../store/product';
import {RouteNames} from './route-names';

const Stack = createNativeStackNavigator();

export default function ProductStack() {
  const favoritedProductsCount = useProductsInBasketCount();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
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
        options={{
          headerTitle: 'Loading...',
        }}
        name={RouteNames.productDetail}
        component={ProductDetailScreen as React.ComponentType}
      />
      <Stack.Screen
        options={({navigation}) => ({
          animation: 'fade_from_bottom',
          headerTitle: 'Basket',
          // Back button subview is not yet Fabric compatible in react-native-screens
          headerLeft: headerLeftProps => (
            <HeaderBackButton
              {...headerLeftProps}
              backImage={({tintColor}) => (
                <CloseIcon onPress={navigation.goBack} color={tintColor} />
              )}
            />
          ),
        })}
        name={RouteNames.basket}
        component={BasketScreen as React.ComponentType}
      />
    </Stack.Navigator>
  );
}
