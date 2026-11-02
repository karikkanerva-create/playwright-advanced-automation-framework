import { test, expect } from '../fixtures/auth.fixture';
import { getProducts } from '../utils/dataFactory';

test('cart contains added products and allows removal', async ({
  authenticatedInventory,
  inventoryPage,
  cartPage,
}) => {
  const [product] = getProducts();
  await inventoryPage.addProductToCart(product.name);
  await cartPage.open();
  await cartPage.expectProduct(product.name);
  await cartPage.removeProduct(product.name);
  await expect(cartPage.cartItems).toHaveCount(0);
});

