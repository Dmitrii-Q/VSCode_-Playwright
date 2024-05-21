const { test, expect } = require('@playwright/test');
const { USER_EMAIL, USER_PASSWORD } = require('./user');

test('Успешная авторизация', async ({ page }) => {
  // Открываем страницу и нажимаем кнопку "Войти"
  await page.goto('https://netology.ru');
  await page.click('text="Войти"');

  await page.fill('input[type=email]', USER_EMAIL);
  await page.fill('[name="password"]', USER_PASSWORD);

  // Нажимаем кнопку "Войти" еще раз
  await Promise.all([
    page.waitForNavigation(),
    page.click('button:has-text("Войти")'),
  ]);

  // Проверяем, что открылась страница профиля
  await expect(page).toHaveURL(/\/profile$/);

  // Проверяем, что заголовок страницы профиля присутствует
  await expect(page).toHaveText('h2', 'Личный кабинет');
});

test('Неуспешная авторизация', async ({ page }) => {
  // Открываем страницу и нажимаем кнопку "Войти"
  await page.goto('https://netology.ru');
  await page.click('text="Войти"');

  await page.fill('input[type=email]', 'invalid_email@example.com');
  await page.fill('[name="password"]', 'invalid_password');

  // Нажимаем кнопку "Войти" еще раз
  await Promise.all([
    page.waitForResponse(response => response.url().includes('/auth/login') && response.status() === 200),
    page.click('button:has-text("Войти")'),
  ]);

  // Проверяем, что появился блок с текстом об ошибке
  await expect(page).toHaveText('[data-testid="login-error-hint"]', 'Вы ввели неправильно логин или пароль');
});
