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
    await element(by.id('increase-btn')).tap();
  });
});
