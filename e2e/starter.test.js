const {sleep} = require('../src/utils/sleep');

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('complete app flow', async () => {
    await waitFor(element(by.id('product-list-flat-list')))
      .toBeVisible()
      .withTimeout(6000);

    await expect(element(by.id('product-list-card-1'))).toBeVisible();

    await element(by.id('product-list-flat-list')).scrollTo('bottom');

    await expect(element(by.id('product-list-card-20'))).toBeVisible();

    await element(by.id('product-list-flat-list')).scrollTo('top');

    await sleep(200);

    await element(by.id('basket-button-1')).tap();

    await sleep(200);

    await element(by.id('basket-button-3')).tap();

    await sleep(200);

    await element(by.id('basket-icon')).tap();

    await sleep(200);

    await waitFor(element(by.id('basket-card-1')))
      .toBeVisible()
      .withTimeout(1000);

    await expect(element(by.id('basket-card-3'))).toBeVisible();

    await element(by.id('increase-quantity-btn-1')).tap();
    await element(by.id('increase-quantity-btn-1')).tap();

    await expect(element(by.id('quantity-toggler-value-1'))).toHaveText('3');

    await element(by.id('decrease-quantity-btn-1')).tap();

    await expect(element(by.id('quantity-toggler-value-1'))).toHaveText('2');

    await element(by.id('increase-quantity-btn-3')).tap();
    await element(by.id('increase-quantity-btn-3')).tap();

    await expect(element(by.id('quantity-toggler-value-3'))).toHaveText('3');

    await element(by.id('decrease-quantity-btn-3')).tap();
    await element(by.id('decrease-quantity-btn-3')).tap();
    await element(by.id('decrease-quantity-btn-3')).tap();

    await waitFor(element(by.id('basket-card-3')))
      .not.toBeVisible()
      .withTimeout(1000);

    await element(by.id('basket-delete-icon')).tap();

    await waitFor(element(by.text('Your basket is empty')))
      .toBeVisible()
      .withTimeout(1000);

    await element(by.id('basket-screen-header-left-btn')).tap();

    await waitFor(element(by.id('product-list-card-4')))
      .toBeVisible()
      .withTimeout(700);

    await element(by.id('product-list-card-4')).tap();

    await waitFor(element(by.id('product-detail-image')))
      .toBeVisible()
      .withTimeout(700);

    await element(by.id('increase-quantity-btn-4')).tap();
    await element(by.id('increase-quantity-btn-4')).tap();

    await expect(element(by.id('quantity-toggler-value-4'))).toHaveText('2');

    await element(by.id('decrease-quantity-btn-4')).tap();

    await expect(element(by.id('quantity-toggler-value-4'))).toHaveText('1');

    await element(by.id('product-detail-go-to-basket-btn')).tap();

    await waitFor(element(by.id('basket-card-4')))
      .toBeVisible()
      .withTimeout(1000);

    await expect(element(by.id('quantity-toggler-value-4'))).toHaveText('1');
  });
});
