import {ProductInBasket} from '../store/product';

export const getBasketTotalPrice = (
  favoritedProducts: Array<ProductInBasket>,
) => {
  return favoritedProducts
    .reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0)
    .toFixed(2);
};
