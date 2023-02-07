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
      productStore.result.current.actions.addFavoriteProduct(product);
    });

    expect(productStore.result.current.favoritedProducts).toEqual([
      {product, quantity: 1},
    ]);
  });

  it('removes a product from the favorites list', () => {
    const product = {id: 1, title: 'Product 1'} as any;

    act(() => {
      productStore.result.current.actions.addFavoriteProduct(product);
    });

    act(() => {
      productStore.result.current.actions.removeFavoritedProduct(product.id);
    });

    expect(productStore.result.current.favoritedProducts).toEqual([]);
  });

  it('increases the quantity of a favorited product', () => {
    const product = {id: 1, title: 'Product 1'} as any;

    act(() => {
      productStore.result.current.actions.addFavoriteProduct(product);
    });

    act(() => {
      productStore.result.current.actions.increaseFavoritedProductQuantity(
        product.id,
      );
    });

    expect(productStore.result.current.favoritedProducts).toEqual([
      {product, quantity: 2},
    ]);
  });

  it('decreases the quantity of a favorited product', () => {
    const product = {id: 1, title: 'Product 1'} as any;

    act(() => {
      productStore.result.current.actions.addFavoriteProduct(product);
    });

    act(() => {
      productStore.result.current.actions.increaseFavoritedProductQuantity(
        product.id,
      );
    });

    act(() => {
      productStore.result.current.actions.decreaseFavoritedProductQuantity(
        product.id,
      );
    });

    expect(productStore.result.current.favoritedProducts).toEqual([
      {product, quantity: 1},
    ]);
  });

  it('resets the favorites list', () => {
    const product = {id: 1, title: 'Product 1'} as any;

    act(() => {
      productStore.result.current.actions.addFavoriteProduct(product);
    });

    act(() => {
      productStore.result.current.actions.resetFavoritedProducts();
    });

    expect(productStore.result.current.favoritedProducts).toEqual([]);
  });
});
