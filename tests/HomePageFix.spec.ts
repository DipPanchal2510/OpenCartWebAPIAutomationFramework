import {test, expect} from '../src/fixtures/pagefixtures';

test.beforeEach(async ({loginPage, homePage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.TEST_USERNAME,process.env.TEST_PASSWORD);
})

test('home page title test', async ({homePage})=>{

    let pageTitle = await homePage.getHomePageTitle();
    console.log("Home page title", pageTitle);
    expect(pageTitle).toBe('My Account');
});

test('Logout link exist test', async({homePage})=>{
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
})

test('Home page header exist test', async({homePage})=>{
    let allHeader = await homePage.getHomePageHeader();
    console.log('Home page headers ',allHeader);
    expect.soft(allHeader).toHaveLength(4);
    expect.soft(allHeader).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);

    

})
