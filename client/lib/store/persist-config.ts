import storage from "redux-persist/lib/storage"

export const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['isAuthenticated','userAccessToken'],
    // whitelist: ['isAuthenticated','userAccessToken'],
}