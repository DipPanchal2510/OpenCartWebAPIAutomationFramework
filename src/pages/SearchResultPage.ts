import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultPage extends BasePage{

    // 1. Private locators    
    private readonly searchResults:Locator;
    
    // 2. constructor of the page: init the locator

    constructor(page: Page){
        super(page)
        this.searchResults = page.locator('div.product-layout');
        
    }

    async getProductSearchResultsCount(): Promise<number>{
        return await this.searchResults.count();
    }

    async selectProduct(productName: string){
        console.log("Product name is :", productName);
        await this.page.getByRole('link', { name: productName, exact:true }).first().click();
    }

}