/**
 * Playwright intercept for Cards → Add New Plan (Package Settings) payload.
 * Run once Playwright is added: npx playwright test admin-packages
 */
/*
import { test, expect } from '@playwright/test';

test('Add New Plan from cards submits supported package payload', async ({ page }) => {
  await page.route('**/api/v1/admin/packages', async (route) => {
    if (route.request().method() !== 'POST') {
      await route.continue();
      return;
    }
    const payload = route.request().postDataJSON();
    expect(payload).toMatchObject({
      name: 'Test Package',
      price: 29.99,
      duration_days: 30,
    });
    expect(payload.description).toBeTruthy();
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ status: 'success', data: { id: 99, ...payload } }),
    });
  });

  await page.goto('/admin/packages');
  await page.getByTestId('packages-view-cards').click();
  await page.getByTestId('admin-packages-add-btn').click();
  await page.getByTestId('package-name').fill('Test Package');
  await page.getByTestId('package-monthly-price').fill('29.99');
  await page.getByTestId('add-package-modal-submit').click();
});

test('Update Plan from table submits PATCH payload', async ({ page }) => {
  await page.route('**/api/v1/admin/packages/1', async (route) => {
    if (route.request().method() !== 'PATCH') {
      await route.continue();
      return;
    }
    const payload = route.request().postDataJSON();
    expect(payload).toMatchObject({
      name: 'Test Package 2',
      description: 'Test description',
      price: 433.33,
      duration_days: 60,
    });
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ status: 'success', data: { id: 1, ...payload } }),
    });
  });

  await page.goto('/admin/packages');
  await page.getByTestId('packages-view-tables').click();
  await page.getByTestId('packages-edit-1').click();
  await page.getByTestId('edit-package-name').fill('Test Package 2');
  await page.getByTestId('edit-package-description').fill('Test description');
  await page.getByTestId('edit-package-price').fill('433.33');
  await page.getByTestId('edit-package-duration-days').fill('60');
  await page.getByTestId('edit-package-modal-submit').click();
});
*/

export {};
