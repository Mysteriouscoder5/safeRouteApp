import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./redux/reducers/userReducer";
import routeReducer from "./redux/reducers/routeReducer";
import profileReducer from "./redux/reducers/profileReducer";
import locationReducer from "./redux/reducers/locationReducer";

const reducer = combineReducers({
  user: userReducer,
  route: routeReducer,
  profile: profileReducer,
  location: locationReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

const preloadedState = {};

export default () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
    preloadedState,
  });

  const persistor = persistStore(store);

  return { store, persistor };
};
