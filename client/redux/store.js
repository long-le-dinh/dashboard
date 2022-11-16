import {configureStore} from '@reduxjs/toolkit';
import loginSlice from './auth';

export const store = configureStore({
    reducer:{
        login:loginSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }),
})