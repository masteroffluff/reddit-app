import reducer,{fetchListingByPath} from "./listingSlice"


it("should return an empty object when run",() => {
    const resultObject = {
        listing:  {},
        isLoading: false,
        hasError: false
    }
    expect(reducer(undefined, { type: undefined })).toEqual(resultObject)

}

) // hello


it("should add a listing for the front page when called",  async () => {
    const previousState = {
        listing:  {},
        isLoading: false,
        hasError: false
    }   
   expect(await reducer(previousState, fetchListingByPath("/"))).not.toEqual(previousState)

}


)