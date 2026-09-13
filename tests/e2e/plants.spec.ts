import { test, expect } from '@playwright/test';

test('E2E-01 - Open products page successfully', async ({ page }) => {
    await page.goto('/pages/products.html');
    await expect(page).toHaveURL(/localhost:5500/);
});

test('E2E-02 - Display plant list successfully', async ({ page }) => {
    const responsePromise = page.waitForResponse(
        response =>
            response.url().includes('/plants?currentPage=0') &&
            response.request().method() === 'GET'
    );

    await page.goto('/pages/products.html');

    const response = await responsePromise;

    expect(response.status()).toBe(200);

    // Get all product cards
    const productCards = page.locator('.product__card');

    // At least one product must be displayed
    await expect(productCards.first()).toBeVisible();
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);

    // Verify that the first product has a name
    await expect(
        productCards.first().locator('.product__title')
    ).not.toHaveText('');

    // Verify that the first product has a price
    await expect(
        productCards.first().locator('.product__price')
    ).not.toHaveText('');
});