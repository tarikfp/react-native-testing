import {
  decreaseFavoritedProductQuantity,
  increaseFavoritedProductQuantity,
  updateProductQuantity,
} from './helpers';

describe('updateProductQuantity', () => {
  test('increases the quantity of a favorited product', () => {
    const favoritedProducts = [
      {product: {id: 1, title: 'Product 1'}, quantity: 5},
      {product: {id: 2, title: 'Product 2'}, quantity: 10},
    ] as any;

    const productId = 1;

    const updatedFavoritedProducts = updateProductQuantity(
      favoritedProducts,
      productId,
      'increase',
    );

    expect(updatedFavoritedProducts).toEqual([
      {product: {id: 1, title: 'Product 1'}, quantity: 6},
      {product: {id: 2, title: 'Product 2'}, quantity: 10},
    ]);
  });

  test('decreases the quantity of a favorited product', () => {
    const favoritedProducts = [
      {product: {id: 1, title: 'Product 1'}, quantity: 5},
      {product: {id: 2, title: 'Product 2'}, quantity: 10},
    ] as any;

    const productId = 2;

    const updatedFavoritedProducts = updateProductQuantity(
      favoritedProducts,
      productId,
      'decrease',
    );

    expect(updatedFavoritedProducts).toEqual([
      {product: {id: 1, title: 'Product 1'}, quantity: 5},
      {product: {id: 2, title: 'Product 2'}, quantity: 9},
    ]);
  });
});

describe('increaseFavoritedProductQuantity', () => {
  test('increases the quantity of a favorited product', () => {
    const favoritedProducts = [
      {product: {id: 1, title: 'Product 1'}, quantity: 5},
      {product: {id: 2, title: 'Product 2'}, quantity: 10},
    ] as any;

    const productId = 2;

    const updatedFavoritedProducts = increaseFavoritedProductQuantity(
      favoritedProducts,
      productId,
    );

    expect(updatedFavoritedProducts).toEqual([
      {product: {id: 1, title: 'Product 1'}, quantity: 5},
      {product: {id: 2, title: 'Product 2'}, quantity: 11},
    ]);
  });
});

describe('decreaseFavoritedProductQuantity', () => {
  test('decreases the quantity of a favorited product', () => {
    const favoritedProducts = [
      {product: {id: 1, title: 'Product 1'}, quantity: 5},
      {product: {id: 2, title: 'Product 2'}, quantity: 10},
    ] as any;

    const productId = 1;

    const updatedFavoritedProducts = decreaseFavoritedProductQuantity(
      favoritedProducts,
      productId,
    );

    expect(updatedFavoritedProducts).toEqual([
      {product: {id: 1, title: 'Product 1'}, quantity: 4},
      {product: {id: 2, title: 'Product 2'}, quantity: 10},
    ]);
  });
});
