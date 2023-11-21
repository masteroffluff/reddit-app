import reducer,{fetchListingByPath} from "./listingSlice"

describe('Test suite for List component', () => {
it("should return an initial object when run",() => {
    const resultObject = {
        listing:  {},
        after:"",
        isLoading: false,
        hasError: false
    }
    expect(reducer(undefined, {type:"placeholder"})).toEqual(resultObject)

}

) // hello


it("should add a listing for the front page when called",  async () => {
    const previousState = {
        listing:  {},
        isLoading: false,
        hasError: false
    }   
   expect(await reducer(previousState, await fetchListingByPath("/"))).not.toEqual(previousState)

}


)})
