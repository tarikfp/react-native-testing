import {ProductInBasket} from './product';

export const updateProductQuantity = (
  favoritedProducts: Array<ProductInBasket>,
  productId: number,
  updateType: 'increase' | 'decrease',
) => {
  return favoritedProducts.map(favoritedProduct => {
    if (favoritedProduct.product.id === productId) {
      return {
        ...favoritedProduct,
        quantity:
          updateType === 'increase'
            ? favoritedProduct.quantity + 1
            : favoritedProduct.quantity - 1,
      };
    }
    return favoritedProduct;
  });
};

export const increaseFavoritedProductQuantity = (
  favoritedProducts: Array<ProductInBasket>,
  productId: number,
) => {
  return updateProductQuantity(favoritedProducts, productId, 'increase');
};

export const decreaseFavoritedProductQuantity = (
  favoritedProducts: Array<ProductInBasket>,
  productId: number,
) => {
  return updateProductQuantity(favoritedProducts, productId, 'decrease');
};
