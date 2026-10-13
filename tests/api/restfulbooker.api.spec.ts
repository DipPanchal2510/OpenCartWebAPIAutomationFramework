
import { test, expect} from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_RESTFUL_TOKEN;
let bookId:Number;
let accessToken;

let AUTH_HEADER = {
    Cookie:`token=${accessToken}`,
};



test.describe.serial('Running end to end CRUD operation for restful booker apis', ()=>{

    // POST - Token
    test.beforeEach('generate the tocken',async({restfulBookerHelper})=>{
        let authResponse = await restfulBookerHelper.post('/auth',process.env.AUTH_CRED);

        expect(authResponse.status).toBe(200);
        console.log(authResponse.body);
        accessToken = authResponse.body.token;
        console.log(accessToken);
    });

    

    // GET test
    test('GET API - get all booking ids', async({restfulBookerHelper})=>{
        let response = await restfulBookerHelper.get('/booking');
        expect(response.status).toBe(200);
        expect(response.statusText).toBe("OK");
        expect(response.body.length).toBeGreaterThan(0);
    })

    // POST test
    test('POST API - create a booking', async({restfulBookerHelper})=>{

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
        bookId = response.body.bookingid;
        console.log('Booking id is : ',bookId);
        expect(response.status).toBe(200);
        expect(response.statusText).toBe("OK");
    })

    // PUT test
    test('PUT API - update booking details', async({restfulBookerHelper})=>{

        let userData = {
        "firstname" : "Deepesh",
        "lastname" : "Kande",
        "totalprice" : 45699,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2024-01-01",
            "checkout" : "2024-01-01"
        }
    }
        let response = await restfulBookerHelper.put(`/booking/${bookId}`,userData,AUTH_HEADER);
        bookId = response.body.bookingid;
        console.log(bookId);
        expect(response.status).toBe(200);
        expect(response.body.firstname).toBe(userData.firstname);
        expect(response.body.totalprice).toBe(userData.totalprice);
    })

    // DELETE test
    test('DELETE API - delete a booking', async({restfulBookerHelper})=>{

        let response = await restfulBookerHelper.delete(`/booking/${bookId}`,AUTH_HEADER);
        
        expect(response.status).toBe(201);
        
    })

})