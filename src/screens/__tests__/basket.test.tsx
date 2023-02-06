import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';
import {GET_ALL_PRODUCTS_MOCK_RESPONSE} from '../../../__mocks__/msw/mock-data';
import {useFavoriteProducts} from '../../store/product';
import {getBasketTotalPrice} from '../../utils/get-basket-total-price';
import {createReactQueryWrapper} from '../../utils/testing';
import BasketScreen from '../basket';

const increaseFavoritedProductQuantityMock = jest.fn();
const decreaseFavoritedProductQuantityMock = jest.fn();
const addFavoriteProductMock = jest.fn();
const removeFavoritedProductMock = jest.fn();
const favoritedProducts = GET_ALL_PRODUCTS_MOCK_RESPONSE.map(product => ({
  product,
  quantity: Math.floor(Math.random() * 10) + 1,
}));

jest.mock('../../store/product', () => ({
  useProductActions: () => ({
    increaseFavoritedProductQuantity: increaseFavoritedProductQuantityMock,
    decreaseFavoritedProductQuantity: decreaseFavoritedProductQuantityMock,
    addFavoriteProduct: addFavoriteProductMock,
    removeFavoritedProduct: removeFavoritedProductMock,
  }),
  useFavoriteProducts: jest.fn(),
}));

const navigateMock = jest.fn();
const setOptionsMock = jest.fn();
const navigation = {navigate: navigateMock, setOptions: setOptionsMock} as any;
const route = jest.fn() as any;

const component = <BasketScreen navigation={navigation} route={route} />;

describe('Basket screen', () => {
  it('should display all basket list data correctly', async () => {
    (useFavoriteProducts as jest.Mock).mockImplementation(
      () => favoritedProducts,
    );

    render(component, {wrapper: createReactQueryWrapper});

    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 500,
        },
        contentSize: {
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          height: 100,
          width: 100,
        },
      },
    };

    // first 10 item will be visible on initial render
    for (const {
      product: {id},
    } of favoritedProducts.slice(0, favoritedProducts.length / 2)) {
      expect(await screen.getByTestId(`basket-card-${id}`)).toBeTruthy();
    }

    // scroll down to render remaining items
    fireEvent.scroll(screen.getByTestId('basket-screen-flat-list'), eventData);

    await waitFor(async () => {
      for (const {
        product: {id},
      } of favoritedProducts.slice(10, favoritedProducts.length)) {
        expect(await screen.getByTestId(`basket-card-${id}`)).toBeTruthy();
      }
    });
  });

  it('should set navigation header right component if there is at least one item in the basket', async () => {
    (useFavoriteProducts as jest.Mock).mockImplementation(
      () => favoritedProducts,
    );

    render(component, {wrapper: createReactQueryWrapper});

    expect(setOptionsMock).toHaveBeenCalled();
  });

  it('should display total price correctly', async () => {
    render(component, {wrapper: createReactQueryWrapper});

    expect(
      screen.findByText(`$ ${getBasketTotalPrice(favoritedProducts)}`),
    ).toBeTruthy();
  });

  it('should display empty basket when there is no item in the basket', async () => {
    (useFavoriteProducts as jest.Mock).mockImplementation(() => []);

    render(component, {wrapper: createReactQueryWrapper});

    expect(screen.findByText(`Your basket is empty`)).toBeTruthy();
  });
});
