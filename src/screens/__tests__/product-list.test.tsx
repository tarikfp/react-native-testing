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

// We render the whole app stack instead of rendering just the screen
// because we need access to the react-navigation's header, which wouldn't
// be possible if we just rendered the screen.
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
  it('should display loading indicator initially', async () => {
    // We render the component and expect to see a loading indicator
    render(component, {wrapper: createReactQueryWrapper});
    expect(screen.queryByTestId(`screen-loader`)).toBeTruthy();

    // We render the product list using useGetAllProducts hook and wait until the products are loaded
    const {result, waitFor} = renderHook(() => useGetAllProducts(), {
      wrapper: createReactQueryWrapper,
    });
    await waitFor(() => result.current.isSuccess);

    // We expect the loading indicator to disappear after the products are loaded
    expect(screen.queryByTestId(`screen-loader`)).not.toBeTruthy();
  });

  it('should display product list data correctly', async () => {
    // Render the component and wait for it to load
    render(component, {wrapper: createReactQueryWrapper});

    // Check that no product card is rendered before fetching data
    expect(screen.queryByTestId(`product-list-card-1`)).not.toBeTruthy();

    // Fetch the product data
    const {result, waitFor} = renderHook(() => useGetAllProducts(), {
      wrapper: createReactQueryWrapper,
    });

    // Wait for the data to be fetched successfully
    await waitFor(() => result.current.isSuccess);

    // Check that each product card is rendered for each product in the data
    for (const {id} of result.current.data!) {
      expect(screen.queryByTestId(`product-list-card-${id}`)).toBeTruthy();
    }
  });

  it('should display error text in case get all products query fails', async () => {
    // Set up the mock handler for GET requests to the /products endpoint that returns an error response
    setupGetAllProductsFailedHandler();

    // Render the ProductListScreen component wrapped in the React Query wrapper
    render(component, {wrapper: createReactQueryWrapper});

    // Set up a mock React hook that calls the useGetAllProducts hook from the API module
    const {result, waitFor} = renderHook(() => useGetAllProducts(), {
      wrapper: createReactQueryWrapper,
    });

    // Wait for the useGetAllProducts hook to throw an error
    await waitFor(() => result.current.isError);

    // Assert that the "An error occurred" text is displayed on the screen
    expect(screen.getByText(`An error occurred`)).toBeTruthy();
  });

  it('should call navigation action on pressing the first product item', async () => {
    // Render the ProductListScreen component along with react-query wrapper
    render(component, {wrapper: createReactQueryWrapper});

    // Render the useGetAllProducts hook with react-query wrapper to fetch data
    const {result, waitFor} = renderHook(() => useGetAllProducts(), {
      wrapper: createReactQueryWrapper,
    });

    // Wait for the data to be fetched
    await waitFor(() => result.current.isSuccess);

    // Find the first product card in the list and simulate a press event on it
    const firstProductItem = screen.getByTestId(`product-list-card-1`);
    fireEvent.press(firstProductItem);

    // Expect that the navigation function is called with the correct route name and params
    expect(navigateMock).toHaveBeenCalledWith(RouteNames.productDetail, {
      id: 1,
    });
  });

  it('should add/remove product item correctly on pressing product items basket icon', async () => {
    // We render the entire app stack and use the createReactQueryWrapper as a
    // wrapper for the render function to set up the React Query Provider.
    render(rootAppComponent, {
      wrapper: createReactQueryWrapper,
    });

    // We use the renderHook function to invoke the useGetAllProducts hook which
    // fetches the data.
    const {result, waitFor} = renderHook(() => useGetAllProducts(), {
      wrapper: createReactQueryWrapper,
    });

    // We use the renderHook function to get access to the useProductStore hook
    // which we will use to check that the products in the basket were added/removed correctly.
    const {result: productStore} = renderHook(() => useProductStore(), {
      wrapper: createReactQueryWrapper,
    });

    // We wait for the useGetAllProducts hook to complete fetching the data before proceeding
    // with the test.
    await waitFor(() => result.current.isSuccess);

    // We get the basket button for the first product item using the getByTestId function.
    const firstProductItemBasketButton = screen.getByTestId(`basket-button-1`);

    // We click the basket button for the first product item.
    fireEvent.press(firstProductItemBasketButton);

    // We check that the basket icon quantity text is present using the getByTestId function.
    expect(screen.getByTestId('basket-icon-quantity-text-1')).toBeTruthy();

    // We check that the products in the basket have been added correctly using the productStore.
    expect(productStore.current.productsInBasket).toHaveLength(1);
    expect(productStore.current.productsInBasket[0].quantity).toBe(1);
    expect(productStore.current.productsInBasket[0].product).toMatchObject(
      result.current.data![0],
    );

    // We click the basket button for the first product item again to remove it from the basket.
    fireEvent.press(firstProductItemBasketButton);

    // We check that the basket icon quantity text is not present.
    expect(
      screen.queryByTestId('basket-icon-quantity-text-1'),
    ).not.toBeTruthy();

    // We check that the products in the basket have been removed correctly using the productStore.
    expect(productStore.current.productsInBasket).toHaveLength(0);
  });
});
