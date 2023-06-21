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
    test.fixme(`Login test for ${user.name} @smoke`, async ({ page }) => {
        const mainPage = new MainPage(page);

        await mainPage.goto();
        const loginPage = await mainPage.openLoginPage();
        await loginPage.logIn(user.email, user.password);       

        await mainPage.userName.waitFor();
        await expect(mainPage.userName).toHaveText(user.name);
    });
}