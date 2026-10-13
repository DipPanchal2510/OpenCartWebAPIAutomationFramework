import { test as baseTest, request} from '@playwright/test'
import { ApiHelper } from '../api/ApiHelper'
import { RestfulBookerHelper } from '../api/RestfulBookerHelper'
import { BookingHelper } from '../api/BookingHelper'

type ApiFixtures = {
    apiHelper: ApiHelper,
    restfulBookerHelper: RestfulBookerHelper,
    bookingHelper: BookingHelper
}

export let test = baseTest.extend<ApiFixtures>({

    apiHelper:async({request}, use)=>{
        let apiHelper = new ApiHelper(request, process.env.API_BASE_URL);
        await use(apiHelper);
    },

    restfulBookerHelper:async({request}, use)=>{
        let restfulBookerHelper = new RestfulBookerHelper(request, process.env.API_RESTFUL_BASE_URL);
        await use(restfulBookerHelper);
    },

    bookingHelper:async({request}, use)=>{
        let bookingHelper = new BookingHelper(request, process.env.API_RESTFUL_BASE_URL);
        await use(bookingHelper);
    }
});

export{expect} from '@playwright/test';