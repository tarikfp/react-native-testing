import {act, renderHook} from '@testing-library/react-hooks';
import {ProductStore, useProductStore} from './product';

describe('useProductStore', () => {
  let productStore: ReturnType<typeof renderHook<unknown, ProductStore>>;

  beforeEach(() => {
    productStore = renderHook(() => useProductStore());
  });

  it('adds a product to the favorites list', () => {
    const product = {id: 1, title: 'Product 1'} as any;

    act(() => {
      productStore.result.current.actions.addProductToBasket(product);
    });

    expect(productStore.result.current.productsInBasket).toEqual([
      {product, quantity: 1},
    ]);
  });

  it('removes a product from the favorites list', () => {
    const product = {id: 1, title: 'Product 1'} as any;

    act(() => {
      productStore.result.current.actions.addProductToBasket(product);
    });

    act(() => {
      productStore.result.current.actions.removeProductFromBasket(product.id);
    });

    expect(productStore.result.current.productsInBasket).toEqual([]);
  });

  it('increases the quantity of a favorited product', () => {
    const product = {id: 1, title: 'Product 1'} as any;

    act(() => {
      productStore.result.current.actions.addProductToBasket(product);
    });

    act(() => {
      productStore.result.current.actions.increaseProductQuantityInBasket(
        product.id,
      );
    });

    expect(productStore.result.current.productsInBasket).toEqual([
      {product, quantity: 2},
    ]);
  });

  it('decreases the quantity of a favorited product', () => {
    const product = {id: 1, title: 'Product 1'} as any;

    act(() => {
      productStore.result.current.actions.addProductToBasket(product);
    });

    act(() => {
      productStore.result.current.actions.increaseProductQuantityInBasket(
        product.id,
      );
    });

    act(() => {
      productStore.result.current.actions.decreaseProductQuantityInBasket(
        product.id,
      );
    });

    expect(productStore.result.current.productsInBasket).toEqual([
      {product, quantity: 1},
    ]);
  });

  it('resets the favorites list', () => {
    const product = {id: 1, title: 'Product 1'} as any;

    act(() => {
      productStore.result.current.actions.addProductToBasket(product);
    });

    act(() => {
      productStore.result.current.actions.resetAllProductsInBasket();
    });

    expect(productStore.result.current.productsInBasket).toEqual([]);
  });
});
