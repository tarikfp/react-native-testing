describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should detect the first item of the products on initial state and last item of the products on scroll to end', async () => {
    await waitFor(element(by.id('product-list-flat-list')))
      .toBeVisible()
      .withTimeout(6000);

    await expect(element(by.id('product-list-card-1'))).toBeVisible();

    await element(by.id('product-list-flat-list')).scrollTo('bottom');

    await expect(element(by.id('product-list-card-20'))).toBeVisible();

    await element(by.id('product-list-flat-list')).scrollTo('top');

    await element(by.id('favorite-pressable-1')).tap();

    await element(by.id('favorite-pressable-3')).tap();

    await element(by.id('basket-icon')).tap();

    await waitFor(element(by.id('basket-card-1')))
      .toBeVisible()
      .withTimeout(1000);

    await expect(element(by.id('basket-card-3'))).toBeVisible();

    await element(by.id('increase-quantity-btn-1')).tap();
    await element(by.id('increase-quantity-btn-1')).tap();

    await expect(element(by.text('quantity-toggler-value-1'))).toHaveText('3');

    await element(by.id('decrease-quantity-btn-1')).tap();

    await expect(element(by.text('quantity-toggler-value-1'))).toHaveText('2');

    await element(by.id('increase-quantity-btn-3')).tap();
    await element(by.id('increase-quantity-btn-3')).tap();

    await expect(element(by.text('quantity-toggler-value-3'))).toHaveText('3');

    await element(by.id('decrease-quantity-btn-3')).tap();

    await expect(element(by.text('quantity-toggler-value-3'))).toHaveText('2');
  });
});
