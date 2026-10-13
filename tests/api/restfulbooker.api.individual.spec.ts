import { test, expect} from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_RESTFUL_TOKEN;

let AUTH_HEADER = {
    Cookie: `token=${TOKEN}`
};

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
    
    let response = await restfulBookerHelper.post('/booking',userData,AUTH_HEADER);
    expect(response.status).toBe(200);
    return response.body;
}

// test 1: create a user + verify AAA
// POST --> bookingID --> GET/ bookingID --> verify
test('Create a booking test', async({restfulBookerHelper})=>{
    // Create a booking
    let bookingResponse = await creatBooking(restfulBookerHelper);
    console.log(bookingResponse);

    // GET a booking
    let getBookingResponse = await restfulBookerHelper.get(`/booking/${bookingResponse.bookingid}`);
    expect(getBookingResponse.status).toBe(200);
    expect(getBookingResponse.body.firstname).toBe(bookingResponse.booking.firstname);
    expect(getBookingResponse.body.totalprice).toBe(bookingResponse.booking.totalprice);
});

// test 2 : update a uesr test + verify AAA
// POST --> bookingID --> GET/ bookingID --> PUT/ bookingID --> GET/ bookingID --> verify
test('Update a booking test', async({restfulBookerHelper})=>{
    // Create a booking
    let bookingResponse = await creatBooking(restfulBookerHelper);
    console.log(bookingResponse);

    // GET a booking
    let getBookingResponse = await restfulBookerHelper.get(`/booking/${bookingResponse.bookingid}`);
    expect(getBookingResponse.status).toBe(200);
    expect(getBookingResponse.body.firstname).toBe(bookingResponse.booking.firstname);
   
    // UPDATE a booking

    let bookingUpdatedData = {
        "firstname" : "Banti",
        "lastname" : "Kande",
        "totalprice" : 9999,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2021-01-01",
            "checkout" : "2022-01-01"
        }
    }

    let updateResponse = await restfulBookerHelper.put(`/booking/${bookingResponse.bookingid}`,bookingUpdatedData,AUTH_HEADER);
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.firstname).toBe(bookingUpdatedData.firstname);
    expect(updateResponse.body.totalprice).toBe(bookingUpdatedData.totalprice);

    // GET a booking
    getBookingResponse = await restfulBookerHelper.get(`/booking/${bookingResponse.bookingid}`);
    expect(getBookingResponse.status).toBe(200);
    expect(getBookingResponse.body.firstname).toBe(bookingUpdatedData.firstname);
    expect(getBookingResponse.body.totalprice).toBe(bookingUpdatedData.totalprice);

});


// test 3 : delete a uesr test + verify AAA
// POST --> bookingID --> GET/ bookingID --> DELET/ bookingID --> GET/ bookingID --> verify
test('Delete a booking test', async({restfulBookerHelper})=>{
    // 1. Create a booking
    let bookingResponse = await creatBooking(restfulBookerHelper);
    console.log(bookingResponse);

    // 2. GET a booking
    let getBookingResponse = await restfulBookerHelper.get(`/booking/${bookingResponse.bookingid}`);
    expect(getBookingResponse.status).toBe(200);
    expect(getBookingResponse.body.firstname).toBe(bookingResponse.booking.firstname);
   
    // DELETE a booking

    let deleteResponse = await restfulBookerHelper.delete(`/booking/${bookingResponse.bookingid}`,AUTH_HEADER);
    expect(deleteResponse.status).toBe(201);
    expect(deleteResponse.statusText).toBe("Created");
    
    // GET a booking
    let getAfterDeleteBookingId = await restfulBookerHelper.getAfterDelete(`/booking/${bookingResponse.bookingid}`);
    expect(getAfterDeleteBookingId.status).toBe(404);
    expect(getAfterDeleteBookingId.statusText).toBe("Not Found");

});