var {expect} = require('chai');

describe('Complete app flow', () => {
  it('Wait for product list data to be fetched', async () => {
    await expect($('#product-list-flat-list')).not.to.be.undefined;
  });
});
