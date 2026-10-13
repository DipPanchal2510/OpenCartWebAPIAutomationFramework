import { Locator, Page } from "@playwright/test"

export class BasePage{

    protected readonly page:Page;

    // common locators across pages:
    protected readonly logo: Locator;
    protected readonly searchBox: Locator;
    protected readonly searchIcon: Locator;
    protected readonly footerLinks: Locator;
    protected readonly currency: Locator;
    protected readonly cartBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.logo = page.getByRole('img', { name: 'naveenopencart' });
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.searchIcon = page.locator('div#search button');
        this.currency = page.locator('#form-currency');
        this.cartBtn = page.locator('div#cart button');
        this.footerLinks = page.locator('footer a');
    };

    // APP common features/actions: footer, logo, search

    async isLogoVisible(): Promise<boolean>{
        return this.logo.isVisible();
    }

    async isSearchBoxVisible(): Promise<boolean>{
        return this.searchBox.isVisible();
    }

    async isCurrencyBoxVisible(): Promise<boolean>{
        return this.currency.isVisible();
    }

    async isCartButtonnVisible(): Promise<boolean>{
        return this.cartBtn.isVisible();
    }

    async getPageFootersCount(): Promise<Number>{
        return await this.footerLinks.count();
    }

    async getPageFooters(): Promise<string[]>{
        return await this.footerLinks.allInnerTexts();
    }

    // Page level generic methods
    async getPageTitle(): Promise<string>{
        return await this.page.title()
    }

    getPageCurrentURL(): string{
        return this.page.url()
    }

    async waitForPageLoad(){
        await this.page.waitForLoadState('load');
    }

    async takeScreenshot (name: string){
        return await this.page.screenshot({
            fullPage:true,
            path: `report/screenshot/${name}.png`
        })
    }

}