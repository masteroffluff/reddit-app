import { configureStore } from "@reduxjs/toolkit";
// import reducers

export default configureStore({
    reducer: {
      topics:topicsReducer,
      quizzes:quizzesReducer,
      cards:cardReducer,
    },
  });