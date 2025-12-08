const {
  test,
  expect,
  beforeEach,
  describe,
  beforeAll,
} = require('@playwright/test');
const { hasUncaughtExceptionCaptureCallback } = require('process');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset');
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Ze Roberto',
        username: 'ZeR',
        password: 'sek',
      },
    });

    await page.goto('http://localhost:5173');
  });

  test.only('Login form is shown', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await expect(page.getByText('Blog App')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  describe('Login', () => {
    test.only('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('ZeR');
      await page.getByLabel('password').fill('sek');
      await page.getByRole('button', { name: 'Login' }).click();

      await page.waitForSelector('.notification.success');
      await expect(page.locator('.notification.success')).toContainText(
        'User ZeR logged in',
        {
          timeout: 5000,
        }
      );
    });

    test.only('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('ZeR');
      await page.getByLabel('password').fill('sec');
      await page.getByRole('button', { name: 'Login' }).click();

      await expect(page.locator('.notification.error')).toContainText(
        'wrong username or password'
      );
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('ZeR');
      await page.getByLabel('password').fill('sek');
      await page.getByRole('button', { name: 'Login' }).click();
    });

    test.only('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'New blog' }).click();
      await page.getByLabel('title').fill('Kinestetiikka');
      await page.getByLabel('author').fill('KinMaster');
      await page.getByLabel('url').fill('www.kines.com');
      await page.getByRole('button', { name: 'Add blog' }).click();
      await expect(
        page.getByRole('link', { name: 'Kinestetiikka' })
      ).toBeVisible();
    });

    test('user can delete the blog', async ({ page }) => {
      const blogItem = page.locator('div.playwrightblog', {
        hasText: 'Kinestetiikka',
      });
      await blogItem.getByRole('button', { name: 'View' }).click();

      page.once('dialog', async (dialog) => {
        expect(dialog.message()).toContain(
          'Sure you want to delete blog Kinestetiikka by KinMaster'
        );
        await dialog.accept();
      });
      await blogItem.getByRole('button', { name: 'Delete' }).click();
      await expect(
        page.locator('div.playwrightblog', { hasText: 'Kinestetiikka' })
      ).not.toBeVisible();
    });

    describe('and a blog exist', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'New blog' }).click();
        await page.getByLabel('title').fill('Yoga');
        await page.getByLabel('author').fill('Guru');
        await page.getByLabel('url').fill('www.yoga.com');
        await page.getByRole('button', { name: 'Add blog' }).click();
      });

      test('like button works', async ({ page }) => {
        const blogItem = page.locator('div.playwrightblog', {
          hasText: 'Yoga',
        });
        await blogItem.getByRole('button', { name: 'View' }).click();

        const likesText = blogItem.locator('text=Likes:');
        const initialLikes = await likesText.textContent();

        const initialCount = parseInt(initialLikes.replace('Likes: ', ''), 10);

        await blogItem.getByRole('button', { name: 'Like' }).click();

        await expect(
          blogItem.locator(`text=Likes: ${initialCount + 1}`)
        ).toBeVisible();
      });
    });
  });
});
