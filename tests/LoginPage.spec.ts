import {test, expect} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({page})=>{

    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    homePage = new HomePage(page);
});

test.skip('login page title test', async ({page})=>{

    let pageTitle = await loginPage.getLoginPageTitle();
    console.log("Login page title", pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test.skip('forgot password link exist test', async ({page})=>{

    expect(await loginPage.isForgotPasswordLinkExist).toBeTruthy();
});

test.skip('order history link exist test', async ({page})=>{

    expect(await loginPage.isOrderLinkExist).toBeTruthy();
});

test.skip('return link exist test', async ({page})=>{

    expect(await loginPage.isReturnLinkExist).toBeTruthy();
});

test('user is able to login test', async ({page})=>{
    await loginPage.doLogin('sejal@gmail.com','pw123');
    expect.soft(await homePage.isLogoutLinkExist).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account')
});

test.skip('header is present test', async ({page})=>{
    expect.soft(await loginPage.isNewCustomerHeaderExist()).toBeTruthy();
    expect.soft(await loginPage.isReturningCustomerHeaderExist()).toBeTruthy();
});


