import storage from "redux-persist/lib/storage"

// export const userPersistConfig = {
//     key: 'user',
//     storage,
// }

export const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['isAuthenticated','userAccessToken'],
    // whitelist: ['isAuthenticated','userAccessToken'],
}