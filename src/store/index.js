import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import uiSlice from "./uiSlice";
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    ui: uiSlice.reducer,
  })
);

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["persist/PERSIST"],
      ignoredPaths: ["register"],
    },
  }),
];
const store = configureStore({
  reducer: persistedReducer,
  middleware,
});
const persistor = persistStore(store);

export { store, persistor };
