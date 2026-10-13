import {test, expect} from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async ({loginPage, homePage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.TEST_USERNAME,process.env.TEST_PASSWORD);
});

let testData = CsvHelper.readCsv('src/testdata/productdata.csv');
for(let row of testData){

test(`Verify search results test - ${row.searchKey} - ${row.productName} `,async({homePage, searchResultPage})=>{
    await homePage.doSearch(row.searchKey);
    let actResultCount = await searchResultPage.getProductSearchResultsCount();
    console.log("Search result count : ",actResultCount);
    expect(actResultCount).toBe(Number(row.resultCount));
})
};

for(let row of testData){
test(`User is able to land on the product page - ${row.searchKey} - ${row.productName} `, async({homePage, searchResultPage, page})=>{
    await homePage.doSearch(row.searchKey);
    await searchResultPage.selectProduct(row.productName);
    expect(await page.title()).toBe(row.productName);
    //await page.pause();
})
};

