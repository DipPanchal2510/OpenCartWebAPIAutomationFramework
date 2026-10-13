import { test, expect, request } from '@playwright/test'

let AUTH_TOKEN = {
    Cookie: 'token=6514c9469f04bd6',
}

test('Get all booking ids', async({request})=>{
    let response = await request.get('https://restful-booker.herokuapp.com/booking');
    let jsonBody = await response.json();

    console.log(jsonBody);
    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(200);
});

test('Get particular booking id', async({request})=>{
    let response = await request.get('https://restful-booker.herokuapp.com/booking/2');
    let jsonBody = await response.json();

    console.log(jsonBody);
    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(200);
});

test('Create a booking id', async({request})=>{

    // JS object
    let userData = {
        "firstname" : "Satish",
        "lastname" : "Kande",
        "totalprice" : 456,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2021-01-01",
            "checkout" : "2022-01-01"
        }
    }

    let response = await request.post('https://restful-booker.herokuapp.com/booking',{
        data: userData,
    });
    let jsonBody = await response.json();

    console.log(jsonBody);
    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(200);
});

test('Update a booking details', async({request})=>{

    // JS object
    let userData = {
        "firstname" : "Akshya",
        "lastname" : "DD",
        "totalprice" : 500,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2024-01-01",
            "checkout" : "2024-01-01"
        },
        "additionalneeds" : "Breakfast"
    }

    let response = await request.put('https://restful-booker.herokuapp.com/booking/2',{
        headers: AUTH_TOKEN,
        data: userData,
    });
    let jsonBody = await response.json();

    console.log(jsonBody);
    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(200);
});

test('Delete a booking details of particular id', async({request})=>{
   
    let response = await request.delete('https://restful-booker.herokuapp.com/booking/3440',{
        headers: AUTH_TOKEN,
    });

    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(201);
});