import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AccountPage extends BasePage {

    // 1. Private locator
    private readonly myAccountLink: Locator;
    private readonly accountCreatedMessage: Locator;

    // 2. constructor of the page: init the locator

    constructor(page:Page){
        super(page);
        this.myAccountLink = page.getByRole('link', { name: 'My Account' }).nth(1);
        this.accountCreatedMessage = page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 });
    }

    // 3. public page actions : methods/behaviour of the page (encapsulation)

    async isMyAccountLinkExist() : Promise<boolean> {
        return await this.myAccountLink.isVisible();
    }

    async isAccountCreatedMessageDisplayed():Promise<boolean>{
        return await this.accountCreatedMessage.isVisible();
    }

    
}