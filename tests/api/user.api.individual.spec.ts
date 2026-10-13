import { test, expect} from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
};

// Helper - generic function - create a user (POST call)
async function createUser(apiHelper:any) {
    // User JS object
    let userData = {
        name: "apiautomation",
        email: `pwautomation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };

    let response = await apiHelper.post('/public/v2/users',userData);
    expect(response.status).toBe(201);
    return response.body;
}

// test 1: create a user + verify AAA
// POST --> userID --> GET/ userID --> verify
test('Create a user test', async({apiHelper})=>{
    // create a user
    let userResponse = await createUser(apiHelper);

    // get a user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation')

})

// test 2 : update a uesr test + verify AAA
// POST --> userID --> GET/ userID --> PUT/ userID --> GET/ userID --> verify
test('Update a user test', async({apiHelper})=>{
    // 1. create a user
    let userResponse = await createUser(apiHelper);

    // 2. get a user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation')
    
    // 3. update a user

    // User JS object
    let userUpdatedData = {
        name: "apiautomation-update",
        status: 'inactive'
    };

    let updateResponse = await apiHelper.put(`/public/v2/users/${userResponse.id}`,userUpdatedData,AUTH_HEADER);
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe(userUpdatedData.name);
    expect(updateResponse.body.status).toBe(userUpdatedData.status);

    // 4. get a user
    getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(userUpdatedData.name);
    expect(getResponse.body.status).toBe(userUpdatedData.status);

})

// test 3 : delete a user
// POST --> userID --> GET/ userID --> DELETE/ userID --> GET/ userID (404) --> verify
test('Delete a user test', async({apiHelper})=>{
    // 1. create a user
    let userResponse = await createUser(apiHelper);

    // 2. get a user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation')
    
    // 3. delete a user

    let deleteResponse = await apiHelper.delete(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
    expect(deleteResponse.status).toBe(204);
    
    // 4. get a user
    getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body.message).toBe('Resource not found');
    
})

