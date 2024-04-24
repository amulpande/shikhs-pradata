import { configureStore} from "@reduxjs/toolkit";
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,

} from "redux-persist";
import { rootReducer } from "./root-reducer";
import exp from "constants";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
})

export type RooState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store)