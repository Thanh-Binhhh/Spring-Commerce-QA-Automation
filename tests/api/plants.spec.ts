import { test, expect } from '@playwright/test';

test('GET /plants - Should return the first page of plants successfully', async ({ request }) => {

    console.log('\n========================================');
    console.log('POSITIVE TEST: GET /plants?currentPage=1');
    console.log('========================================');

    const response = await request.get('/plants', {
        params: {
            currentPage: 1
        }
    });

    // 1. Check the status code
    expect(response.status()).toBe(200);

    // 2. Parse the response body as JSON
    const body = await response.json();

    // 3. Check that the response contains "content"
    expect(body).toHaveProperty('content');

    // 4. Check that the array contains data
    expect(body.content.length).toBeGreaterThan(0);

    // 5. Check the structure of the first plant
    const firstPlant = body.content[0];

    expect(firstPlant).toHaveProperty('id');
    expect(firstPlant).toHaveProperty('image');
    expect(firstPlant).toHaveProperty('plant_name');
    expect(firstPlant).toHaveProperty('description');
    expect(firstPlant).toHaveProperty('price');
    expect(firstPlant).toHaveProperty('category');
    expect(firstPlant).toHaveProperty('plant_size');
    expect(firstPlant).toHaveProperty('characteristic');

    // 8. Check data types
    expect(typeof firstPlant.id).toBe('number');
    expect(typeof firstPlant.image).toBe('string');
    expect(typeof firstPlant.plant_name).toBe('string');
    expect(typeof firstPlant.description).toBe('string');
    expect(typeof firstPlant.price).toBe('number');
    expect(typeof firstPlant.category).toBe('string');
    expect(typeof firstPlant.plant_size).toBe('string');
    expect(typeof firstPlant.characteristic).toBe('string');

});

test('GET /plants - Should reject an invalid page number', async ({ request }) => {

    console.log('\n========================================');
    console.log('NEGATIVE TEST: GET /plants?currentPage=-1');
    console.log('========================================');

    const response = await request.get('/plants', {
        params: {
            currentPage: -1
        }
    });

    console.log('Status:', response.status());
    console.log('Body:', await response.text());

    expect(response.ok()).toBeFalsy();

});