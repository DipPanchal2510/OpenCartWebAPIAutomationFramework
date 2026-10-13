import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{

    // 1. Private locators
    private readonly logoutLink: Locator;
    private readonly header: Locator;
    private readonly searchBox : Locator;
    private readonly searchIcon : Locator;

    // 2. constructor of the page: init the locator

    constructor(page: Page){
        super(page)
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.header = page.getByRole('heading', { level: 2 });
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.searchIcon = page.locator('#search button');
    }

    // 3. Page actions/methods

    async getHomePageTitle() : Promise<string>{
        return await this.page.title();
    }

    async isLogoutLinkExist() : Promise<boolean> {
        return await this.logoutLink.isVisible();
    }
    
    async getHomePageHeader() : Promise<string[]> {
        return await this.header.allInnerTexts();
    }

    async doSearch(searchKey: string) : Promise<void>{
        console.log("Search key is : ", searchKey);
        await this.searchBox.fill(searchKey);
        await this.searchIcon.click();
    }
}