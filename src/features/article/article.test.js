import reducer, { fetchArticleByPath } from "./articleSlice"

describe('Test suite for Article component', () => {
    it("should return an initial object when run", () => {
        const resultObject = {
            article: {},
            replies: {},
            isLoading: false,
            hasError: false
        }
        expect(reducer(undefined, { type: "placeholder" })).toEqual(resultObject)

    }

    ) // hello


    it("should add a article for the front page when called", async () => {
        const previousState = {
            article: {},
            replies: {},
            isLoading: false,
            hasError: false
        }
        expect(await reducer(previousState, await fetchArticleByPath("/r/comics/comments/17v2vq3/monkey_oc/"))).toHaveProperty("article")
        expect(await reducer(previousState, await fetchArticleByPath("/r/comics/comments/17v2vq3/monkey_oc/")).article).toHaveProperty("kind")

    }


    )
})
