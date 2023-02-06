import {FavoritedProduct} from '../store/product';

export const getBasketTotalPrice = (
  favoritedProducts: Array<FavoritedProduct>,
) => {
  return favoritedProducts
    .reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0)
    .toFixed(2);
};
