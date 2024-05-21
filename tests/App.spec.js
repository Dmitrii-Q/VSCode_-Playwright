const { test, expect } = require('@playwright/test');
const { USER_EMAIL, USER_PASSWORD } = require('./user');

test('Успешная авторизация', async ({ page }) => {
  // Открываем страницу и нажимаем кнопку "Войти"
  await page.goto('https://netology.ru');
  await page.click('text="Войти"');

  await page.fill('[name="password"]', USER_PASSWORD);
  await page.fill('input[type=email]', USER_EMAIL);

  // Нажимаем кнопку "Войти" еще раз
  await Promise.all([
    page.waitForNavigation(),
    page.click('button:has-text("Войти")'),
  ]);

  // Проверяем, что открылась страница профиля
  await expect(page).toHaveURL(/\/profile(\/\d+)?$/, { timeout: 10000 });

  // Вывод текущего URL для отладки
  console.log('Current URL:', page.url());

  // Снимок экрана для отладки
  await page.screenshot({ path: 'profile_page.png' });

  // Проверяем, что заголовок страницы профиля присутствует
  await expect(page.locator('h2')).toHaveText('Моё обучение', { timeout: 10000 });
});



test('Неуспешная авторизация', async ({ page }) => {
  // Открываем страницу и нажимаем кнопку "Войти"
  await page.goto('https://netology.ru');
  await page.click('text="Войти"');

  // Вводим неверный пароль
  await page.fill('[name="password"]', 'wrong-password');
  await page.fill('input[type=email]', USER_EMAIL);

  // Нажимаем кнопку "Войти"
  await page.click('button:has-text("Войти")');

  // Ожидание появления элемента с текстом сообщения об ошибке
  await expect(page.locator('text=Вы ввели неправильно логин или пароль')).toBeVisible({ timeout: 10000 });
});
