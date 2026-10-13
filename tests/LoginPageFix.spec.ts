import { allure } from 'allure-playwright';
import {test, expect} from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';
import { log, meta, testData} from 'reporting-labs';

test.beforeEach(async ({loginPage})=>{
    await loginPage.goToLoginPage();
});

// AAA
test('login page title test', async ({loginPage})=>{

    meta({priority: 'P2', severity: 'minor', owner: 'Deepesh',story: 'US101', epic: 'EP11', feature:'F30',issue:'bug33'});

    let pageTitle = await loginPage.getPageTitle();
    console.log("Login page title", pageTitle);

    await log("Login page title", pageTitle);

    expect(pageTitle).toBe('Account Login');
});

test('forgot password link exist test', async ({loginPage})=>{

    expect(await loginPage.isForgotPasswordLinkExist()).toBeTruthy();
});

test('order history link exist test', async ({loginPage})=>{

    expect(await loginPage.isOrderLinkExist()).toBeTruthy();
});

test('return link exist test', async ({loginPage})=>{

    expect(await loginPage.isReturnLinkExist()).toBeTruthy();
});

test('header is present test', async ({loginPage})=>{
    expect.soft(await loginPage.isNewCustomerHeaderExist()).toBeTruthy();
    expect.soft(await loginPage.isReturningCustomerHeaderExist()).toBeTruthy();
});

test('user is able to login test with valid credentials', async ({loginPage, homePage})=>{

    await allure.suite("Login test");
    await allure.severity("Critical");
    await allure.feature("Authentication");
    await allure.story("Login test");
    await allure.description("Verify user can login to application");

    await testData({username: process.env.TEST_USERNAME, password: process.env.TEST_PASSWORD}, 'login');

    await allure.step("Login with valid credentials", async()=>{
        await loginPage.doLogin(process.env.TEST_USERNAME,process.env.TEST_PASSWORD);
    })

    await allure.step("Verify Logout link is visible", async()=>{
       expect.soft(await homePage.isLogoutLinkExist).toBeTruthy();
    })

    await allure.step("Verify Account page title is visible", async()=>{
       expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
    })
    
    
});


// pros
// 1. light weight
// 2. easy to maintain/read
// 3. 3rd party lib
// 4. loop the test method row wise
// 5. good for large set of data

// DD 1 = read the CSV data directly from CSV file and loop the test method row wise...
let testingData = CsvHelper.readCsv('src/testdata/logindata.csv');
for(let row of testingData){
test(`Login test with invalid credentials with CSV data - ${row.username} - ${row.password}`, async ({loginPage, homePage})=>{
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
});

}

// cons
// 1. maintenance
// 2. MS linsenses

// DD 2 = read the excel data directly from excel file and loop the test method row wise...
let testExcelData = ExcelHelper.readExcel('src/testdata/opencarttestdata.xlsx','login');
for(let row of testExcelData){
test(`Login test with invalid credentials with Excel data - ${row.username} - ${row.password}`, async ({loginPage, homePage})=>{
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
});

}

// pros
// 1. inbuilt mthod: parse
// 2. light weight
// 3. good for smaller set of data

// DD 3 = read the JSON data directly from JSON file and loop the test method row wise...
let testJsonlData = JsonHelper.readJson('src/testdata/logindata.json');
for(let row of testJsonlData){
test(`Login test with invalid credentials with JSON data - ${row.username} - ${row.password}`, async ({loginPage, homePage})=>{
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
});

}
// Common test on page

test('App logo exist on Login page test', async({basePage})=>{
    let exist = await basePage.isLogoVisible();
    expect(exist).toBeTruthy();
    //console.log(exist);
});
test('Search Box exist on Login page test', async({basePage})=>{
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
});

test('Cart button exist on Login page test', async({basePage})=>{
    expect(await basePage.isCartButtonnVisible()).toBeTruthy();
});

test('Footers exist on Login page test', async({basePage})=>{
    expect(await basePage.getPageFootersCount()).toBe(16);
});

