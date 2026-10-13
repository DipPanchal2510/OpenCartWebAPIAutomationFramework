import { APIRequestContext } from "@playwright/test";

export class RestfulBookerHelper{

    private readonly request: APIRequestContext;
    private readonly baseURL: string;
 
    constructor(request: APIRequestContext, baseURL:string){
        this.request = request;
        this.baseURL = baseURL;
    }

    // GET
    async get(endPoint:string){
        let response = await this.request.get(`${this.baseURL}${endPoint}`);
        console.log(await response.json(), response.status());

        return {
            status: response.status(),
            body: await response.json(),
            statusText: response.statusText(),
        }
    }

    // POST
    async post(endPoint:string, data:object){
    let response = await this.request.post(`${this.baseURL}${endPoint}`,{
        data: data,
    });
    console.log(await response.json(), response.status());

        return {
            status: response.status(),
            body: await response.json(),
            statusText: response.statusText(),
        }
    }

    // POST - Auth
    async postAuth(endPoint:string, data:object){
    let response = await this.request.post(`${this.baseURL}${endPoint}`,{
        headers: {"Content-Type": "application/json"},
        data: data,
    });
    console.log(await response.json(), response.status());

        return {
            status: response.status(),
            body: await response.json(),
            statusText: response.statusText(),
        }
    }


    // PUT
    async put(endPoint:string, data:object, header: Record<string, string>){
    let response = await this.request.put(`${this.baseURL}${endPoint}`,{
        headers: {"Content-Type": "application/json"},
        data: data
    });
    
        return {
            status: response.status(),
            body: await response.json(),
            statusText: response.statusText(),
        }
    }

    // DELETE
    async delete(endPoint:string, header: Record<string, string>){
    let response = await this.request.delete(`${this.baseURL}${endPoint}`,{
        headers: header,
    });
    console.log( response.status());

        return {
            status: response.status(),
            statusText: response.statusText(),
        }
    }

    // GET after delete
    async getAfterDelete(endPoint:string){
        let response = await this.request.get(`${this.baseURL}${endPoint}`);
        console.log(response.statusText(), response.status());

        return {
            status: response.status(),
            //body: await response.json(),
            statusText: response.statusText(),
        }
    }

}