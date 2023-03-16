import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";

import aythSlice from "./auth/aytReducer";

// const rootReducers = combineReducers({
//   [aythSlice.name]: aythSlice.reducer,
// });

export default store = configureStore({
  reducer: {
    auth: aythSlice.reducer,
  },
});
