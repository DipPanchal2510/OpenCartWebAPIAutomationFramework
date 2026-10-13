import { test, expect, request } from '@playwright/test';


let tokenID: string;

test.beforeEach('Generate the token', async({request})=>{
    let cred = {
        "username" : "admin",
        "password" : "password123"
    }

    let authResponse = await request.post('https://restful-booker.herokuapp.com/auth',{
        headers: {"Content-Type": "application/json"},
        data: cred
    });

    expect(authResponse.status()).toBe(200);
    let jsonResponse = await authResponse.json();
    console.log('Auth API response : ',jsonResponse);
    tokenID = jsonResponse.token;
    console.log(tokenID);
});


test('Create a booking', async({request})=>{
    // 1. create a booking 

    let bookingResponse = await request.post('https://restful-booker.herokuapp.com/booking',{
        headers:{"Content-Type": "application/json"},
        data: {
            "firstname" : "Deepesh",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        }
    });

    expect(bookingResponse.status()).toBe(200);
    let bookingBody = await bookingResponse.json();
    let bookingId = bookingBody.bookingid;
    console.log("Booking id is : ", bookingId);

    // 2. update booking 

    let updateResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`,{
       headers: {Cookie:`token=${tokenID}`},
       data: {
            "firstname" : "Jim",
            "lastname" : "Brown",
            "totalprice" : 222,
            "depositpaid" : true,
            "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Dinner"
        }   
    })
    expect(updateResponse.status()).toBe(200);
    let updateBody = await updateResponse.json();
    expect(updateBody.totalprice).toBe(222);
    expect(updateBody.additionalneeds).toBe("Dinner");
    console.log(updateBody);
    
    // 3. delete booking

    let deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`,{
       headers: {Cookie:`token=${tokenID}`}
    })

    expect(deleteResponse.status()).toBe(201);
    expect(deleteResponse.statusText()).toBe("CREATED");


});