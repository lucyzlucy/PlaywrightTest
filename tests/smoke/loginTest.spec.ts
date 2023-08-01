import { expect } from '@playwright/test';
import { readCsvRecords } from '../../utils/Helpers';
import { User } from '../../entities/Uset';
import 'dotenv/config';
import { test } from "../base";

let users: User[];

const password = process.env.PASSWORD;
const usersFromFile = readCsvRecords("test-data/users.csv");
users = usersFromFile.map(({ email, name }) => new User(email, name, password));

for (const user of users) {
    test.fixme(`Login test for ${user.name} @smoke`, async ({ app }) => {

        await app.mainPage.goto();
        await app.mainPage.openLoginPage();
        await app.loginPage.logIn(user.email, user.password);       

        await app.mainPage.userName.waitFor();
        await expect(app.mainPage.userName).toHaveText(user.name);
    });
}