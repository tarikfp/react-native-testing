import {create} from 'zustand';
import {shallow} from 'zustand/shallow';
import {Product} from '../api/product';
import {
  decreaseFavoritedProductQuantity,
  increaseFavoritedProductQuantity,
} from './helpers';

export type FavoritedProduct = {
  product: Product;
  quantity: number;
};

export interface ProductStore {
  favoritedProducts: Array<FavoritedProduct>;
  actions: {
    addFavoriteProduct: (val: Product) => void;
    removeFavoritedProduct: (productId: number) => void;
    getProductById: (productId: number) => Product | undefined;
    increaseFavoritedProductQuantity: (productId: number) => void;
    decreaseFavoritedProductQuantity: (productId: number) => void;
    resetFavoritedProducts: () => void;
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
    increaseFavoritedProductQuantity: productId => {
      set({
        favoritedProducts: increaseFavoritedProductQuantity(
          get().favoritedProducts,
          productId,
        ),
      });
    },
    resetFavoritedProducts: () => set({favoritedProducts: []}),
    decreaseFavoritedProductQuantity: productId => {
      set({
        favoritedProducts: decreaseFavoritedProductQuantity(
          get().favoritedProducts,
          productId,
        ),
      });
    },
  },
}));

export const useProductActions = () => useProductStore(state => state.actions);

export const useFavoriteProducts = () =>
  useProductStore(state => state.favoritedProducts, shallow);
export const useFavoritedProductsCount = () =>
  useProductStore(state => state.favoritedProducts.length);
export const useProductQuantity = (productId: number | undefined) =>
  useProductStore(
    state =>
      state.favoritedProducts.find(
        favoritedProduct => favoritedProduct.product.id === productId,
      )?.quantity,
  );
