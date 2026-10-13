
import { test, expect} from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
};

let userID:Number;

test.describe.serial('running e2e go rest crud apis test',()=>{
    
    // GET Test:
    test('GET API - get all users', async ({apiHelper}) => {
        let response = await apiHelper.get('/public/v2/users',AUTH_HEADER);  
        expect(response.status).toBe(200);
        expect(response.statusText).toBe("OK");
        expect(response.body.length).toBeGreaterThan(0);
    });

    // POST
    test('POST API - create new user', async({apiHelper})=>{

    // User JS object
    let userData = {
        "name": "Sundar Guneta",
        "email": `pwautomation_${Date.now()}@open.com`,
        "gender": "male",
        "status": "active"
    }
        let response = await apiHelper.post('/public/v2/users',userData,AUTH_HEADER);
        userID = response.body.id;
        console.log('Created user id : ',userID);
        expect(response.status).toBe(201);
        
    });

    // UPDATE
    test('PUT API - create new user', async({apiHelper})=>{

    // User JS object
    let userData = {
        "name": "Badiya Guneta",
        "email": `pwautomation_${Date.now()}@open.com`,
        "gender": "female",
        "status": "inactive"
    }
        let response = await apiHelper.put(`/public/v2/users/${userID}`,userData,AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(userData.name);
        expect(response.body.status).toBe(userData.status);
        
    });

    // DELETE
    test('DELETE API - create new user', async({apiHelper})=>{
        let response = await apiHelper.delete(`/public/v2/users/${userID}`,AUTH_HEADER);
        expect(response.status).toBe(204);
    });



});