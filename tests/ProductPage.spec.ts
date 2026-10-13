import {test, expect} from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { JsonHelper } from '../src/utils/JsonHelper';

console.log("Current working directory:", process.cwd());
console.log("CSV path:", "src/testdata/productinfodata.csv");

test.beforeEach(async ({loginPage, homePage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.TEST_USERNAME,process.env.TEST_PASSWORD);
});

let testData = CsvHelper.readCsv("src/testdata/productdata.csv");
for(let row of testData){

test(`Verify product header test - ${row.searchKey} - ${row.productName}`,async ({homePage, searchResultPage, productInfoPage, page})=>{
    await homePage.doSearch(row.searchKey);
    await searchResultPage.selectProduct(row.productName);
    let productHeader = await productInfoPage.getProductHeader();
    expect(productHeader).toBe(row.productName);
    //await page.pause();
});
}

for(let row of testData){
test(`Verify product images count test - ${row.searchKey} - ${row.productName}  - ${row.resultCount} - ${row.imageCount}`,async ({homePage, searchResultPage, productInfoPage, page})=>{
    await homePage.doSearch(row.searchKey);
    await searchResultPage.selectProduct(row.productName);
    let productImagesCount = await productInfoPage.getProductImages();
    expect(productImagesCount).toBe(Number(row.imageCount));
    //await page.pause();
});
}

let productInfoTestData = JsonHelper.readJson('src/testdata/productinfodata.json');
for(let row of productInfoTestData){
test(`Verify product information test - ${row.searchKey} - ${row.productName}  - ${row.resultCount} - ${row.imageCount} - ${row.productHeader} - ${row.brand}  - ${row.productCode} - ${row.rewardPoints} - ${row.availability} - ${row.productPrice} - ${row.exTaxPrice}`,async ({homePage, searchResultPage, productInfoPage, page})=>{
    await homePage.doSearch(row.searchKey);
    await searchResultPage.selectProduct(row.productName);
    
    let actualProductInfoMap = await productInfoPage.getProductInfo();
    console.log('Actual product information : ',actualProductInfoMap);

    expect.soft(actualProductInfoMap.get('ProductHeader')).toBe(row.productName);
    expect.soft(actualProductInfoMap.get('ProductImagesCount')).toBe(Number(row.imageCount));

    expect.soft(actualProductInfoMap.get('Brand')).toBe(row.brand);
    expect.soft(actualProductInfoMap.get('Product Code')).toBe(row.productCode);
    expect.soft(actualProductInfoMap.get('Reward Points')).toBe(row.rewardPoints);
    expect.soft(actualProductInfoMap.get('Availability')).toBe(row.availability);
    expect.soft(actualProductInfoMap.get('ProductPrice')).toBe(row.productPrice);
    expect.soft(actualProductInfoMap.get('ExTaxPrice')).toBe(row.exTaxPrice);
    
    //await page.pause();
});
}

for(let row of testData){
test(`Verify user is able to product into cart test - ${row.searchKey} - ${row.productName}  - ${row.resultCount} - ${row.imageCount}`,async ({homePage, searchResultPage, productInfoPage, page})=>{
    await homePage.doSearch(row.searchKey);
    await searchResultPage.selectProduct(row.productName);
    await productInfoPage.addToCart(2)
    expect(productInfoPage.addToCartSuccessMsg).toBeTruthy();
    
    //await page.pause();
})
};

for(let row of testData){
test(`Verify user navigate on shopping cart test - ${row.searchKey} - ${row.productName}`,async ({homePage, searchResultPage, productInfoPage, page})=>{
    await homePage.doSearch(row.searchKey);
    await searchResultPage.selectProduct(row.productName);
    await productInfoPage.addToCart(2)
    await productInfoPage.goToShoppingCartPage();

    expect(await page.title()).toBe('Shopping Cart')
    //await page.pause();
})
};



