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
      .withTimeout(3000);

    await expect(element(by.id('product-list-card-1')));

    await element(by.id('product-list-flat-list')).scrollTo('bottom');

    await expect(element(by.id('product-list-card-20')));
  });
});
