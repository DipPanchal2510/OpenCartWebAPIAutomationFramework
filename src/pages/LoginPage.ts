import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    // 1. Private locator
    private readonly emailId:Locator;
    private readonly password:Locator;
    private readonly loginBtn:Locator;
    private readonly forgotPasswordLink:Locator;
    private readonly loginError:Locator;
    private readonly newCustHeader: Locator;
    private readonly retCust: Locator;
    private readonly orderHistoryLink: Locator;
    private readonly returnLink: Locator;
    //private readonly searchBox: Locator;

    // 2. constructor of the page: init the locator

    constructor(page: Page) {
        super(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.loginError = page.locator('.alert.alert-danger.alert-dismissible');
        this.newCustHeader = page.getByRole('heading', { name: 'New Customer', level: 2 });
        this.retCust = page.getByRole('heading', { name: 'Returning Customer', level: 2 });
        this.orderHistoryLink = page.getByRole('link', { name: 'Order History' }).first();
        this.returnLink = page.getByRole('link', { name: 'Returns' }).first();
        //this.searchBox = page.getByRole('textbox', { name: 'Search' });
    }

    // 3. public page actions : methods/behaviour of the page (encapsulation)

    async goToLoginPage() : Promise<void> {
        await this.page.goto("opencart/index.php?route=account/login");
    }

    
    async isForgotPasswordLinkExist() : Promise<boolean> {
        return await this.forgotPasswordLink.isVisible();
    }

    async doLogin(username:string, password:string) : Promise<void>{
        console.log(`User credentials : ${username} - ${password}`);
        await this.emailId.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
        //this.page.pause();
    }

    async isInvalidLoginErrorDisplayed():Promise<boolean>{
        await this.loginBtn.click();
        return await this.loginError.isVisible();
    }

    async isOrderLinkExist() : Promise<boolean> {
        return await this.orderHistoryLink.isVisible();
    }

    async isReturnLinkExist() : Promise<boolean> {
        return await this.returnLink.isVisible();
    }

    async isNewCustomerHeaderExist() : Promise<boolean> {
        return await this.newCustHeader.isVisible();
    }

    async isReturningCustomerHeaderExist() : Promise<boolean> {
        return await this.retCust.isVisible();
    }

    
    
}