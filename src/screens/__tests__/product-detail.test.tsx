import {renderHook} from '@testing-library/react-hooks';
import {fireEvent, render, screen} from '@testing-library/react-native';
import React from 'react';
import {ProductDetailScreen} from '..';
import {useGetProductById} from '../../api/product';
import {RouteNames} from '../../navigation/route-names';
import {useProductQuantity} from '../../store/product';
import {cutString} from '../../utils/cut-string';
import {getPriceText} from '../../utils/get-price-text';
import {createReactQueryWrapper} from '../../utils/testing';

const increaseFavoritedProductQuantityMock = jest.fn();
const decreaseFavoritedProductQuantityMock = jest.fn();
const addFavoriteProductMock = jest.fn();
const removeFavoritedProductMock = jest.fn();

jest.mock('../../store/product', () => ({
  useProductActions: () => ({
    increaseFavoritedProductQuantity: increaseFavoritedProductQuantityMock,
    decreaseFavoritedProductQuantity: decreaseFavoritedProductQuantityMock,
    addFavoriteProduct: addFavoriteProductMock,
    removeFavoritedProduct: removeFavoritedProductMock,
  }),
  useProductQuantity: jest.fn(() => undefined),
}));

const navigateMock = jest.fn();
const setOptionsMock = jest.fn();
const navigation = {navigate: navigateMock, setOptions: setOptionsMock} as any;
const productId = 1;
const route = {params: {id: productId}} as any;

const component = <ProductDetailScreen navigation={navigation} route={route} />;

describe('Product detail screen', () => {
  it('should display loading indicator on mount', async () => {
    render(component, {wrapper: createReactQueryWrapper});

    expect(screen.queryByTestId(`screen-loader`)).toBeTruthy();

    const {result, waitFor} = renderHook(() => useGetProductById(productId), {
      wrapper: createReactQueryWrapper,
    });

    await waitFor(() => result.current.isSuccess);
  });

  it('should display product detail data correctly, and should set header title based on api data', async () => {
    // we need to render whole app stack in order to be able to get header title
    render(component, {
      wrapper: createReactQueryWrapper,
    });

    const {result, waitFor: waitForHook} = renderHook(
      () => useGetProductById(productId),
      {
        wrapper: createReactQueryWrapper,
      },
    );

    await waitForHook(() => result.current.isSuccess);

    expect(setOptionsMock).toHaveBeenCalledWith({
      headerTitle: cutString(result.current.data!.title),
    });

    expect(screen.getByTestId(`product-detail-scroll-view`)).toBeTruthy();

    expect(screen.getByTestId('product-detail-image').props.source.uri).toBe(
      result.current.data!.image,
    );

    expect(screen.getByText(result.current.data!.title)).toBeTruthy();

    expect(screen.getByText(result.current.data!.description)).toBeTruthy();
  });

  it('should display price and quantity of the item correctly', async () => {
    render(component, {
      wrapper: createReactQueryWrapper,
    });

    const {result, waitFor: waitForHook} = renderHook(
      () => useGetProductById(productId),
      {
        wrapper: createReactQueryWrapper,
      },
    );

    await waitForHook(() => result.current.isSuccess);

    expect(screen.getByTestId(`product-detail-price`).props.children).toBe(
      getPriceText(result.current.data!.price),
    );

    expect(screen.getByTestId('quantity-toggler-value').props.children).toBe(0);
  });

  it('should have decrease quantity button disabled and should call addFavoriteProduct function in case product has not been added to basket yet', async () => {
    render(component, {
      wrapper: createReactQueryWrapper,
    });

    const {result, waitFor: waitForHook} = renderHook(
      () => useGetProductById(productId),
      {
        wrapper: createReactQueryWrapper,
      },
    );

    await waitForHook(() => result.current.isSuccess);

    const increaseBtn = screen.getByTestId(`increase-quantity-btn`);
    const decreaseBtn = screen.getByTestId(`decrease-quantity-btn`);

    fireEvent.press(decreaseBtn);

    // decrease quantity button should be disabled if quantity equals to 0
    expect(decreaseFavoritedProductQuantityMock).not.toHaveBeenCalled();

    fireEvent.press(increaseBtn);

    expect(addFavoriteProductMock).toHaveBeenCalledWith(result.current.data!);
  });

  it('should increase quantity on pressing increase button in case product has already been added to basket', async () => {
    // product has been added to the basket
    (useProductQuantity as jest.Mock).mockImplementation(() => 1);

    render(component, {
      wrapper: createReactQueryWrapper,
    });

    const {result, waitFor: waitForHook} = renderHook(
      () => useGetProductById(productId),
      {
        wrapper: createReactQueryWrapper,
      },
    );

    await waitForHook(() => result.current.isSuccess);

    const increaseBtn = screen.getByTestId(`increase-quantity-btn`);

    fireEvent.press(increaseBtn);

    expect(increaseFavoritedProductQuantityMock).toHaveBeenCalledWith(
      result.current.data!.id,
    );
  });

  it('should call remove favorited product on pressing increase button in case product has already been added to basket and its quantity equals to 1', async () => {
    // product has been added to the basket
    (useProductQuantity as jest.Mock).mockImplementation(() => 1);

    render(component, {
      wrapper: createReactQueryWrapper,
    });

    const {result, waitFor: waitForHook} = renderHook(
      () => useGetProductById(productId),
      {
        wrapper: createReactQueryWrapper,
      },
    );

    await waitForHook(() => result.current.isSuccess);

    const decreaseBtn = screen.getByTestId(`decrease-quantity-btn`);

    fireEvent.press(decreaseBtn);

    expect(removeFavoritedProductMock).toHaveBeenCalledWith(
      result.current.data!.id,
    );
  });

  it('should call decrease favorited product on pressing increase button in case product has already been added to basket and its quantity greater than 1', async () => {
    // product has been added to the basket and has quantity greater than 1
    (useProductQuantity as jest.Mock).mockImplementation(() => 2);

    render(component, {
      wrapper: createReactQueryWrapper,
    });

    const {result, waitFor: waitForHook} = renderHook(
      () => useGetProductById(productId),
      {
        wrapper: createReactQueryWrapper,
      },
    );

    await waitForHook(() => result.current.isSuccess);

    const decreaseBtn = screen.getByTestId(`decrease-quantity-btn`);

    fireEvent.press(decreaseBtn);

    expect(decreaseFavoritedProductQuantityMock).toHaveBeenCalledWith(
      result.current.data!.id,
    );
  });

  it('should call navigation function with correct params on pressing Go To Basket button', async () => {
    render(component, {
      wrapper: createReactQueryWrapper,
    });

    const {result, waitFor: waitForHook} = renderHook(
      () => useGetProductById(productId),
      {
        wrapper: createReactQueryWrapper,
      },
    );

    await waitForHook(() => result.current.isSuccess);

    const goToBasketBtn = screen.getByText('Go to basket');

    fireEvent.press(goToBasketBtn);

    expect(navigateMock).toHaveBeenCalledWith(RouteNames.basket);
  });
});
