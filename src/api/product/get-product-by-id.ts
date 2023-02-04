import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';
import {api} from '../axios.instance';
import {productKeyFactory} from './key-factory';
import {Product} from './types';

export const getProductById = async (productId: number) => {
  return (await api.get<Product>(`/products/${productId}`)).data;
};

export const useGetProductById = (
  productId: number,
  options?: UseQueryOptions<
    Product,
    AxiosError,
    Product,
    readonly (string | number)[]
  >,
) => {
  return useQuery({
    queryFn: () => getProductById(productId),
    queryKey: [...productKeyFactory.productById(productId)],
    ...options,
  });
};
