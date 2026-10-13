import { test, expect} from '../../src/fixtures/apifixtures';
import Ajv from 'ajv';
import fs from 'fs';

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
};

let ajv = new Ajv();

// define json schema
// let userSchema = {
//   "type": "object",
//   "properties": {
//     "id": {
//       "type": "number"
//     },
//     "name": {
//       "type": "string"
//     },
//     "email": {
//       "type": "string"
//     },
//     "gender": {
//       "type": "string"
//     },
//     "status": {
//       "type": "string"
//     }
//   },
//   "required": [
//     "id",
//     "name",
//     "email",
//     "gender",
//     "status",
//   ]
// };

let userArraySchema = {
  "type": "array",
  "items": JSON.parse(fs.readFileSync('./src/schema/userschema.json','utf-8'))
}

test('Get a user - schema test', async({apiHelper})=>{
    // User JS object
      let userData = {
         "name": "Sundar Guneta",
         "email": `pwautomation_${Date.now()}@open.com`,
         "gender": "male",
         "status": "active"
      }
      let response = await apiHelper.post('/public/v2/users',userData,AUTH_HEADER);
      expect(response.status).toBe(201);
      let userID = response.body.id;
      console.log('Created user id : ',userID);
            
        
      // get a user
      let getUserResponse = await apiHelper.get(`/public/v2/users/${userID}`,AUTH_HEADER);
      expect(getUserResponse.status).toBe(200);

      // verify response schema
      let validate = ajv.compile(JSON.parse(fs.readFileSync('./src/schema/userschema.json','utf-8')));
      let isSchemaValid = validate(getUserResponse.body);
      if(!isSchemaValid){
        console.log("Schema errors : ", validate.errors);
      }

      expect(isSchemaValid).toBeTruthy();
});

test('Get all users - schema test', async({apiHelper})=>{
      
      // get all user
      let getUsersResponse = await apiHelper.get(`/public/v2/users`,AUTH_HEADER);
      expect(getUsersResponse.status).toBe(200);

      // verify response schema
      let validate = ajv.compile(userArraySchema);
      let isSchemaValid = validate(getUsersResponse.body);
      if(!isSchemaValid){
        console.log("Schema errors : ", validate.errors);
      }

      expect(isSchemaValid).toBeTruthy();
});