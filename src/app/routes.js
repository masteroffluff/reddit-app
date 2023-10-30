const ROUTES = {
    subredditRoute: (subredditName) => `/r/${subredditName}`,
    articleRoute: (subredditName,id,articleTitle) => `/r/${subredditName}/${id}/${articleTitle}`,
    searchResultsRoute: ()=>`/search/`
  };
  
  export default ROUTES;
  