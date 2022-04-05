import { configureStore, createReducer } from '@reduxjs/toolkit'
import cartReducer from "./slices/cartSlice"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux';



const persistConfig = {
  key: 'root',
  storage,
  //whitelist: ["state_which_you_want_to_persist"], // "state_which_you_want_to_persist"
  blacklist: ['cart'] // "state_which_you_do_not_want_to_persist"
 // stateReconciler: hardSet,
}

/* const store = configureStore({
  reducer: {
   cart : cartReducer
  }
}) */

const reducers = combineReducers({
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
 // devTools: process.env.NODE_ENV !== 'production',
 // middleware: [thunk],
});

// let persistor = persistStore(store);

export default store