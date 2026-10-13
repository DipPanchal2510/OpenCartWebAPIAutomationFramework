import {test, expect} from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async ({registerPage, accountPage})=>{

    // loginPage = new LoginPage(page);
    // await loginPage.goToLoginPage();
    //registerPage = new RegisterPage(page);
    await registerPage.goToRegisterPage();
})

test('register page title test', async ({registerPage})=>{

    let pageTitle = await registerPage.getRegisterPageTitle();
    console.log("Register page title", pageTitle);
    expect(pageTitle).toBe('Register Account');
});

test('header exist test', async ({registerPage})=>{

    expect(await registerPage.isHeaderExist()).toBeTruthy();
        
});

test('login link exist test', async ({registerPage})=>{

    expect(await registerPage.isLoginLinkExist()).toBeTruthy();
});

let registerTestData = CsvHelper.readCsv('src/testdata/registerdata.csv');
for(let row of registerTestData){
test(`user is able to register test - ${row.firstname} - ${row.lastname} - ${row.email} - ${row.telephone} - ${row.password} - ${row.confirmpassword} `, async({registerPage, accountPage})=>{
    await registerPage.doRegister(row.firstname, row.lastname, row.email, row.telephone, row.password, row.confirmpassword);
    expect.soft(await accountPage.isMyAccountLinkExist()).toBeTruthy();
    expect(await accountPage.isAccountCreatedMessageDisplayed()).toBeTruthy();
})
};