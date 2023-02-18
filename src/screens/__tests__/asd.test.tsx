import {renderHook} from '@testing-library/react-hooks';
import {render, screen} from '@testing-library/react-native';
import React from 'react';
import {useGetAllProducts} from '../../api/product';
import {createReactQueryWrapper} from '../../utils/testing';
import ProductListScreen from '../product-list';

const navigateMock = jest.fn();
const navigation = {navigate: navigateMock} as any;
const route = jest.fn() as any;

const component = <ProductListScreen navigation={navigation} route={route} />;

describe('Product list screen', () => {
  it('should display loading indicator initially', async () => {
    render(component, {wrapper: createReactQueryWrapper});

    expect(screen.queryByTestId(`screen-loader`)).toBeTruthy();

    const {result, waitFor} = renderHook(() => useGetAllProducts(), {
      wrapper: createReactQueryWrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(screen.getByTestId(`screen-loader`)).not.toBeTruthy();
  });
});
