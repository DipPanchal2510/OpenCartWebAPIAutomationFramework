import { test, expect} from '@playwright/test'



let OAUTH_CONFIG = {
    tokenURL: `https://accounts.spotify.com/api/token`,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    grantType: process.env.GRANT_TYPE
}

let accessToken: string;

test.beforeEach('POST - generate the access token', async({request})=>{
    let response = await request.post(OAUTH_CONFIG.tokenURL,{
        form:{
            grant_type: OAUTH_CONFIG.grantType,
            client_id: OAUTH_CONFIG.clientId,
            client_secret: OAUTH_CONFIG.clientSecret
        }
    });

    expect(response.status()).toBe(200);
    let jsonResponse = await response.json();
    console.log("Token API response : ",jsonResponse);
    accessToken = jsonResponse.access_token;
    console.log("Access token : ",accessToken);
});

test('get a album data test', async({request})=>{
    let baseURL = 'https://api.spotify.com';
    let endPoint = '/v1/albums/4aawyAB9vmqN3uQ7FjRGTy';
    let albumResponse = await request.get(`${process.env.SPOTIFY_BASE_URL}${endPoint}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    expect(albumResponse.status()).toBe(200);
    console.log(await albumResponse.json());

    let jsonBody = await albumResponse.json();
    console.log(jsonBody.images.length);
    expect(jsonBody.images.length).toBe(3);
    
});

test('get a artist data test', async ({request})=>{
    let endPoint = '/v1/artists/0TnOYISbd1XYRBk9myaseg';
    let artistResponse = await request.get(`${process.env.SPOTIFY_BASE_URL}${endPoint}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    expect(artistResponse.status()).toBe(200);
    let jsonBody = await artistResponse.json();
    console.log(jsonBody);
    console.log(jsonBody.images.length);
    expect(jsonBody.images.length).toBe(3);
    
});