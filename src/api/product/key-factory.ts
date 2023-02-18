export const productKeyFactory = {
  products: ['all-products'],
  productById: (id: number) => [...productKeyFactory.products, id],
} as const;
