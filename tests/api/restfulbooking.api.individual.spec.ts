import { test,expect } from "../../src/fixtures/apifixtures";

let AUTH_HEADER: Record<string, string>;
let tokenID:any;
//const TOKEN = process.env.API_TOKEN;
// let AUTH_HEADER = {
//     Cookie:`token=${tokenID}`,
// };

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

    AUTH_HEADER = {
    Cookie:`token=${tokenID}`,
};


});

// Helper - generic function - create a user (POST call)
async function creatBooking(restfulBookerHelper:any) {

    let userData = {
        "firstname" : "Anish",
        "lastname" : "Kande",
        "totalprice" : 456,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2021-01-01",
            "checkout" : "2022-01-01"
        }
    }
    
    let response = await restfulBookerHelper.post('/booking',userData);
    expect(response.status).toBe(200);
    return response.body;
}

// test 1: create a user + verify AAA
// POST --> bookingID --> GET/ bookingID --> verify
test('POST API - create a booking', async({bookingHelper})=>{
    // 1. create booking
    let bookingResponse = await creatBooking(bookingHelper)
    console.log(bookingResponse);
    let bookingId = bookingResponse.bookingid;
    console.log(bookingId);

    // 2. Get booking

    let getBookingResponse = await bookingHelper.get(`/booking/${bookingId}`);
    expect(getBookingResponse.status).toBe(200);
    expect(getBookingResponse.statusText).toBe("OK");
    expect(getBookingResponse.body.firstname).toBe(bookingResponse.booking.firstname);
    expect(getBookingResponse.body.totalprice).toBe(bookingResponse.booking.totalprice);
});


// test 2 : update a uesr test + verify AAA
// POST --> bookingID --> GET/ bookingID --> PUT/ bookingID --> GET/ bookingID --> verify
test('PUT API - update a booking', async({bookingHelper})=>{
    // 1. create booking
    let bookingResponse = await creatBooking(bookingHelper)
    console.log(bookingResponse);
    let bookingId = bookingResponse.bookingid;
    console.log(bookingId);

    // 2. Get booking

    let getBookingResponse = await bookingHelper.get(`/booking/${bookingId}`);
    expect(getBookingResponse.status).toBe(200);
    expect(getBookingResponse.statusText).toBe("OK");
    expect(getBookingResponse.body.firstname).toBe(bookingResponse.booking.firstname);
    expect(getBookingResponse.body.totalprice).toBe(bookingResponse.booking.totalprice);

    // 3. Update booking
    let bookingUpdatedData = {
        "firstname" : "Banti",
        "lastname" : "Kande",
        "totalprice" : 9999,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2021-01-01",
            "checkout" : "2022-01-01"
        },
        "additionalneeds" : "Dineer"
    }

    let updateResponse = await bookingHelper.put(`/booking/${bookingId}`,bookingUpdatedData,AUTH_HEADER);
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.firstname).toBe(bookingUpdatedData.firstname);
    expect(updateResponse.body.additionalneeds).toBe(bookingUpdatedData.additionalneeds);

    // 4. Get booking

    getBookingResponse = await bookingHelper.get(`/booking/${bookingId}`);
    expect(getBookingResponse.status).toBe(200);
    expect(updateResponse.body.firstname).toBe(bookingUpdatedData.firstname);
    expect(updateResponse.body.additionalneeds).toBe(bookingUpdatedData.additionalneeds);

});

// test 3 : delete a uesr test + verify AAA
// POST --> bookingID --> GET/ bookingID --> DELETE/ bookingID --> GET/ bookingID --> verify
test('DELETE API - delete a booking', async({bookingHelper})=>{
    // 1. create booking
    let bookingResponse = await creatBooking(bookingHelper)
    console.log(bookingResponse);
    let bookingId = bookingResponse.bookingid;
    console.log(bookingId);

    // 2. Get booking

    let getBookingResponse = await bookingHelper.get(`/booking/${bookingId}`);
    expect(getBookingResponse.status).toBe(200);
    expect(getBookingResponse.statusText).toBe("OK");
    expect(getBookingResponse.body.firstname).toBe(bookingResponse.booking.firstname);
    expect(getBookingResponse.body.totalprice).toBe(bookingResponse.booking.totalprice);

    // 3. Delete booking
    let deleteResponse = await bookingHelper.delete(`/booking/${bookingId}`,AUTH_HEADER);
    expect(deleteResponse.status).toBe(201);
    
    // 4. Get booking

    let getBookingAfterDeleteResponse = await bookingHelper.getAfterDelete(`/booking/${bookingId}`);
    expect(getBookingAfterDeleteResponse.status).toBe(404);
    expect(getBookingAfterDeleteResponse.statusText).toBe("Not Found");
    
});


