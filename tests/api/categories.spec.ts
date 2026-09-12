import { test, expect } from '@playwright/test';

test('GET /categories - should return the category list successfully', async ({ request }) => {

    const response = await request.get('/categories');

    // 1. Check the status code
    expect(response.status()).toBe(200);

    // 2. Parse the response body as JSON
    const body = await response.json();
    console.log(body);

    // 3. Check that the response is an array
    expect(Array.isArray(body)).toBeTruthy();

    // 4. Check that the array contains data
    expect(body.length).toBeGreaterThan(0);

    // 5. Check the structure of the first item
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('category');

    // 6. Check data types
    expect(typeof body[0].id).toBe('number');
    expect(typeof body[0].category).toBe('string');

});