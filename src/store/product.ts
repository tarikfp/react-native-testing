import {create} from 'zustand';
import {shallow} from 'zustand/shallow';
import {Product} from '../api/product';

type FavoritedProducts = Array<{product: Product; quantity: number}>;

type UpdateProductQuantityType = 'increase' | 'decrease';

export interface ProductStore {
  favoritedProducts: FavoritedProducts;
  actions: {
    addFavoriteProduct: (val: Product) => void;
    removeFavoritedProduct: (productId: number) => void;
    updateProductQuantity: (
      productId: number,
      updateType: UpdateProductQuantityType,
    ) => void;
    getProductById: (productId: number) => Product | undefined;
  };
}

export const useProductStore = create<ProductStore>((set, get) => ({
  favoritedProducts: [],
  actions: {
    addFavoriteProduct: product =>
      set({
        favoritedProducts: [
          ...get().favoritedProducts,
          {product: product, quantity: 1},
        ],
      }),
    removeFavoritedProduct: productId =>
      set({
        favoritedProducts: [
          ...get().favoritedProducts.filter(
            favoritedProduct => favoritedProduct.product.id !== productId,
          ),
        ],
      }),
    getProductById: productId =>
      get().favoritedProducts.find(x => x.product.id === productId)?.product,
    updateProductQuantity: (productId, updateType) => {
      updateProductQuantity(get().favoritedProducts, productId, updateType);
    },
  },
}));

export const useFavoriteProducts = () =>
  useProductStore(state => state.favoritedProducts, shallow);
export const useFavoritedProductsCount = () =>
  useProductStore(state => state.favoritedProducts.length);
export const useProductActions = () => useProductStore(state => state.actions);

const updateProductQuantity = (
  favoritedProducts: FavoritedProducts,
  productId: number,
  updateType: UpdateProductQuantityType,
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
