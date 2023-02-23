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
    // wait for product flat list to be visible with timeout of 6000ms
    // 6000ms can vary depending on the network, since we fetch the data from https://fakestoreapi.com
    // and server might not be stable all the time
    await waitFor(element(by.id('product-list-flat-list')))
      .toBeVisible()
      .withTimeout(6000);

    // it expects first product list card to be visible
    await expect(element(by.id('product-list-card-1'))).toBeVisible();

    // scroll to the end of the product list
    await element(by.id('product-list-flat-list')).scrollTo('bottom');

    // it expects last item of the product list to be visible after scrolling to the bottom
    await expect(element(by.id('product-list-card-20'))).toBeVisible();

    // scroll to top of the product list
    await element(by.id('product-list-flat-list')).scrollTo('top');

    // tap heart button of the first product list item in order to add product to the basket
    await element(by.id('basket-button-1')).tap();

    // tap heart button of the third product list item in order to add product to the basket
    await element(by.id('basket-button-3')).tap();

    // tap basket icon in order to navigate to basket screen
    await element(by.id('basket-icon')).tap();

    // it expects basket card of first product to be visible
    await waitFor(element(by.id('basket-card-1')))
      .toBeVisible()
      .withTimeout(1000);

    // it expects basket card of third product to be visible
    await expect(element(by.id('basket-card-3'))).toBeVisible();

    // increase quantity of the first product item by tapping + button in basket screen
    await element(by.id('increase-quantity-btn-1')).tap();

    // increase quantity of the first product item by tapping + button in basket screen
    await element(by.id('increase-quantity-btn-1')).tap();

    // it expects first product's quantity toggler component to have text of 3
    // since it has been added in product list with count of 1, and its quantity is increased by 2 in the basket screen/above
    await expect(element(by.id('quantity-toggler-value-1'))).toHaveText('3');

    // decrease first product quantity
    await element(by.id('decrease-quantity-btn-1')).tap();

    // it expects first product's quantity toggler component to have text of 2 since it is decreased by 1 above
    await expect(element(by.id('quantity-toggler-value-1'))).toHaveText('2');

    // increase quantity of the third product item by tapping + button in basket screen
    await element(by.id('increase-quantity-btn-3')).tap();

    // increase quantity of the third product item by tapping + button in basket screen
    await element(by.id('increase-quantity-btn-3')).tap();

    // it expects third product's quantity toggler component to have text of 3
    await expect(element(by.id('quantity-toggler-value-3'))).toHaveText('3');

    // decrease quantity of the third product item by tapping - button in basket screen
    await element(by.id('decrease-quantity-btn-3')).tap();

    // decrease quantity of the third product item by tapping - button in basket screen
    await element(by.id('decrease-quantity-btn-3')).tap();

    // decrease quantity of the third product item by tapping - button in basket screen
    await element(by.id('decrease-quantity-btn-3')).tap();

    // third product item is removed from the basket since its quantity its decreased by 3 times above
    await waitFor(element(by.id('basket-card-3')))
      .not.toBeVisible()
      .withTimeout(1000);

    // tap basket screen delete icon in the header right
    await element(by.id('basket-delete-icon')).tap();

    // it expects your basket is empty text to be visible after tapping basket delete icon
    await waitFor(element(by.text('Your basket is empty')))
      .toBeVisible()
      .withTimeout(1000);

    // tap basket screen header left to navigate back
    await element(by.id('basket-screen-header-left-btn')).tap();

    // it expects fourth product list item to be visible
    await waitFor(element(by.id('product-list-card-4')))
      .toBeVisible()
      .withTimeout(700);

    // tap fourth product list item
    await element(by.id('product-list-card-4')).tap();

    // it expects product detail image to be visible after tapping to the product item
    await waitFor(element(by.id('product-detail-image')))
      .toBeVisible()
      .withTimeout(700);

    // tap twice to increase quantity of fourth product item in product detail screen
    await element(by.id('increase-quantity-btn-4')).tap();
    await element(by.id('increase-quantity-btn-4')).tap();

    // it expects fourth product's quantity toggler component to have text of 1
    await expect(element(by.id('quantity-toggler-value-4'))).toHaveText('2');

    // tap to decrease quantity of fourth product item in product detail screen
    await element(by.id('decrease-quantity-btn-4')).tap();

    // it expects fourth product's quantity toggler component to have text of 1
    await expect(element(by.id('quantity-toggler-value-4'))).toHaveText('1');

    // tap go to basket button in order to navigate to basket screen from product detail screen
    await element(by.id('product-detail-go-to-basket-btn')).tap();

    // it expects fourth product item basket card to be visible since it has been added to the basket in above
    await waitFor(element(by.id('basket-card-4')))
      .toBeVisible()
      .withTimeout(1000);

    // it expects fourth product's quantity toggler component to have text of 1 in the basket screen
    await expect(element(by.id('quantity-toggler-value-4'))).toHaveText('1');
  });
});
