describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      launchArgs: {
        DTXEnableVerboseSyncSystem: 'YES',
        DTXEnableVerboseSyncResources: 'YES',
      },
    });
    await device.disableSynchronization();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have loader on initial phase', async () => {
    await waitFor(element(by.id('UniqueId204')))
      .toBeVisible()
      .withTimeout(600000);
  });
});
