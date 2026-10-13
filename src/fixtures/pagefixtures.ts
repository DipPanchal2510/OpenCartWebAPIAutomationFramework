import { test as baseTest} from '@playwright/test'
import { BasePage } from '../pages/BasePage'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { RegisterPage } from '../pages/RegisterPage'
import { SearchResultPage } from '../pages/SearchResultPage'
import { ProductInfoPage } from '../pages/ProductInfoPage'
import { AccountPage } from '../pages/AccountPage'

type pageFixtures= {
    basePage: BasePage,
    loginPage: LoginPage,
    homePage: HomePage,
    registerPage: RegisterPage,
    searchResultPage: SearchResultPage,
    productInfoPage: ProductInfoPage,
    accountPage: AccountPage
    
}

// Extend playwright test using baseTest.extend: inheritance

export let test = baseTest.extend<pageFixtures>({

    basePage: async({page} , use)=>{
        let basePage = new BasePage(page);
        await use(basePage);
    },

    loginPage: async({page} , use)=>{
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async({page} , use)=>{
        let homePage = new HomePage(page);
        await use(homePage);
    },

    registerPage: async({page} , use)=>{
        let registerPage = new RegisterPage(page);
        await use(registerPage);
    },

    searchResultPage: async({page} , use)=>{
        let searchResultPage = new SearchResultPage(page);
        await use(searchResultPage);
    },

    productInfoPage: async({page} , use)=>{
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },

    accountPage: async({page} , use)=>{
        let accountPage = new AccountPage(page);
        await use(accountPage);
    },
});

export {expect} from '@playwright/test';