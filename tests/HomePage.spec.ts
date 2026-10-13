import {test, expect} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({page})=>{

    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('sejal@gmail.com','pw123');
    homePage = new HomePage(page);
})

test.skip('home page title test', async ()=>{

    let pageTitle = await homePage.getHomePageTitle();
    console.log("Home page title", pageTitle);
    expect(pageTitle).toBe('My Account');
});

test('Logout link exist test', async()=>{
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
})

test.skip('Home page header exist test', async()=>{
    let allHeader = await homePage.getHomePageHeader();
    console.log('Home page headers ',allHeader);
    expect.soft(allHeader).toHaveLength(4);
    expect.soft(allHeader).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])

})
