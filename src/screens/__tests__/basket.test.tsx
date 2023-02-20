import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';
import {GET_ALL_PRODUCTS_MOCK_RESPONSE} from '../../../__mocks__/msw/mock-data';
import {useProductsInBasket} from '../../store/product';
import {getBasketTotalPrice} from '../../utils/get-basket-total-price';
import {createReactQueryWrapper} from '../../utils/testing';
import BasketScreen from '../basket';

const increaseProductQuantityInBasketMock = jest.fn();
const decreaseProductQuantityInBasketMock = jest.fn();
const addProductToBasketMock = jest.fn();
const removeProductFromBasketMock = jest.fn();

const favoritedProducts = GET_ALL_PRODUCTS_MOCK_RESPONSE.map(product => ({
  product,
  quantity: Math.floor(Math.random() * 10) + 1,
}));

jest.mock('../../store/product', () => ({
  useProductActions: () => ({
    increaseProductQuantityInBasket: increaseProductQuantityInBasketMock,
    decreaseProductQuantityInBasket: decreaseProductQuantityInBasketMock,
    addProductToBasket: addProductToBasketMock,
    removeProductFromBasket: removeProductFromBasketMock,
  }),
  useProductsInBasket: jest.fn(),
}));

const navigateMock = jest.fn();
const setOptionsMock = jest.fn();
const navigation = {navigate: navigateMock, setOptions: setOptionsMock} as any;
const route = jest.fn() as any;

const component = <BasketScreen navigation={navigation} route={route} />;

describe('Basket screen', () => {
  it('should display all basket list data correctly', async () => {
    (useProductsInBasket as jest.Mock).mockImplementation(
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
    (useProductsInBasket as jest.Mock).mockImplementation(
      () => favoritedProducts,
    );

    render(component, {wrapper: createReactQueryWrapper});

    expect(setOptionsMock).toHaveBeenCalled();
  });

  it('should display basket total price correctly', async () => {
    render(component, {wrapper: createReactQueryWrapper});

    expect(
      screen.findByText(`$ ${getBasketTotalPrice(favoritedProducts)}`),
    ).toBeTruthy();
  });

  it('should not display basket total price when there is no items in the basket', async () => {
    (useProductsInBasket as jest.Mock).mockImplementation(() => []);

    render(component, {wrapper: createReactQueryWrapper});

    expect(
      screen.queryByText(`$ ${getBasketTotalPrice(favoritedProducts)}`),
    ).not.toBeTruthy();
  });

  it('should display empty basket when there is no item in the basket', async () => {
    (useProductsInBasket as jest.Mock).mockImplementation(() => []);

    render(component, {wrapper: createReactQueryWrapper});

    expect(screen.findByText(`Your basket is empty`)).toBeTruthy();
  });

  it('should increase quantity on pressing increase button', async () => {
    (useProductsInBasket as jest.Mock).mockImplementation(
      () => favoritedProducts,
    );

    render(component, {wrapper: createReactQueryWrapper});

    fireEvent.press(screen.getByTestId(`increase-quantity-btn-1`));

    expect(increaseProductQuantityInBasketMock).toHaveBeenCalledWith(
      favoritedProducts[0].product.id,
    );
  });

  it('should remove the product from the basket if quantity of the product equals to 1', async () => {
    (useProductsInBasket as jest.Mock).mockImplementation(() =>
      favoritedProducts.map(favoritedProduct => {
        // set first product quantity to 1
        if (favoritedProduct.product.id === 1) {
          return {
            ...favoritedProduct,
            product: favoritedProduct.product,
            quantity: 1,
          };
        }
        return favoritedProduct;
      }),
    );

    render(component, {wrapper: createReactQueryWrapper});

    fireEvent.press(screen.getByTestId(`decrease-quantity-btn-1`));

    expect(removeProductFromBasketMock).toHaveBeenCalledWith(
      favoritedProducts[0].product.id,
    );
  });

  it('should decrease the quantity of the product if its greater than 1', async () => {
    (useProductsInBasket as jest.Mock).mockImplementation(() =>
      favoritedProducts.map(favoritedProduct => {
        // set first product quantity to 2
        if (favoritedProduct.product.id === 1) {
          return {
            ...favoritedProduct,
            product: favoritedProduct.product,
            quantity: 2,
          };
        }
        return favoritedProduct;
      }),
    );

    render(component, {wrapper: createReactQueryWrapper});

    fireEvent.press(screen.getByTestId(`decrease-quantity-btn-1`));

    expect(decreaseProductQuantityInBasketMock).toHaveBeenCalledWith(
      favoritedProducts[0].product.id,
    );
  });
});
