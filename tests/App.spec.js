const { test, expect } = require("@playwright/test");
const { USER_EMAIL, USER_PASSWORD } = require("./user");
const { launchBrowser } = require("./NetologyTest");

test("test", async ({ page }) => {
  // Go to https://netology.ru/free/management#/
  await page.goto("https://netology.ru/free/management#/");
  
  // Wait for the link to appear
  await page.waitForSelector("a");

  // Click a
  await page.click("a");
  await expect(page).toHaveURL("https://netology.ru/");

  // Wait for the link to appear
  await page.waitForSelector("text=Учиться бесплатно");

  // Click text=Учиться бесплатно
  await page.click("text=Учиться бесплатно");
  await expect(page).toHaveURL("https://netology.ru/free");

  // Wait for the text to appear
  await page.waitForSelector("text=Бизнес и управление");

  page.click("text=Бизнес и управление");

  // Wait for the text to appear
  await page.waitForSelector("text=Как перенести своё дело в онлайн");

  // Click text=Как перенести своё дело в онлайн
  await page.click("text=Как перенести своё дело в онлайн");
  await expect(page).toHaveURL(
    "https://netology.ru/programs/kak-perenesti-svoyo-delo-v-onlajn-bp"
  );
});

test("Successful authorization", async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();

  // Go to the login page
  await page.goto("https://netology.ru/");

  // Click on the "Войти" button
  await page.click('text="Войти"');

  // Fill in the email and password fields
  await page.fill('[name="email"]', USER_EMAIL);
  await page.fill('[name="password"]', USER_PASSWORD);

  // Click on the "Войти" button
  await page.click('button:has-text("Войти")');

  // Wait for navigation to complete
  await page.waitForNavigation();

  // Check if the profile page is opened
  await expect(page).toHaveURL("https://netology.ru/profile");

  // Close the browser after the test
  await browser.close();
});

test("Unsuccessful authorization", async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();

  // Go to the login page
  await page.goto("https://netology.ru/");

  // Click on the "Войти" button
  await page.click('text="Войти"');

  // Fill in invalid email and password
  await page.fill('[name="email"]', "invalid_email@example.com");
  await page.fill('[name="password"]', "invalid_password");

  // Click on the "Войти" button
  await page.click('button:has-text("Войти")');

  // Check if the error message is displayed
  await expect(page).toHaveText("Неверный email или пароль");

  // Close the browser after the test
  await browser.close();
});
