import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {BASE_URL} from '../../src/api/axios.instance';
import {
  GET_ALL_PRODUCTS_MOCK_RESPONSE,
  GET_PRODUCT_BY_ID_MOCK_RESPONSE,
} from './mock-data';

const getAllProductsUrl = BASE_URL + '/products';
const getProductByIdUrl = BASE_URL + `/products/:id`;

const getAllProductsHandler = rest.get(getAllProductsUrl, (_req, res, ctx) => {
  return res(ctx.status(200), ctx.json(GET_ALL_PRODUCTS_MOCK_RESPONSE));
});

const getProductByIdHandler = rest.get(getProductByIdUrl, (_req, res, ctx) => {
  return res(ctx.status(200), ctx.json(GET_PRODUCT_BY_ID_MOCK_RESPONSE));
});

const handlers = [getAllProductsHandler, getProductByIdHandler];

export const mswServer = setupServer(...handlers);

const getAllProductsFailedHandler = rest.get(
  getAllProductsUrl,
  (_req, res, ctx) => {
    return res(ctx.status(500));
  },
);

const getProductByIdFailedHandler = rest.get(
  getProductByIdUrl,
  (_req, res, ctx) => {
    return res(ctx.status(500));
  },
);

export const setupGetAllProductsFailedHandler = () =>
  mswServer.use(getAllProductsFailedHandler);

export const setupGetProductByIdFailedHandler = () =>
  mswServer.use(getProductByIdFailedHandler);
