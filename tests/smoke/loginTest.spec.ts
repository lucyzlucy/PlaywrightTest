import { test, expect } from '@playwright/test';
import { readCsvRecords } from '../../utils/Helpers';
import { User } from '../../entities/Uset';
import 'dotenv/config';
import { MainPage } from '../../pages/MainPage';

let users: User[];

const password = process.env.PASSWORD;
const usersFromFile = readCsvRecords("test-data/users.csv");
users = usersFromFile.map(({ email, name }) => new User(email, name, password));

for (const user of users) {
    test.only(`Login test for ${user.name} @smoke`, async ({ page }) => {
        const mainPage = new MainPage(page);

        await mainPage.goto();
        await page.getByRole('link', { name: ' Увійти' }).click();
        await page.getByLabel('E-mail').click();
        await page.getByLabel('E-mail').fill(user.email);
        await page.getByLabel('Пароль').click();
        await page.getByLabel('Пароль').fill(user.password);
        await page.getByRole('button', { name: ' Показати пароль' }).click();
        await page.frameLocator('[title="reCAPTCHA"]').getByRole('checkbox', { name: 'I\'m not a robot' }).click();
        await page.getByRole('button', { name: 'Увійти' }).click();
        await mainPage.userName.waitFor();
        await expect(mainPage.userName).toHaveText(user.name);
    });
}