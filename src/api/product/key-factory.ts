export const productKeyFactory = {
  products: ['all-products'],
  productById: (id: number) => ['all-products', id],
} as const;
