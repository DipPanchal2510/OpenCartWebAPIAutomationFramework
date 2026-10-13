import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage{

    // 1. Private locators    
    private readonly header:Locator;
    private readonly prodcutImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private productInfoMap : Map <string, string | number>;
    private readonly productQty: Locator;
    private readonly addToCartBtn: Locator;
    private readonly addSuccessMsg: Locator;
    private readonly shoppingCartLink: Locator;
    
    
    // 2. constructor of the page: init the locator

    constructor(page: Page){
        super(page)
        this.header = page.getByRole('heading', { level: 1 });
        this.prodcutImages = page.locator('div#content li img');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.productInfoMap = new Map <string, string | number>();
        this.productQty = page.getByRole('textbox', { name: 'Qty' });
        this.addToCartBtn = page.getByRole('button', { name: 'Add to Cart' }).first();
        this.shoppingCartLink = page.getByRole('link', { name: 'shopping cart' });
        this.addSuccessMsg = page.getByText('Success: You have added to your !', { exact: true });

    }

    // 3. Page actions/methods

    async getProductHeader(): Promise<string> {
        return await this.header.innerText();
    }

    async getProductImages(): Promise<number> {
        await this.prodcutImages.first().waitFor({state: "visible"});
        return await this.prodcutImages.count()
    }

    async getProductInfo(): Promise<Map<string, string | number>> {
        this.productInfoMap.set('ProductHeader', await this.getProductHeader());
        this.productInfoMap.set('ProductImagesCount', await this.getProductImages());
        await this.getProductMetaData();
        await this.getProductPriceData();
        return this.productInfoMap;
    }

    // Brand: Apple
    // Product Code: Product 17
    // Reward Points: 700
    // Availability: Out Of Stock

    private async getProductMetaData(): Promise<void> {
        let metaData = await this.productMetaData.allInnerTexts();
        for(let data of metaData){
            let meta = data.split(":");
            let metaKey = meta[0].trim();
            let metaValue = meta[1].trim();
            this.productInfoMap.set(metaKey,metaValue);
        }
    }

    // $1,202.00
    // Ex Tax: $1,000.00

    private async getProductPriceData(): Promise<void> {
        let priceData = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':') [1].trim();
        this.productInfoMap.set('ProductPrice',productPrice);
        this.productInfoMap.set('ExTaxPrice',exTaxPrice);
    }

    async addToCart(qty: number): Promise<void>{
        await this.productQty.fill(qty.toString());
        await this.addToCartBtn.click();
        //return await this.addSuccessMsg.isVisible();
    }

    async addToCartSuccessMsg(): Promise<void>{
        await this.addSuccessMsg.isVisible();
        
    }

    async goToShoppingCartPage(){
        await this.shoppingCartLink.click();
    }
}