const {
  test,
  expect,
  beforeEach,
  describe,
  beforeAll,
} = require('@playwright/test');

describe('Blog app', () => {
  beforeAll(async ({ request }) => {
    await request.post('http://localhost:3003/api/testing/reset');
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Ze Roberto',
        username: 'ZeR',
        password: 'sek',
      },
    });
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Alborosie',
        username: 'Albo',
        password: 'sekret',
      },
    });
  });

  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Blog App')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('ZeR');
      await page.getByLabel('password').fill('sek');
      await page.getByRole('button', { name: 'Login' }).click();

      await page.waitForSelector('.notification.success');
      await expect(page.locator('.notification.success')).toContainText(
        'User ZeR logged in'
      );
    });

    test('fails with wrong credentials', async ({ page }) => {
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

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'New blog' }).click();
      await page.getByLabel('title').fill('Kinestetiikka');
      await page.getByLabel('author').fill('KinMaster');
      await page.getByLabel('url').fill('www.kines.com');
      await page.getByRole('button', { name: 'Add blog' }).click();
      await expect(
        page.getByRole('link', { name: /Kinestetiikka/ })
      ).toBeVisible();
    });

    test('user can delete the blog', async ({ page }) => {
      await page.getByRole('button', { name: 'New blog' }).click();
      await page.getByLabel('title').fill('Dub');
      await page.getByLabel('author').fill('DubMaster');
      await page.getByLabel('url').fill('www.dub.com');
      await page.getByRole('button', { name: 'Add blog' }).click();

      page.once('dialog', async (dialog) => {
        expect(dialog.message()).toContain(
          'Sure you want to delete blog Dub by DubMaster?'
        );
        await dialog.accept();
      });
      await page.getByRole('link', { name: /Dub/ }).click();
      await page.getByRole('button', { name: 'Delete' }).click();
      await expect(page.getByRole('link', { name: 'Dub' })).toHaveCount(0);
    });
  });

  describe('and a blog exist', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('ZeR');
      await page.getByLabel('password').fill('sek');
      await page.getByRole('button', { name: 'Login' }).click();

      await page.getByRole('button', { name: 'New blog' }).click();
      await page.getByLabel('title').fill('Yoga');
      await page.getByLabel('author').fill('Guru');
      await page.getByLabel('url').fill('www.yoga.com');
      await page.getByRole('button', { name: 'Add blog' }).click();
    });

    test('like button works', async ({ page }) => {
      await page.getByRole('link', { name: 'Yoga' }).click();

      const likeButton = page.getByTestId('like-button');
      const initialLikesText = await likeButton.textContent();

      const initialLikes = parseInt(initialLikesText ?? '0', 10);

      await likeButton.click();

      await expect(likeButton).toHaveText(String(initialLikes + 1));
    });
  });
});
