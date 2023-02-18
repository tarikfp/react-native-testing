import {NavigationContainer} from '@react-navigation/native';
import {renderHook} from '@testing-library/react-hooks';
import {fireEvent, render, screen} from '@testing-library/react-native';
import React from 'react';
import {setupGetAllProductsFailedHandler} from '../../../__mocks__/msw/handlers';
import {useGetAllProducts} from '../../api/product';
import ProductStack from '../../navigation/product-stack';
import {RouteNames} from '../../navigation/route-names';
import {useProductStore} from '../../store/product';
import {createReactQueryWrapper} from '../../utils/testing';
import ProductListScreen from '../product-list';

const rootAppComponent = (
  <NavigationContainer>
    <ProductStack />
  </NavigationContainer>
);
const navigateMock = jest.fn();
const navigation = {navigate: navigateMock} as any;
const route = jest.fn() as any;

const component = <ProductListScreen navigation={navigation} route={route} />;

describe('Product list screen', () => {
  it.only('should display loading indicator initially', async () => {
    render(component, {wrapper: createReactQueryWrapper});

    expect(screen.queryByTestId(`screen-loader`)).toBeTruthy();

    const {result, waitFor} = renderHook(() => useGetAllProducts(), {
      wrapper: createReactQueryWrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(screen.queryByTestId(`screen-loader`)).not.toBeTruthy();
  });

  it('should display product list data correctly', async () => {
    render(component, {wrapper: createReactQueryWrapper});

    expect(screen.queryByTestId(`product-list-card-1`)).not.toBeTruthy();

    const {result, waitFor} = renderHook(() => useGetAllProducts(), {
      wrapper: createReactQueryWrapper,
    });

    await waitFor(() => result.current.isSuccess);

    for (const {id} of result.current.data!) {
      expect(screen.queryByTestId(`product-list-card-${id}`)).toBeTruthy();
    }
  });

  it('should display error text in case get all products query fails', async () => {
    setupGetAllProductsFailedHandler();

    render(component, {wrapper: createReactQueryWrapper});

    const {result, waitFor} = renderHook(() => useGetAllProducts(), {
      wrapper: createReactQueryWrapper,
    });

    await waitFor(() => result.current.isError);

    expect(screen.getByText(`An error occurred`)).toBeTruthy();
  });

  it('should call navigation action on pressing product item', async () => {
    render(component, {wrapper: createReactQueryWrapper});

    const {result, waitFor} = renderHook(() => useGetAllProducts(), {
      wrapper: createReactQueryWrapper,
    });

    await waitFor(() => result.current.isSuccess);

    const firstProductItem = screen.getByTestId(`product-list-card-1`);

    fireEvent.press(firstProductItem);

    expect(navigateMock).toHaveBeenCalledWith(RouteNames.productDetail, {
      id: 1,
    });
  });

  it('should add/remove product item correctly on pressing basket icon', async () => {
    // we need to render entire app stack in order to be able to get header basket icon by its test id
    render(rootAppComponent, {
      wrapper: createReactQueryWrapper,
    });

    const {result, waitFor} = renderHook(() => useGetAllProducts(), {
      wrapper: createReactQueryWrapper,
    });

    const {result: productStore} = renderHook(() => useProductStore(), {
      wrapper: createReactQueryWrapper,
    });

    await waitFor(() => result.current.isSuccess);

    const firstProductItemBasketButton = screen.getByTestId(`basket-button-1`);

    fireEvent.press(firstProductItemBasketButton);

    expect(screen.getByTestId('basket-icon-quantity-text-1')).toBeTruthy();

    expect(productStore.current.productsInBasket).toHaveLength(1);

    expect(productStore.current.productsInBasket[0].quantity).toBe(1);

    expect(productStore.current.productsInBasket[0].product).toMatchObject(
      result.current.data![0],
    );

    // press again to remove item from products in basket
    fireEvent.press(firstProductItemBasketButton);

    expect(
      screen.queryByTestId('basket-icon-quantity-text-1'),
    ).not.toBeTruthy();

    expect(productStore.current.productsInBasket).toHaveLength(0);
  });
});
