import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('frontpage has login form', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  await expect(page.locator('input[name="Username"]')).toBeVisible();
  await expect(page.locator('input[name="Password"]')).toBeVisible();

  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('user can login and see blogs', async ({ page }) => {
  await page.fill('input[name="Username"]', 'testuser');
  await page.fill('input[name="Password"]', 'testpassword');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=testuser')).toBeVisible();

  const blogRows = page.locator('table tbody tr');
  await expect(blogRows).toHaveCount(1);

  const firstBlog = blogRows.first();
  await expect(firstBlog).toContainText('by');
});
