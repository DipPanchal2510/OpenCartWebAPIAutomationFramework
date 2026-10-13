import { test, expect, request, APIResponse } from '@playwright/test'

let AUTH_TOKEN = {
    Authorization : 'Bearer 566b53ee25f03b0c92dac4ed5642a33beffc1e4ee629002e30c6274dd8b78750',
};

test('Get all users api test', async({request})=>{

    let response: APIResponse = await request.get('https://gorest.co.in/public/v2/users',{
        headers: AUTH_TOKEN,
    })

    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(200);
});

test('create a user POST api test', async({request})=>{

    // User JS object
    let userData = {
        "name": "Lucky Guneta",
        "email": `pwautomation_${Date.now()}@open.com`,
        "gender": "female",
        "status": "active"
    }

    // JS object -> JSON(serialization)

    let response:APIResponse = await request.post('https://gorest.co.in/public/v2/users',{
        headers: AUTH_TOKEN,
        data: userData
    })

    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(201);
});

test('update a user PUT api test', async({request})=>{

     // User JS object
    let userData = {
        "name": "Lucky watlkar",
        "email": "lucky@watlkar.example",
        "gender": "male",
        "status": "active"
    }

    // JS object -> JSON(serialization)

    let response:APIResponse = await request.put('https://gorest.co.in/public/v2/users/8653501',{
        headers: AUTH_TOKEN,
        data: userData
    })

    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status()); //200
    console.log(response.statusText()); // 

    expect(response.status()).toBe(200); //200
});

test('delete a user DELET api test', async({request})=>{

    // JS object -> JSON(serialization)

    let response:APIResponse = await request.delete('https://gorest.co.in/public/v2/users/8653501',{
        headers: AUTH_TOKEN, 
    });

    console.log(response.status()); //204
    console.log(response.statusText()); // no content

    expect(response.status()).toBe(204); //200
});
