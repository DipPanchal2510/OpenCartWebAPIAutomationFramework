import { test, expect } from '@playwright/test'

// Web page -> intercept the network calls and log them...
// **/* -> wildcard pattern for URLs

test('intercept and log requests', async({page})=>{
    await page.route('**/*',async (route)=>{
        console.log(route.request().method(), route.request().url());
        await route.continue() // url1 -- capture, url2 -- capture
    });

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
});

// mocking : fake data
// use case -> if backend is not available then we can create mocking for testing
test('mocking with intercept test', async({page})=>{
    //https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=Macbook

    let fakeProducts = [
        {name: 'Fake MacBook Pro', price:'$500'},
        {name: 'Fake iPhone Pro', price:'$2500'}
    ]

    await page.route('**/index.php?route=product/search&search=Macbook', async (route)=>{
        await route.fulfill({
            status:200,
            contentType:'application/json',
            body: JSON.stringify(fakeProducts)
        });
    });

    await page.goto('https://abc.com/index.php?route=product/search&search=Macbook');

    await page.pause();
});